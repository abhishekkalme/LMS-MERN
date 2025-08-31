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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
