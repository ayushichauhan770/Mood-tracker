const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");

// SAVE MOOD
router.post("/add", async (req, res) => {
  try {
    const { userId, mood, reason } = req.body;

    const newMood = new Mood({ userId, mood, reason });
    await newMood.save();

    res.status(201).json({ message: "Mood saved successfully!" });
  } catch (err) {
    console.error("Error saving mood:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET MOOD HISTORY
router.get("/history/:userId", async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.params.userId })
      .sort({ date: 1 });

    res.status(200).json(moods);
  } catch (err) {
    console.error("Error fetching mood history:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
