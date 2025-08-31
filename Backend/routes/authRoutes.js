const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");
const sendMail = require("../utils/sendMail");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const router = express.Router();

// Reset email HTML
const resetPasswordTemplate = (link, name = "User") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Nunito', sans-serif;
      background-color: #f9f9f9;
      padding: 0;
      margin: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }
    .header {
      text-align: center;
      background-color: #4f46e5;
      color: white;
      padding: 1.5rem 0;
      border-radius: 8px 8px 0 0;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      margin-top: 2rem;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #4f46e5;
      color: #fff;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      margin-top: 1rem;
    }
    .footer {
      font-size: 14px;
      color: #6b7280;
      margin-top: 2rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>JIT Learning System</h2>
    </div>
    <div class="content">
      <p>Hi ${name},</p>
      <p>We received a request to reset your password. Click the button below to continue:</p>
      <a href="${link}" class="btn">Reset Password</a>
      <p style="margin-top: 1rem;">This link is valid for <strong>15 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:lms.secure.access@gmail.com">lms.secure.access@gmail.com</a></p>
      <p>© 2025 JIT Learning System. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

const otpHtmlTemplate = (otp, name = "User") => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />
  <style>
    body {
      font-family: 'Nunito', sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: auto;
      background-color: #fff;
      border-radius: 8px;
      overflow: hidden;
    }

    .header {
      background-color: #365cce;
      color: #fff;
      padding: 1.5rem 1rem;
      text-align: center;
    }

    .header h2 {
      margin: 0;
      font-size: 24px;
    }

    .sub-header {
      font-size: 14px;
      margin-top: 0.75rem;
    }

    .verify-title {
      font-size: 20px;
      font-weight: bold;
      margin-top: 0.75rem;
      text-transform: capitalize;
    }

    .content {
      padding: 1.5rem 1rem;
      color: #4b5563;
    }

    .content h4 {
      color: #374151;
      margin-bottom: 0.5rem;
    }

    .otp-container {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .otp-digit {
    display: inline-block;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #365cce;
    border-radius: 0.25rem;
    font-size: 20px;
    font-weight: bold;
    color: #365cce;
    text-align: center;
    line-height: 2.5rem; 
    box-sizing: border-box;
  }

    .button {
      display: inline-block;
      margin-top: 1.5rem;
      background-color: #f97316;
      color: #fff;
      padding: 0.5rem 1.25rem;
      border-radius: 6px;
      text-decoration: none;
      font-weight: bold;
      font-size: 14px;
    }

    .footer {
      text-align: center;
      font-size: 13px;
      color: #7b8794;
      padding: 1rem;
    }

    .contact {
      background-color: #f3f4f6;
      padding: 1.25rem;
      text-align: center;
    }

    .contact h1 {
      font-size: 18px;
      color: #365cce;
      margin: 0 0 0.5rem;
    }

    .contact a {
      display: block;
      color: #4b5563;
      text-decoration: none;
      margin-top: 0.25rem;
    }

    .footer-bottom {
      background-color: #365cce;
      color: #fff;
      text-align: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 0 0 8px 8px;
    }

    @media screen and (max-width: 480px) {
      .otp-digit {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 24px;
      line-height: 3rem; 
      }

      .header h2 {
        font-size: 20px;
      }

      .verify-title {
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>JIT Learning System</h2>
      <div class="sub-header">THANKS FOR SIGNING UP!</div>
      <div class="verify-title">Verify your email address</div>
    </div>

    <div class="content">
      <h4>Hello ${name},</h4>
      <p>Please use the following One Time Password (OTP):</p>
      <div class="otp-container">
        ${otp
          .split("")
          .map((digit) => `<div class="otp-digit">${digit}</div>`)
          .join("")}
      </div>
      <p style="margin-top: 1rem;">
        This passcode will be valid for the next <strong>10 minutes</strong>.
      </p>
      <a href="#" class="button">Verify Email</a>
      <p style="margin-top: 2rem;">
        Thank you,<br />JIT Learning System Team
      </p>
    </div>

    <div class="footer">
      This email was sent from
      <a href="mailto:lms.secure.access@gmail.com" style="color: #365cce;">lms.secure.access@gmail.com</a>
    </div>

    <div class="contact">
      <h1>Get in touch</h1>
      <a href="mailto:lms.secure.access@gmail.com">lms.secure.access@gmail.com</a>
    </div>

    <div class="footer-bottom">
      © 2025 JIT Learning System. All Rights Reserved.
    </div>
  </div>
</body>
</html>
`;

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role?.toLowerCase() || "student" },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "7d" }
  );
};

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 🔹 Name validation
    if (!name || name.length > 30) {
      return res.status(400).json({ message: "Name must be under 30 characters" });
    }

    // 🔹 Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 🔹 Password validation (NIST-style)
    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    if (/^\s+$/.test(password)) {
      return res.status(400).json({ message: "Password cannot be only spaces" });
    }

    // Optional: Block common passwords
    const commonPasswords = ["password", "12345678", "qwerty", "letmein", "admin"];
    if (commonPasswords.includes(password.toLowerCase())) {
      return res.status(400).json({ message: "Password is too common. Choose a stronger one." });
    }

    // 🔹 Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔹 Generate OTP & hash password
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Save pending user
    await PendingUser.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        otp,
        createdAt: new Date(),
        resendCount: 0,
        verifyAttempts: 3,
        blocked: false,
      },
      { upsert: true, new: true }
    );

    // 🔹 Send verification email
    await sendMail({
      to: email,
      subject: "Verify your email - JIT LMS",
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
      html: otpHtmlTemplate(otp),
    });

    res.status(200).json({ message: "OTP sent to email", email });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const pending = await PendingUser.findOne({ email });

    if (!pending)
      return res.status(404).json({ message: "No pending verification found" });

    if (pending.blocked) {
      const now = new Date();
      const blockedDuration = (now - pending.blockedAt) / 1000;

      if (blockedDuration > 600) {
        pending.blocked = false;
        pending.verifyAttempts = 3;
        pending.blockedAt = null;
        await pending.save();
      } else {
        return res.status(403).json({
          message:
            "Maximum verification attempts exceeded. Try after 10 minutes.",
        });
      }
    }

    if (pending.otp !== otp) {
      pending.verifyAttempts -= 1;
      await pending.save();

      return res.status(400).json({
        message: `Invalid OTP. ${pending.verifyAttempts} attempts left`,
        attemptsLeft: pending.verifyAttempts,
      });
    }

    const newUser = new User({
      name: pending.name,
      email: pending.email,
      password: pending.password,
    });

    await newUser.save();
    await PendingUser.deleteOne({ email });

    return res
      .status(200)
      .json({ message: "User verified & registered successfully" });
  } catch (err) {
    console.error("OTP Verification Error:", err);
    return res.status(500).json({ message: "OTP verification failed" });
  }
});

router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const pending = await PendingUser.findOne({ email });

    if (!pending) {
      return res
        .status(404)
        .json({ message: "Pending verification not found" });
    }

    if (pending.blocked) {
      const now = new Date();
      const diffSeconds = (now - pending.blockedAt) / 1000;

      if (diffSeconds > 600) {
        pending.blocked = false;
        pending.blockedAt = null;
        pending.verifyAttempts = 3;
        await pending.save();
      } else {
        const unblockAt = new Date(pending.blockedAt.getTime() + 600000);
        return res.status(403).json({
          message: "You are blocked for 10 minutes.",
          unblockAt,
        });
      }
    }

    if (pending.resendCount >= 3) {
      pending.blocked = true;
      pending.blockedAt = new Date();
      await pending.save();

      return res.status(403).json({
        message:
          "Maximum OTP resend attempts exceeded. You are blocked for 10 minutes.",
        unblockAt: new Date(pending.blockedAt.getTime() + 600000),
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    pending.otp = otp;
    pending.verifyAttempts = 3;
    pending.resendCount += 1;
    await pending.save();

    await sendMail({
      to: pending.email,
      subject: "Resend OTP - JIT LMS",
      text: `Your new OTP is ${otp}. It is valid for 10 minutes.`,
      html: otpHtmlTemplate(otp),
    });

    return res.status(200).json({ message: "OTP resent to your email." });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// ===== EMAIL/PASSWORD LOGIN =====
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in PendingUser (not verified yet)
    const pending = await PendingUser.findOne({ email });
    if (pending) {
      return res.status(403).json({
        message: "Please verify your email first. OTP is pending.",
      });
    }

    // Check if user exists in User collection
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "You must register and verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ===== GOOGLE LOGIN =====

router.post("/google", async (req, res) => {
  try {
    const { name, email, googleId, avatar } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        googleId,
        avatar,
        isGoogle: true,
        role: "student",
      });

      await user.save();
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ message: "Google Sign-In failed" });
  }
});


router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(verified.id).select("-password");

    res.json(user);
  } catch (err) {
    console.error("Token Error:", err);
    res.status(500).json({ message: "Invalid Token" });
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user found with that email" });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = Date.now() + 15 * 60 * 1000; // 15 mins

    user.resetToken = token;
    user.resetTokenExpires = expires;
    await user.save();

    // const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const CLIENT_BASE_URL =
      process.env.CLIENT_BASE_URL || "http://localhost:5173";

    const link = `${CLIENT_BASE_URL}/reset-password/${token}`;

    await sendMail({
      to: user.email,
      subject: "Reset your password - JIT LMS",
      html: resetPasswordTemplate(link),
      text: `Reset your password using this link: ${link}`,
    });

    res.json({ message: "Password reset email sent." });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
