const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const { verifyToken } = require("../middleware/verifyToken");

// @route   GET /api/comments/:courseId
// @desc    Get all comments for a specific course/subject
// @access  Public
router.get("/:courseId", async (req, res) => {
  try {
    const comments = await Comment.find({ courseId: req.params.courseId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error("Fetch Comments Error:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// @route   POST /api/comments
// @desc    Post a new comment
// @access  Private
router.post("/", verifyToken, async (req, res) => {
  try {
    const { courseId, text, parentCommentId } = req.body;
    const userId = req.user.id;

    if (!courseId || !text) {
      return res.status(400).json({ error: "Course ID and text are required" });
    }

    const newComment = new Comment({
      userId,
      courseId,
      text,
      parentCommentId: parentCommentId || null,
    });

    await newComment.save();
    
    // Return the populated comment
    const populated = await newComment.populate("userId", "name avatar");
    
    res.status(201).json(populated);
  } catch (error) {
    console.error("Post Comment Error:", error);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Only allow owner or admin to delete
    if (comment.userId.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    console.error("Delete Comment Error:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;
