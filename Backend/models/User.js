const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30, 
    },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String },
    googleId: String,
    avatar: String,
    bio: { type: String, maxlength: 200, default: "" },
    isGoogle: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    verified: { type: Boolean, default: false },
    otp: String,
    otpExpires: Date,
    resetToken: String,
    resetTokenExpires: Date,
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    usernameChanged: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: false },
    developerScore: { type: Number, default: 0 },
    lastSyncedAt: Date,

    platforms: {
      github: {
        username: { type: String, default: "" },
        verified: { type: Boolean, default: false },
        lastSyncedAt: Date,
        stats: {
          repos: { type: Number, default: 0 },
          commits: { type: Number, default: 0 },
          followers: { type: Number, default: 0 },
        }
      },
      leetcode: {
        username: { type: String, default: "" },
        verified: { type: Boolean, default: false },
        lastSyncedAt: Date,
        stats: {
          totalSolved: { type: Number, default: 0 },
          easy: { type: Number, default: 0 },
          medium: { type: Number, default: 0 },
          hard: { type: Number, default: 0 },
          streak: { type: Number, default: 0 },
          ranking: { type: Number, default: 0 },
          topics: { type: Object, default: {} }
        }
      },
      codeforces: {
        username: { type: String, default: "" },
        verified: { type: Boolean, default: false },
        lastSyncedAt: Date,
        stats: {
          rating: { type: Number, default: 0 },
          maxRating: { type: Number, default: 0 },
          rank: { type: String, default: "Unrated" },
          solvedCount: { type: Number, default: 0 }
        }
      },
      codechef: { username: { type: String, default: "" }, stats: { type: Object, default: {} } },
      hackerrank: { username: { type: String, default: "" }, stats: { type: Object, default: {} } },
      atcoder: { username: { type: String, default: "" }, stats: { type: Object, default: {} } },
    },

    badges: [
      {
        type: { type: String },
        label: { type: String },
        icon: { type: String },
        earnedAt: { type: Date, default: Date.now },
        description: { type: String },
      },
    ],
    activityFeed: [
      {
        source: { type: String }, // 'github', 'leetcode', etc.
        message: { type: String },
        date: { type: Date, default: Date.now },
        link: { type: String },
      },
    ],
    privacySettings: {
      github: { type: Boolean, default: true },
      leetcode: { type: Boolean, default: true },
      codeforces: { type: Boolean, default: true },
      heatmap: { type: Boolean, default: true },
      socials: { type: Boolean, default: true },
      academic: { type: Boolean, default: true },
      customSections: { type: Boolean, default: true },
    },
    onboarding: {
      hasAvatar: { type: Boolean, default: false },
      hasBio: { type: Boolean, default: false },
      hasPlatform: { type: Boolean, default: false },
      completed: { type: Boolean, default: false },
    },
    academic: {
      semester: { type: Number, default: 1 },
      cgpa: { type: Number, default: 0 },
      enrollmentNo: { type: String, default: "" },
      college: { type: String, default: "" },
      branch: { type: String, default: "" },
      resumeUrl: { type: String, default: "" },
    },
    customSections: [
      {
        id: { type: String },
        title: { type: String },
        content: { type: String },
        icon: { type: String },
        order: { type: Number, default: 0 },
      },
    ],
    socialProfiles: {
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
