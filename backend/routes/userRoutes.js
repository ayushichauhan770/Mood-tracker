const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/save-zodiac", async (req, res) => {
    const { userId, zodiacSign } = req.body;

    try {
        await User.findByIdAndUpdate(userId, { zodiac: zodiacSign });
        res.json({ message: "Zodiac sign saved" });
    } catch (err) {
        res.status(500).json({ message: "Error saving zodiac" });
    }
});

router.post("/save-birthdate", async (req, res) => {
    const { userId, birthdate, birthTime, birthLocation } = req.body;

    try {
        await User.findByIdAndUpdate(userId, {
            birthdate,
            birthTime,
            birthLocation
        });
        res.json({ message: "Birth details saved" });
    } catch (err) {
        res.status(500).json({ message: "Error saving birth details" });
    }
});

router.post("/save-personality", async (req, res) => {
    const { userId, personalityAnswers } = req.body;

    try {
        await User.findByIdAndUpdate(userId, { personalityAnswers });
        res.json({ message: "Personality saved" });
    } catch (err) {
        res.status(500).json({ message: "Error saving personality" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user" });
    }
});

module.exports = router;
