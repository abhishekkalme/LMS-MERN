const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  createdAt: { type: Date, default: Date.now },
  resendCount: { type: Number, default: 0 },
  verifyAttempts: { type: Number, default: 3 }, 
  blocked: { type: Boolean, default: false },
  blockedAt: { type: Date, default: null }, 

});

module.exports = mongoose.model("PendingUser", pendingUserSchema);
