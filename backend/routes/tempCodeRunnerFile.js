const express = require("express");
const router = express.Router();
const User = require("../models/User");  // Make sure this path is correct
const bcrypt = require("bcryptjs");

// ---------------------- SIGNUP ROUTE ----------------------
router.post("/signup", async (req, res) => {
  try {
    const { 
      name, 
      email, 
      password, 
      zodiac, 
      interests, 
      personalityAnswers 
    } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user with all fields
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      zodiac,
      interests,
      personalityAnswers
    });

    await newUser.save();

    // 4. Respond to the frontend
    res.status(201).json({ message: "Signup successful!", userId: newUser._id });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ---------------------- LOGIN ROUTE ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // 3. Send response
    res.status(200).json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        zodiac: user.zodiac,
        interests: user.interests,
        personalityAnswers: user.personalityAnswers,
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

module.exports = router;
