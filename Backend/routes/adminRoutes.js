const express = require('express');
const router = express.Router();
const User = require('../models/User');
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
    const users = await User.find({}, 'name email role createdAt isGoogle').sort({ createdAt: -1 });
    res.json(users);
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
      res.status(500).json({ error: "Server error" });
    }
  });
  
module.exports = router;
