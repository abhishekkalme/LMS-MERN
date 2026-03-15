const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ChatHistory = require("../models/ChatHistory");
const { verifyToken } = require("../middleware/verifyToken");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `You are an intelligent and friendly AI study assistant for RGPV (Rajiv Gandhi Proudyogiki Vishwavidyalaya) students. 
You help students with:
- Finding notes, PYQs (Previous Year Questions), and study materials
- Understanding engineering subjects (CSE, IT, EC, ME, CE, etc.)
- Explaining concepts clearly and concisely
- GPA / CGPA calculation and academic planning
- Exam preparation tips and strategies
Keep answers concise, accurate, and student-friendly. If unsure, say so honestly.`;

// @route   POST /api/ai/chat
// @desc    Send a message to Gemini and save history
// @access  Private
router.post("/chat", verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
      return res.status(400).json({ error: "Message text is required" });
    }

    // Identify/Create history for user
    let history = await ChatHistory.findOne({ userId });
    if (!history) {
      history = new ChatHistory({ userId, messages: [] });
    }

    // Add user message
    history.messages.push({ role: "user", text });

    // Initialize model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    // Prepare history for Gemini (only last 10 messages for context to keep it efficient)
    const geminiHistory = history.messages.slice(-10).map((m) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

    // Start chat
    const chat = model.startChat({
      history: geminiHistory.slice(0, -1), // Everything except the new message
    });

    const result = await chat.sendMessage(text);
    const response = await result.response;
    const botReply = response.text();

    // Add bot reply
    history.messages.push({ role: "bot", text: botReply });

    // Keep history length reasonable (last 100 messages)
    if (history.messages.length > 100) {
      history.messages = history.messages.slice(-100);
    }

    await history.save();

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("AI Chat Error:", error?.message || error);
    const isModelError = error?.message?.includes("not found") || error?.message?.includes("404");
    res.status(500).json({
      error: isModelError
        ? "AI model unavailable. Please contact the admin."
        : "Failed to get AI response",
    });
  }
});

// @route   GET /api/ai/history
// @desc    Get chat history for user
// @access  Private
router.get("/history", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await ChatHistory.findOne({ userId });
    res.status(200).json(history ? history.messages : []);
  } catch (error) {
    console.error("Fetch History Error:", error);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// @route   DELETE /api/ai/history
// @desc    Clear chat history for user
// @access  Private
router.delete("/history", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    await ChatHistory.findOneAndDelete({ userId });
    res.status(200).json({ success: true, message: "History cleared" });
  } catch (error) {
    console.error("Clear History Error:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
});

module.exports = router;
