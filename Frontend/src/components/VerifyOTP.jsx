import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Backurl = import.meta.env.VITE_API_BASE_URL;

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [blockedUntil, setBlockedUntil] = useState(null);
  const [unblockCountdown, setUnblockCountdown] = useState(0);

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
    }
  }, [email]);

  // Auto focus on first OTP box
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend cooldown timer
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  // Unblock countdown timer
  useEffect(() => {
    if (!blockedUntil) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.max(Math.ceil((blockedUntil - now) / 1000), 0);
      setUnblockCountdown(secondsLeft);

      if (secondsLeft === 0) {
        setBlocked(false);
        setBlockedUntil(null);
        setResendCount(0);
        setOtpDigits(["", "", "", "", "", ""]);
        toast.info("✅ You are now unblocked. Please try again.");
        setTimeout(() => {
          navigate("/register");
        }, 1500);
      }
      
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedUntil, navigate]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otpDigits];
    newOtp[index] = value;
    setOtpDigits(newOtp);
    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    const otp = otpDigits.join("");

    if (otp.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${Backurl}/api/auth/verify-otp`, {
        email,
        otp,
      });

      toast.success(res.data.message || "Verified successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    // Always check resend limit locally
    if (resendCount >= 3) {
      if (!blocked) {
        setBlocked(true);
        const unblockAt = Date.now() + 10 * 60 * 1000;
        setBlockedUntil(unblockAt);
        toast.error("You’ve reached the maximum OTP resend limit. Please try again after 10 minutes.");
      }
      return;
    }

    if (timer > 0 || resending || blocked) return;

    setResending(true);
    try {
      const res = await axios.post(`${Backurl}/api/auth/resend-otp`, { email });

      toast.success(res.data.message || "OTP resent to your email");

      setTimer(30);
      setOtpDigits(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setResendCount((prev) => prev + 1);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP";
      toast.error(msg);

      if (err.response?.status === 403) {
        setBlocked(true);
        const unblockAt = err.response?.data?.unblockAt;
        if (unblockAt) {
          setBlockedUntil(new Date(unblockAt).getTime());
        }
      }
    } finally {
      setResending(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-gray-900 dark:to-gray-800 px-3">
      <ToastContainer position="top-center" />
      <div className="max-w-md w-full bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in mb-44">
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Email Verification
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter the 6-digit OTP sent to{" "}
          <span className="font-semibold">{email}</span>.
        </p>

        {blocked && unblockCountdown > 0 && (
          <p className="text-center text-sm text-yellow-500 mb-4">
            OTP resend limit reached. You can try again in:{" "}
            {Math.floor(unblockCountdown / 60)}m {unblockCountdown % 60}s
          </p>
        )}

        <form onSubmit={handleOTPVerify}>
          <div className="flex justify-between mb-6">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                disabled={blocked}
                className={`w-12 h-12 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white 
                  ${
                    blocked
                      ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                      : ""
                  }`}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendOTP}
            className={`text-sm font-medium transition duration-200 ${
              timer > 0 || resending || blocked || resendCount >= 3
                ? "text-gray-400 cursor-not-allowed"
                : "text-indigo-500 hover:underline"
            }`}
          >
            {resending
              ? "Resending..."
              : timer > 0
              ? `Resend OTP in ${timer}s`
              : "Resend OTP"}
          </button>

          <p className="text-sm mt-3 text-gray-600 dark:text-gray-300 text-center mb-4">
            Resent: {resendCount} of 3
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
