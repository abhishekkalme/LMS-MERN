import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPasswordStrength = (pwd) => {
    if (pwd.length < 6) return "Weak";
    if (
      pwd.match(/[a-z]/) &&
      pwd.match(/[A-Z]/) &&
      pwd.match(/[0-9]/) &&
      pwd.length >= 8
    )
      return "Strong";
    return "Medium";
  };

  const handlePasswordChange = (pwd) => {
    setPassword(pwd);
    setPasswordStrength(getPasswordStrength(pwd));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${Backurl}/api/auth/register`, {
        name,
        email,
        password,
      },
      { withCredentials: true });

      toast.success("OTP sent to your email");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post(`${Backurl}/api/auth/google`, {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
        avatar: decoded.picture,
      },
      { withCredentials: true });

      login(response.data.user, response.data.token);
      toast.success("Google account registered & logged in!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Google Sign-Up failed.");
      console.error("Google Sign-Up Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-violet-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <ToastContainer position="top-center" />
      <div className="max-w-md w-full mb-16 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Register to get started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

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
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
            <p
              className={`text-sm mt-1 font-medium ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              Strength: {passwordStrength}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Repeat your password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 text-white font-semibold py-2 px-4 rounded-xl shadow-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="my-6 flex items-center justify-center">
          <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
          <span className="px-2 text-gray-500 dark:text-gray-400">or</span>
          <div className="border-t border-gray-300 dark:border-gray-600 w-full"></div>
        </div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login failed")}
          theme="outline"
          size="large"
          type="standard"
          shape="circle"
          logo_alignment="center"
        />

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="ml-1 text-indigo-500 hover:text-indigo-700 font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
