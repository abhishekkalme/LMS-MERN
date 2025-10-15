import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import Draggable from "react-draggable";

function ChatMessage({ role, text }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 300;
  const displayedText = expanded ? text : text.slice(0, 300);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`px-4 py-2 max-w-[80%] rounded-2xl shadow-sm transition-all duration-200 
          ${
            role === "user"
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-200 text-gray-900 rounded-bl-none dark:bg-gray-800 dark:text-gray-100"
          }`}
      >
        <div className="text-sm whitespace-pre-line break-words leading-relaxed">
          <ReactMarkdown>{displayedText}</ReactMarkdown>
        </div>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-blue-300 underline mt-1 hover:text-white transition"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function ChatBot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I’m your AI assistant — how can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const BOT_MAX_LENGTH = 2000;

  const predefinedQuestions = [
    { q: "📘 What courses are available?", a: "We offer React, Node.js, Python, and more!" },
    { q: "📞 How can I contact support?", a: "You can email support@example.com anytime!" },
    { q: "🔑 How to reset my password?", a: "Click 'Forgot Password' on the login page." },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const typeBotMessage = async (text) => {
    setTyping(true);
    let typed = "";
    for (let char of text) {
      if (skipTyping) {
        typed = text;
        break;
      }
      typed += char;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "bot", text: typed };
        return updated;
      });
      await new Promise((res) => setTimeout(res, 20));
      if (typed.length >= BOT_MAX_LENGTH) break;
    }
    setTyping(false);
    setSkipTyping(false);
  };

  const handlePredefinedQuestion = async (item) => {
    if (typing) return;
    setMessages((p) => [...p, { role: "user", text: item.q }]);
    setMessages((p) => [...p, { role: "bot", text: "💭 Thinking..." }]);
    await typeBotMessage(item.a);
  };

  const sendMessage = async () => {
    if (!input.trim() || typing) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setMessages((prev) => [...prev, { role: "bot", text: "💭 Thinking..." }]);
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: userMsg.text }] }] }),
        }
      );

      const data = await res.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t understand that.";
      await typeBotMessage(botReply.slice(0, BOT_MAX_LENGTH));
    } catch {
      await typeBotMessage("⚠️ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const stopTyping = () => setSkipTyping(true);

  return (
    <>
  {/* Floating Chat Button */}
{!showChat && (
  <div className="fixed bottom-6 right-6 z-50">
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setShowChat(true)}
      className="p-4 rounded-full shadow-lg flex items-center justify-center border
                 bg-blue-600 text-white dark:bg-blue-600 hover:shadow-2xl
                 animate-glow transition-all duration-300 relative"
    >
      {/* Message Icon */}
      <MessageCircle className="w-6 h-6" />

      {/* 🔴 Subtle Notification Dot */}
      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm animate-subtle-ping" />
    </motion.button>
  </div>
)}




      {/* Chat Popup */}
      <AnimatePresence>
        {showChat && (
          <Draggable handle=".chat-header">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="fixed bottom-6 right-4 sm:right-6 w-[90vw] sm:w-96 z-50 flex flex-col rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-xl cursor-grab bg-white/95 border-gray-200 text-gray-900 dark:bg-gray-900/95 dark:border-gray-700 dark:text-white"
            >
              {/* Header */}
              <div className="chat-header flex items-center justify-between px-4 py-3 bg-blue-600 text-white  cursor-grab active:cursor-grabbing">
                <h3 className="font-semibold text-sm tracking-wide">
                  AI Chat Assistant
                </h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-1 hover:opacity-80 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Suggested Quick Questions */}
              <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200 bg-gray-50/60 dark:border-gray-700 dark:bg-gray-800/70">
                {predefinedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handlePredefinedQuestion(q)}
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                  >
                    {q.q}
                  </button>
                ))}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px] scroll-smooth">
                {messages.map((m, i) => (
                  <ChatMessage key={i} role={m.role} text={m.text} />
                ))}
                {typing && (
                  <div className="text-xs text-gray-400 italic flex justify-between">
                    <span>AI is typing...</span>
                    <button
                      onClick={stopTyping}
                      className="underline text-blue-500 hover:text-blue-600"
                    >
                      Skip
                    </button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-gray-50/80 dark:border-gray-700 dark:bg-gray-800/80">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full px-4 py-2 text-sm border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:focus:ring-blue-600"
                  disabled={loading || typing}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={loading || typing}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </motion.div>
          </Draggable>
        )}
      </AnimatePresence>
    </>
  );
}
