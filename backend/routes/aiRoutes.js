const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post("/ask", async (req, res) => {
    try {
        const { question } = req.body;

        const result = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "user", content: question }
            ]
        });

        res.json({ reply: result.choices[0].message.content });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
