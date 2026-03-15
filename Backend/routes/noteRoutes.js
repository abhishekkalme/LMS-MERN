const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

router.get("/recent", async (req, res) => {
  try {
    const notes = await Note.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("branch semester year subject unit fileUrl createdAt") 
      .populate("uploadedBy", "name");

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in /recent:", error.message);
    res.status(500).json({ message: "Failed to fetch recent uploads" });
  }
});

router.get("/catalog/:branch/:year/:semester/:subject", async (req, res) => {
  try {
    const { branch, year, semester, subject } = req.params;
    const notes = await Note.find({
      branch,
      year,
      semester,
      subject,
      approved: true
    }).select("unit fileUrl filename createdAt");

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in /catalog:", error.message);
    res.status(500).json({ message: "Failed to fetch notes for this course" });
  }
});

router.put("/:id/download", async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, { $inc: { downloadCount: 1 } });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to increment download count" });
  }
});

module.exports = router;
