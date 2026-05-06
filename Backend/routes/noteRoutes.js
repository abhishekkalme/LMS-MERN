const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { cacheGet, cacheSet, cacheDel } = require("../utils/cache");

router.get("/recent", async (req, res) => {
  const cacheKey = "notes:recent";
  const cached = cacheGet(cacheKey);
  if (cached) return res.status(200).json(cached);

  try {
    const notes = await Note.find({ approved: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("branch semester year subject unit fileUrl createdAt")
      .populate("uploadedBy", "name");

    cacheSet(cacheKey, notes, 300);
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in /recent:", error.message);
    res.status(500).json({ message: "Failed to fetch recent uploads" });
  }
});

router.get("/catalog/:branch/:year/:semester/:subject", async (req, res) => {
  const { branch, year, semester, subject } = req.params;
  const cacheKey = `notes:catalog:${branch}:${year}:${semester}:${subject}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.status(200).json(cached);

  try {
    const notes = await Note.find({
      branch,
      year,
      semester,
      subject,
      approved: true
    }).select("unit fileUrl filename createdAt");

    cacheSet(cacheKey, notes, 900);
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
