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

module.exports = router;
