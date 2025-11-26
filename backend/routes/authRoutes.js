const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

// ---------------------- SIGNUP ROUTE ----------------------
router.post("/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      zodiac,
      birthdate,
      birthTime,
      birthLocation,
      interests,
      personalityAnswers
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      zodiac,
      birthdate,
      birthTime,
      birthLocation,
      personalityAnswers
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful!",
      userId: newUser._id
    });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ---------------------- LOGIN ROUTE ----------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Login successful - return user data
    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      user: {
        name: user.name,
        email: user.email,
        zodiac: user.zodiac,
        birthdate: user.birthdate,
        birthTime: user.birthTime,
        birthLocation: user.birthLocation,
        personalityAnswers: user.personalityAnswers,
      }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
7});

module.exports = router;
