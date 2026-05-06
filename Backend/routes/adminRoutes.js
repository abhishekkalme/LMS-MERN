const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Note = require('../models/Note');
const { verifyAdmin } = require("../middleware/verifyToken"); 

// Change User Role (Admin Only)
router.put('/users/:id/role', verifyAdmin, async (req, res) => {
  const { role } = req.body;

  // Validate role
  if (!["student", "teacher", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Role updated", user: updatedUser });
  } catch (err) {
    console.error("Error updating role:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find({}, 'name email role createdAt isGoogle')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments()
    ]);

    res.json({ users, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});
router.delete('/users/:id', verifyAdmin, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) return res.status(404).json({ error: "User not found" });
  
      res.status(200).json({ message: "User deleted", user: deletedUser });
    } catch (err) {
    }
  });

// Admin Analytics Stats
router.get('/stats', verifyAdmin, async (req, res) => {
  try {
    const [totalUsers, totalNotes, userGrowth, topNotes, githubCount, leetcodeCount] = await Promise.all([
      User.countDocuments(),
      Note.countDocuments(),
      User.aggregate([
        { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, count: { $sum: 1 } } },
        { $sort: { "_id": 1 } }
      ]),
      Note.find().sort({ downloadCount: -1 }).limit(5).lean(),
      User.countDocuments({ "platforms.github.username": { $exists: true, $ne: "" } }),
      User.countDocuments({ "platforms.leetcode.username": { $exists: true, $ne: "" } })
    ]);

    res.status(200).json({
      summary: { totalUsers, totalNotes },
      userGrowth,
      topNotes,
      platforms: { github: githubCount, leetcode: leetcodeCount }
    });
  } catch (err) {
    console.error("Stats fetch error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;
