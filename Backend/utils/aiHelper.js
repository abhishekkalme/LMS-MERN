const { GoogleGenerativeAI } = require("@google/generative-ai");

const generateStudyPlan = async (subjects, examDate, targetHours) => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
        console.error("❌ GEMINI_API_KEY is missing in process.env.");
        throw new Error("GEMINI_API_KEY is not configured in environment variables. Please restart your backend server.");
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
        You are an expert academic counselor. Create a study plan for a student with the following details:
        - Subjects: ${subjects.join(", ")}
        - Target Exam Date: ${examDate}
        - Daily Study Goal: ${targetHours} hours

        Provide the response in JSON format only, with the following structure:
        {
            "overview": "Short summary of the strategy",
            "schedule": [
                { "day": "Day 1", "task": "Topic to cover in Subject X", "duration": "2 hours" },
                ...
            ],
            "tips": ["Tip 1", "Tip 2"]
        }
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return JSON.parse(text);
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        throw new Error("Failed to generate study plan via AI.");
    }
};

module.exports = { generateStudyPlan };
