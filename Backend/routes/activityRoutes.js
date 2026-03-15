const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { verifyToken } = require("../middleware/verifyToken");

// @route   POST /api/activity
// @desc    Log a new activity for the user
// @access  Private
router.post("/", verifyToken, async (req, res) => {
  try {
    const { source, message, link } = req.body;
    const userId = req.user.id;

    if (!source || !message) {
      return res.status(400).json({ error: "Source and message are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newActivity = {
      source,
      message,
      link: link || "",
      date: new Date(),
    };

    user.activityFeed.unshift(newActivity);
    
    // Keep only last 50 activities to avoid document bloat
    if (user.activityFeed.length > 50) {
      user.activityFeed = user.activityFeed.slice(0, 50);
    }

    await user.save();
    res.status(200).json({ success: true, activity: newActivity });
  } catch (error) {
    console.error("Error logging activity:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
