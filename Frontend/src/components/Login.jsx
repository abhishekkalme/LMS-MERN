'use client';

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff, Hand } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageKey, setMessageKey] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  // ===== EMAIL/PASSWORD LOGIN =====
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${Backurl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      login(response.data.user, response.data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ===== GOOGLE LOGIN =====
  const handleGoogleSuccess = async (credentialResponse) => {
    try {

      const response = await axios.post(
        `${Backurl}/api/auth/google`,
        {
          credential: credentialResponse.credential,
        },
        { withCredentials: true }
      );

      login(response.data.user, response.data.token);
      toast.success("Google account logged in!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Google Sign-Up failed.";
      toast.error(msg);
      console.error("Google Sign-Up Error:", error);
    }
  };


  // ===== Info message from redirects =====
  useEffect(() => {
    const { message } = location.state || {};
    const queryParams = new URLSearchParams(location.search);
    const reason = queryParams.get("reason");
    const triggerTime = queryParams.get("t");

    if (message && reason === "unauthorized" && triggerTime !== messageKey) {
      toast.error(message);
      setMessageKey(triggerTime);
    }
  }, [location, messageKey]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden text-gray-900 dark:text-white">
      {/* Background Blobs (matching Home.jsx) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white/50 dark:bg-black/40 p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-indigo-900 dark:text-white mb-2">
            Welcome Back! <Hand size={28} className="inline ml-2 text-amber-400" />
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Sign in to continue to your learning dashboard
          </p>
        </div>



        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 ml-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin text-xl"></i>
                Logging in...
              </span>
            ) : "Log In"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
          <span className="mx-4 text-xs font-medium text-gray-400 uppercase tracking-wide">or</span>
          <div className="flex-grow h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed")}
            theme="outline"
            size="large"
            type="standard"
            shape="pill"
            logo_alignment="center"
            width="100%"
          />
        </div>


        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account yet?
          <Link
            to="/register"
            className="ml-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
