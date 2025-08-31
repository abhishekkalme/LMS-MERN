'use client';

import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode } from "jwt-decode";
const Backurl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState(null);
  const [messageKey, setMessageKey] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // ===== Helper to display inline message =====
  const showMessage = (message, duration = 4000) => {
    setInfoMessage(message);
    setTimeout(() => setInfoMessage(null), duration);
  };

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
      showMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // ===== GOOGLE LOGIN =====
    const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post(
        `${Backurl}/api/auth/google`,
        {
          name: decoded.name,
          email: decoded.email,
          googleId: decoded.sub,
          avatar: decoded.picture,
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
      showMessage(message);
      setMessageKey(triggerTime);
    }
  }, [location, messageKey]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 mb-20 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Please sign in to your account
          </p>
        </div>

        {/* ===== Inline Info/Error Message ===== */}
        {infoMessage && (
          <div className="mb-3 px-4 py-3 rounded-md bg-yellow-100 border border-yellow-400 text-yellow-800 text-sm font-medium shadow-sm flex items-center justify-between">
            <span className="flex-1">{infoMessage}</span>
            <button
              type="button"
              onClick={() => setInfoMessage(null)}
              className="text-yellow-800 hover:text-red-600 text-lg font-bold ml-3"
            >
              &times;
            </button>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-indigo-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-indigo-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="text-right text-sm mb-4">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline text-sm font-medium inline-block"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => toast.error("Google login failed")}
  theme="outline"
  size="medium"
  type="standard"
  shape="pill"
  logo_alignment="center"
/>


        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?
          <Link
            to="/register"
            className="ml-1 text-indigo-500 hover:text-indigo-700 font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
