const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Note = require('../models/Note');
const PYQ = require('../models/PYQ');
const ImportantQuestion = require('../models/ImportantQuestion');

// @route   GET /api/stats
// @desc    Get public counts for various entities
// @access  Public
router.get('/', async (req, res) => {
  try {
    const [totalUsers, totalNotes, totalPYQs, totalQuestions] = await Promise.all([
      User.countDocuments(),
      Note.countDocuments(),
      PYQ.countDocuments(),
      ImportantQuestion.countDocuments()
    ]);

    res.status(200).json({
      users: totalUsers,
      notes: totalNotes,
      pyqs: totalPYQs,
      questions: totalQuestions
    });
  } catch (err) {
    console.error("Stats fetch error:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;
