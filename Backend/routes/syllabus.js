const express = require("express");
const router = express.Router();
const Syllabus = require("../models/syllabus"); // 📚 Import the Syllabus model
const { verifyAdmin } = require("../middleware/verifyToken");

router.post("/", verifyAdmin, async (req, res) => {
  try {
    const syllabus = new Syllabus(req.body);
    await syllabus.save();
    res.status(201).json({ message: "Syllabus added" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({
          error:
            "Duplicate syllabus entry detected. This combination already exists.",
        });
    }
    console.error(err);
    res.status(500).json({ error: "Failed to insert syllabus" });
  }
});

router.delete("/cleanup/duplicates", verifyAdmin, async (req, res) => {
  try {
    console.log("🧪 Cleanup route hit by user:", req.user);

    const all = await Syllabus.find();
    console.log("Total syllabi:", all.length);

    const grouped = {};
    all.forEach((doc) => {
      const key = `${doc.code}__${doc.program}__${doc.grading}__${doc.system}`;
      if (!grouped[key]) {
        grouped[key] = [doc._id];
      } else {
        grouped[key].push(doc._id);
      }
    });

    const toDelete = [];
    Object.values(grouped).forEach((ids) => {
      if (ids.length > 1) toDelete.push(...ids.slice(1));
    });

    console.log("🗑️ Deleting IDs:", toDelete);

    if (toDelete.length > 0) {
      await Syllabus.deleteMany({ _id: { $in: toDelete } });
    }

    res.status(200).json({
      message: `✅ Cleanup complete. Removed ${toDelete.length} duplicate entries.`,
    });
  } catch (err) {
    console.error("❌ Cleanup error:", err.message);
    res.status(500).json({ error: "Server error during cleanup" });
  }
});

// GET /api/syllabus (all or filtered)
router.get("/", async (req, res) => {
  const { program, system, grading } = req.query;

  const filter = {};
  if (program) filter.program = program;
  if (system) filter.system = system;
  if (grading) filter.grading = grading;

  try {
    const data = await Syllabus.find(filter);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update syllabus
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Syllabus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete syllabus
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const deleted = await Syllabus.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Syllabus not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// GET /api/syllabus/departments - Unique departments from DB
router.get("/departments", async (req, res) => {
  try {
    const departments = await Syllabus.aggregate([
      {
        $group: {
          _id: { name: "$name", code: "$code" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          code: "$_id.code",
        },
      },
      {
        $sort: { name: 1 },
      },
    ]);

    res.json(departments);
  } catch (err) {
    console.error("❌ Failed to fetch departments:", err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

module.exports = router;
