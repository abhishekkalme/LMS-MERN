const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PendingUser = require("../models/PendingUser");
const sendMail = require("../utils/sendMail");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();

const { resetPasswordTemplate, otpHtmlTemplate } = require("../utils/emailTemplates");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("FATAL: JWT_SECRET environment variable is not set.");
  process.exit(1);
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { message: "Too many login attempts, please try again later." }
});

const otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { message: "Too many OTP requests, please try again later." }
});

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role?.toLowerCase() || "student" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const generateUsername = async (email) => {
  let baseUsername = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "");
  if (baseUsername.length < 3) baseUsername = baseUsername.padEnd(3, "0");
  if (baseUsername.length > 20) baseUsername = baseUsername.substring(0, 20);

  let username = baseUsername;
  let counter = 1;
  let exists = await User.findOne({ username });

  while (exists) {
    let suffix = `_${counter}`;
    username = baseUsername.substring(0, 20 - suffix.length) + suffix;
    exists = await User.findOne({ username });
    counter++;
  }

  return username;
};

router.post("/register", otpLimiter, async (req, res) => {
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
    const otp = crypto.randomInt(100000, 999999).toString();
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


router.post("/verify-otp", otpLimiter, async (req, res) => {
  const { email, otp } = req.body;

  try {
    const pending = await PendingUser.findOne({ email });

    if (!pending)
      return res.status(404).json({ message: "No pending verification found" });

    // Check OTP expiry (10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    if (pending.createdAt < tenMinutesAgo) {
      await PendingUser.deleteOne({ email });
      return res.status(400).json({ message: "OTP has expired. Please register again." });
    }

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

    const username = await generateUsername(pending.email);

    const newUser = new User({
      name: pending.name,
      email: pending.email,
      password: pending.password,
      username,
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

router.post("/resend-otp", otpLimiter, async (req, res) => {
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

    const otp = crypto.randomInt(100000, 999999).toString();

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
router.post("/login", loginLimiter, async (req, res) => {
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
const googleClient = new OAuth2Client(process.env.VITE_APP_GOOGLE_CLIENT_ID);

router.post("/google", loginLimiter, async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Google ID token is required" });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.VITE_APP_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { name, email, sub: googleId, picture: avatar } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      const username = await generateUsername(email);
      user = new User({
        name,
        email,
        googleId,
        avatar,
        isGoogle: true,
        role: "student",
        username,
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
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const verified = jwt.verify(token, JWT_SECRET);
    let user = await User.findById(verified.id).select("-password -otp -resetToken");

    if (user && !user.username) {
      user.username = await generateUsername(user.email);
      await user.save();
    }

    res.json(user);
  } catch (err) {
    console.error("Token Error:", err);
    res.status(500).json({ message: "Invalid Token" });
  }
});

router.post("/forgot-password", loginLimiter, async (req, res) => {
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

router.put("/update-profile", async (req, res) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    const verified = jwt.verify(token, JWT_SECRET);
    const userId = verified.id;

    const { 
        name, bio, avatar, socialProfiles, username, isPublic, 
        privacySettings, academic, customSections 
    } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar && /^https:\/\/res\.cloudinary\.com\//.test(avatar)) user.avatar = avatar;
    if (isPublic !== undefined) user.isPublic = isPublic;
    if (academic) user.academic = { ...user.academic, ...academic };
    if (customSections) user.customSections = customSections;

    // Username update logic
    if (username && username !== user.username) {
      if (user.usernameChanged) {
        return res.status(400).json({ message: "Username can only be changed once" });
      }

      const usernameRegex = /^[a-z0-9_]{3,20}$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({ message: "Invalid username format" });
      }

      const existing = await User.findOne({ username: username.toLowerCase() });
      if (existing) {
        return res.status(400).json({ message: "Username already taken" });
      }

      user.username = username.toLowerCase();
      user.usernameChanged = true;
    }
    
    if (privacySettings) {
      user.privacySettings = { ...user.privacySettings, ...privacySettings };
    }

    if (socialProfiles) {
      user.socialProfiles = { ...user.socialProfiles, ...socialProfiles };
    }

    const { updateOnboarding } = require("../utils/activityEngine");
    updateOnboarding(user);
    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        isPublic: user.isPublic,
        academic: user.academic,
        customSections: user.customSections,
        privacySettings: user.privacySettings,
        socialProfiles: user.socialProfiles,
        platforms: user.platforms,
        developerScore: user.developerScore,
        badges: user.badges,
        onboarding: user.onboarding,
        isGoogle: user.isGoogle,
      }
    });
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST Connect Platform
router.post("/platform/:name", async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const verified = jwt.verify(token, JWT_SECRET);
        const { username } = req.body;
        const platformName = req.params.name.toLowerCase();

        const user = await User.findById(verified.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.platforms[platformName]) {
            return res.status(400).json({ message: "Invalid platform" });
        }

        user.platforms[platformName].username = username;
        user.platforms[platformName].verified = true; // Simplified for MVP
        
        const { syncUserStats, logActivity } = require("../utils/activityEngine");
        logActivity(user, platformName, `Connected ${platformName} account: ${username}`);
        await user.save();
        
        // Trigger immediate sync
        await syncUserStats(user._id);
        
        const updatedUser = await User.findById(user._id);
        res.json({ message: `${platformName} connected successfully`, user: updatedUser });
    } catch (err) {
        console.error("Connect Platform Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// DELETE Disconnect Platform
router.delete("/platform/:name", async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const verified = jwt.verify(token, JWT_SECRET);
        const platformName = req.params.name.toLowerCase();

        const user = await User.findById(verified.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.platforms[platformName]) {
            return res.status(400).json({ message: "Invalid platform" });
        }

        const oldHandle = user.platforms[platformName].username;
        user.platforms[platformName].username = "";
        user.platforms[platformName].verified = false;
        user.platforms[platformName].stats = {};

        const { logActivity, updateOnboarding } = require("../utils/activityEngine");
        logActivity(user, platformName, `Disconnected ${platformName} account: ${oldHandle}`);
        updateOnboarding(user);
        
        await user.save();
        res.json({ message: "Platform disconnected", user });
    } catch (err) {
        console.error("Disconnect Platform Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST Refresh Stats
router.post("/refresh", async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        const verified = jwt.verify(token, JWT_SECRET);

        const { syncUserStats } = require("../utils/activityEngine");
        await syncUserStats(verified.id);

        const updatedUser = await User.findById(verified.id);
        res.json({ message: "Stats refreshed successfully", user: updatedUser });
    } catch (err) {
        console.error("Refresh Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET Public Profile
router.get("/profile/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username: username.toLowerCase() }).select("-password -otp -resetToken -email -googleId");

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    if (!user.isPublic) {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (token) {
            try {
                const verified = jwt.verify(token, JWT_SECRET);
                if (verified.id !== user._id.toString()) {
                    return res.status(404).json({ message: "Profile is private" });
                }
            } catch (err) {
                return res.status(404).json({ message: "Profile is private" });
            }
        } else {
            return res.status(404).json({ message: "Profile is private" });
        }
    }

    // Apply privacy settings
    const profile = user.toObject();
    const settings = user.privacySettings;

    if (!settings.github) delete profile.platforms.github;
    if (!settings.leetcode) delete profile.platforms.leetcode;
    if (!settings.codeforces) delete profile.platforms.codeforces;
    if (!settings.heatmap) profile.hideHeatmap = true;
    if (!settings.socials) profile.socialProfiles = {};

    res.json(profile);
  } catch (err) {
    console.error("Fetch Public Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
