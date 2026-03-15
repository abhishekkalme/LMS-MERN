import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle, Hand, MessageSquare, AlertTriangle, BookText, Phone, Key, Trash2, Download, Calculator } from "lucide-react";
import Draggable from "react-draggable";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

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
          ${role === "user"
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none dark:bg-white/10 dark:text-gray-100"
          }`}
      >
        <div className="text-sm whitespace-pre-line break-words leading-relaxed">
          <ReactMarkdown>{displayedText}</ReactMarkdown>
        </div>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-indigo-200 underline mt-1 hover:text-white transition"
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
    { role: "bot", text: "Hi! I’m your RGPV Study Assistant. How can I help you with your exams today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [skipTyping, setSkipTyping] = useState(false);
  const { token, user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:9000";
  const BOT_MAX_LENGTH = 2000;

  const predefinedQuestions = [
    { q: "How to find notes?", a: "Go to the 'Browse Notes' section, select your branch, semester, and subject to find unit-wise verified notes.", icon: BookText },
    { q: "Where are PYQs?", a: "You can find Previous Year Questions in the 'Practice Center' or by clicking the 'PYQs' button on the home page.", icon: Download },
    { q: "GPA Calculator?", a: "Use our built-in GPA Calculator in the 'Study Toolkit' section to track your academic performance.", icon: Calculator },
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/api/ai/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.length > 0) {
          setMessages(data);
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };
    fetchHistory();
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const handleOpenChat = (e) => {
      setShowChat(true);
      if (e.detail?.query) {
        setInput(e.detail.query);
      }
    };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

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
    setMessages((p) => [...p, { role: "bot", text: <span className="flex items-center"><MessageSquare size={16} className="mr-1" /> Thinking...</span> }]);
    await typeBotMessage(item.a);
  };

  /** Returns a local reply string if the message matches a known pattern, otherwise null. */
  const getLocalReply = (text) => {
    const t = text.toLowerCase().trim();

    // Greetings
    if (/^(hi+|hey+|hye+|hyy+|hello+|howdy|yo|sup|hola|namaste|hii+|helo+|heya)[\s!?]*$/.test(t)) {
      const name = user?.name ? `, ${user.name.split(" ")[0]}` : "";
      return `Hey${name}! 👋 Great to see you here. Ask me anything about your RGPV studies — notes, PYQs, GPA, or anything else!`;
    }

    // How are you / what's up
    if (/how are you|what'?s up|how r u|how do you do|kaise ho|kaisa hai/.test(t)) {
      return "I'm doing great and ready to help you ace your exams! 🚀 What can I assist you with today?";
    }

    // Thanks
    if (/^(thanks?|thank you|thx|ty|dhanyawad|shukriya)[\s!.]*$/.test(t)) {
      return "You're welcome! 😊 Feel free to ask if you need anything else.";
    }

    // Bye / goodbye
    if (/^(bye+|goodbye|see ya|later|alvida|ciao)[\s!.]*$/.test(t)) {
      return "Goodbye! Good luck with your studies! 📚 Come back anytime.";
    }

    // Help
    if (/^(help|help me|what can you do|what do you know)[\s?!]*$/.test(t)) {
      return "I can help you with:\n- 📂 **Finding Notes** – Browse by branch, semester & subject\n- 📝 **Previous Year Questions (PYQs)** – Filter by branch & year\n- 🎓 **GPA Calculator** – Track your academic performance\n- ❓ **General RGPV queries** – Ask me anything!";
    }

    // No match
    return null;
  };

  const sendMessage = async () => {
    if (!input.trim() || typing) return;
    const userMsg = { role: "user", text: input.trim() };

    // Check for a local (offline) reply first
    const localReply = getLocalReply(userMsg.text);
    if (localReply) {
      setMessages((prev) => [...prev, userMsg, { role: "bot", text: "" }]);
      setInput("");
      await typeBotMessage(localReply);
      return;
    }

    // Guest users cannot use the full AI — guide them to log in
    if (!token) {
      setMessages((prev) => [
        ...prev,
        userMsg,
        { role: "bot", text: "🔒 Please **log in** to chat with the full AI assistant. You can still use the quick-access buttons above!" },
      ]);
      setInput("");
      return;
    }

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setMessages((prev) => [...prev, { role: "bot", text: "Thinking..." }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: userMsg.text }),
      });

      // Handle non-2xx HTTP responses gracefully
      if (!res.ok) {
        let errMsg = "⚠️ The AI service is temporarily unavailable. Please try again later.";
        try {
          const errData = await res.json();
          if (errData?.error) errMsg = `⚠️ ${errData.error}`;
        } catch { /* ignore json parse errors */ }
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "bot", text: errMsg };
          return updated;
        });
        return;
      }

      const data = await res.json();
      const botReply = data.reply || "Sorry, I couldn't understand that. Try asking about notes, PYQs, or your GPA!";

      // Update the "Thinking..." message with the actual reply
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "bot", text: "" }; // Prepare for typing effect
        return updated;
      });

      await typeBotMessage(botReply.slice(0, BOT_MAX_LENGTH));
    } catch {
      // True network failure (server unreachable, no internet, etc.)
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "bot", text: "🌐 Could not reach the server. Please check your connection and try again." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    if (!token || !window.confirm("Are you sure you want to clear chat history?")) return;
    try {
      await fetch(`${API_BASE_URL}/api/ai/history`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages([{ role: "bot", text: "Hi! I’m your RGPV Study Assistant. How can I help you with your exams today?" }]);
    } catch (err) {
      console.error("Failed to clear chat:", err);
    }
  };

  const exportChat = () => {
    const chatText = messages
      .map((m) => `${m.role === "user" ? "You" : "AI"}: ${m.text}`)
      .join("\n\n");
    const blob = new Blob([chatText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
                 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/30
                 hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative"
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
              className="fixed bottom-6 right-4 sm:right-6 w-[90vw] sm:w-96 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl border backdrop-blur-xl cursor-grab bg-white/80 border-white/20 text-gray-900 dark:bg-black/60 dark:border-white/10 dark:text-white"
            >
              {/* Header */}
              <div className="chat-header flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white cursor-grab active:cursor-grabbing">
                <h3 className="font-semibold text-sm tracking-wide">
                  AI Chat Assistant
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={exportChat}
                    title="Export Chat"
                    className="p-1.5 hover:bg-white/20 rounded-lg transition"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={clearChat}
                    title="Clear Chat"
                    className="p-1.5 hover:bg-white/20 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-1.5 hover:bg-white/20 rounded-lg transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Suggested Quick Questions */}
              <div className="flex flex-wrap gap-2 p-4 border-b border-gray-100 bg-white/50 dark:border-white/5 dark:bg-white/5">
                {predefinedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handlePredefinedQuestion(q)}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-white/10 dark:text-indigo-100 dark:hover:bg-white/20 transition"
                  >
                    <span className="flex items-center gap-1.5">
                      <q.icon size={14} />
                      {q.q}
                    </span>
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
                      className="underline text-indigo-500 hover:text-indigo-600 dark:text-indigo-400"
                    >
                      Skip
                    </button>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <div className="flex items-center gap-2 p-3 border-t border-gray-100 bg-gray-50/50 dark:border-white/10 dark:bg-black/20">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 rounded-full px-4 py-2.5 text-sm border border-gray-200 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:ring-indigo-500 placeholder:text-gray-400"
                  disabled={loading || typing}
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={loading || typing}
                  className="p-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:scale-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
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
