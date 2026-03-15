import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const MAX_NAME_LENGTH = 30;
  const MIN_NAME_LENGTH = 3;
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ==== Validation Functions ====
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const getPasswordStrength = (pwd) => {
    if (pwd.length < 8) return "Weak";
    if (pwd.length < 12) return "Medium";
    if (pwd.length < 16) return "Strong";
    return "Very Strong";
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPasswordStrength(getPasswordStrength(pwd));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // === Client-side Validations ===
    if (name.trim().length < 3) {
      toast.error("Name must be at least 3 characters.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${Backurl}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // === Google Register ===
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
      toast.success("Google account registered & logged in!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Google Sign-Up failed.");
      console.error("Google Sign-Up Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden text-gray-900 dark:text-white">
      {/* Background Blobs */}
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
            Create Account <Sparkles size={28} className="inline ml-2 text-amber-400" />
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Join us and start your learning journey today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              maxLength={MAX_NAME_LENGTH}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <div className={`mt-1 flex justify-between text-xs ${name.length > 0 && name.length < MIN_NAME_LENGTH ? "text-red-500" : "text-gray-400"}`}>
              {name.length > 0 && name.length < MIN_NAME_LENGTH && <span>Min {MIN_NAME_LENGTH} chars required</span>}
            </div>
          </div>

          {/* EMAIL */}
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

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="mt-1 flex items-center justify-between text-xs font-medium ml-1">
                <span className="text-gray-500 dark:text-gray-400">Strength:</span>
                <span className={`
                        ${passwordStrength === "Very Strong" ? "text-indigo-600 dark:text-indigo-400" :
                    passwordStrength === "Strong" ? "text-green-600 dark:text-green-400" :
                      passwordStrength === "Medium" ? "text-yellow-600 dark:text-yellow-400" :
                        "text-red-500 dark:text-red-400"}
                    `}>
                  {passwordStrength}
                </span>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Repeat your password"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="ri-loader-4-line animate-spin text-xl"></i>
                Registering...
              </span>
            ) : "Register"}
          </button>
        </form>

        {/* OR LINE */}
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
          Already have an account?
          <Link
            to="/login"
            className="ml-1 text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
