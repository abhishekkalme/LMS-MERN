import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axios.post(`${Backurl}/api/auth/forgot-password`, { email });
      toast.success(res.data.message || "Reset link sent");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-white dark:bg-gray-900 p-8 mb-40 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Forgot Password?
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-6">
          Enter your registered email address and we’ll send you a reset link.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-6 border rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={sending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Sending reset link..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
