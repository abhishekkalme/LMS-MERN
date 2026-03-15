const express = require("express");
const router = express.Router();
const { generateStudyPlan } = require("../utils/aiHelper");

router.post("/generate", async (req, res) => {
    try {
        const { subjects, examDate, targetHours } = req.body;
        
        if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: "Please provide a list of subjects." });
        }

        const plan = await generateStudyPlan(subjects, examDate, targetHours || 4);
        res.status(200).json(plan);
    } catch (error) {
        console.error("Planner Error:", error.message);
        res.status(500).json({ message: error.message || "Failed to generate AI plan." });
    }
});

module.exports = router;
