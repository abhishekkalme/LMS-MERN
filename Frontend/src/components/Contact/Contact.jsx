import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Breadcrumbs from "../Common/Breadcrumbs";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { CheckCircle2, Rocket } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to send a message.");
      return;
    }

    setLoading(true);

    try {
      const dataToSend = {
        name: user.name,
        email: user.email,
        message: formData.message,
      };

      await axios.post("/api/contact", dataToSend);
      setSubmitted(true);
      setFormData({ ...formData, message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Send Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] overflow-hidden text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 relative z-10">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 text-center">
        {/* Blobs */}
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-[250px] h-[250px] bg-pink-500/20 blur-[80px] rounded-full pointer-events-none" />

        <motion.div {...fadeUp} className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-indigo-200 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hi? We'd love to hear from you.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="px-6 pb-20 flex-grow">
        <div className="max-w-2xl mx-auto">
          <motion.div
            {...fadeUp}
            className="p-8 md:p-10 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-indigo-100/50 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-indigo-200">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={user?.name || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none"
                    placeholder="Login to auto-fill"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-indigo-200">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 cursor-not-allowed focus:outline-none"
                    placeholder="Login to auto-fill"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-indigo-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none transition"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <motion.button
                whileHover={user && !loading ? { scale: 1.02 } : {}}
                whileTap={user && !loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!user || loading}
                className={`w-full py-4 text-center rounded-xl font-semibold shadow-lg transition-all duration-300
                  ${
                    !user || loading
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30 dark:bg-white dark:text-indigo-700"
                  }`}
              >
                {!user ? (
                  "Login to Send Message"
                ) : loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending...
                  </div>
                ) : submitted ? (
                  <span className="flex items-center justify-center">
                    Message Sent successfully! <CheckCircle2 size={18} className="ml-2" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Message <Rocket size={18} className="ml-2" />
                  </span>
                )}
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400 text-center font-medium mt-2"
                >
                  Thank you! Your message has been sent.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-12 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-xl font-bold mb-8">Connect With Us</h2>
          <div className="flex justify-center gap-8">
             {[
               { icon: "ri-github-fill", url: "https://github.com/abhishekkalme", color: "hover:text-black dark:hover:text-white" },
               { icon: "ri-linkedin-box-fill", url: "https://www.linkedin.com/in/abhishek-kalme-289a7430a/", color: "hover:text-[#0077B5]" },
               { icon: "ri-mail-fill", url: "mailto:abhishekkalme0@gmail.com", color: "hover:text-indigo-500" },
               { icon: "ri-instagram-fill", url: "https://instagram.com", color: "hover:text-pink-500" }
             ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target={social.url.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`text-gray-400 dark:text-gray-500 text-4xl transition-colors duration-300 ${social.color}`}
                >
                  <i className={social.icon}></i>
                </a>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
