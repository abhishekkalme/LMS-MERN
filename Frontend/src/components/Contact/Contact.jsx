import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col min-h-[100dvh]"
      >
        {/* Breadcrumb */}
        <nav
          className="bg-transparent px-4 py-2 max-w-7xl mx-auto"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link to="/" className="hover:text-indigo-500">
                Home
              </Link>
            </li>
            <i className="ri-arrow-right-s-line mt-1 text-gray-400"></i>
            <li className="text-indigo-500 font-medium">Contact</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-[40vh] flex items-center justify-center text-center px-4">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              We'd love to hear from you! Fill out the form below and we'll get
              back to you soon.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900 flex-grow">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={user?.name || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={user && !loading ? { scale: 1.05 } : {}}
                whileTap={user && !loading ? { scale: 0.95 } : {}}
                type="submit"
                disabled={!user || loading}
                className={`w-full py-3 px-6 rounded-lg transition-all duration-300 font-semibold 
    ${
      !user || loading
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-indigo-600 hover:bg-indigo-700 text-white"
    }`}
              >
                {!user ? (
                  "Login to Send Message"
                ) : loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5 animate-spin text-white"
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
                  "Sent ✅"
                ) : (
                  "Send Message"
                )}
              </motion.button>

              {/* Success Message */}
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400 text-center font-medium"
                >
                  Thank you! Your message has been sent.
                </motion.p>
              )}
            </form>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-12 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Connect With Us
            </h2>
            <div className="flex justify-center space-x-6">
              {/* GitHub */}
              <motion.a
                href="https://github.com/abhishekkalme"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
              >
                <i className="ri-github-fill text-3xl"></i>
              </motion.a>

              {/* LinkedIn */}
              <motion.a
                href="https://www.linkedin.com/in/abhishek-kalme-289a7430a/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 dark:text-gray-300 hover:text-[#0077B5] transition"
              >
                <i className="ri-linkedin-box-fill text-3xl"></i>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:abhishekkalme0@gmail.com"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition"
              >
                <i className="ri-mail-fill text-3xl"></i>
              </motion.a>

              {/* Instagram */}
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-gray-600 dark:text-gray-300 hover:text-pink-500 transition"
              >
                <i className="ri-instagram-fill text-3xl"></i>
              </motion.a>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

export default Contact;
