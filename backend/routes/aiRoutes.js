const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_key_here') {
            console.log("Using offline fallback mode for AI");
            return res.json({ reply: getOfflineAIResponse(question) });
        }

        const result = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: question }
            ]
        });

        res.json({ reply: result.choices[0].message.content });

    } catch (error) {
        console.error("AI Error:", error);
        // Fallback on error
        res.json({ reply: getOfflineAIResponse(req.body.question) });
    }
});

// Helper function for offline AI responses
function getOfflineAIResponse(question) {
    const q = question.toLowerCase();

    // Compatibility Analysis Fallback
    if (q.includes("compatibility") && q.includes("json")) {
        return JSON.stringify({
            score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
            description: "These signs share a dynamic and exciting connection. While there may be occasional friction, their differences often complement each other, leading to personal growth for both.",
            tip: "Focus on open communication and appreciate your differences."
        });
    }

    // Big Three Analysis Fallback
    if (q.includes("big three") && q.includes("json")) {
        return JSON.stringify({
            risingSign: "Unknown (Requires exact time)",
            bigThreeExplanation: "Your Sun represents your core self, your Moon governs your emotional inner world, and your Rising sign is the mask you wear for the world.",
            psychologicalProfile: "You are a complex individual with a strong drive for self-expression (Sun) balanced by deep emotional needs (Moon). Your outer demeanor (Rising) helps you navigate social situations effectively."
        });
    }

    // Daily Horoscope Fallback
    if (q.includes("daily horoscope") && q.includes("json")) {
        return JSON.stringify({
            message: "Today brings a wave of creative energy. Trust your instincts and don't be afraid to take a calculated risk.",
            luckyNumber: Math.floor(Math.random() * 9) + 1,
            luckyColor: "Royal Blue"
        });
    }

    return "I am currently in offline mode. Please configure your OpenAI API key for personalized insights.";
}

module.exports = router;
