const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  });


// Middleware
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/, // Allow any localhost port for development
  /^https:\/\/.*\.onrender\.com$/, // Allow any Render deployment
  process.env.FRONTEND_URL // Additional frontend URL from env
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const moodRoutes = require("./routes/moodRoutes");
const horoscopeRoutes = require("./routes/horoscopeRoutes");
const communityRoutes = require("./routes/communityRoutes");
const aiRoutes = require("./routes/aiRoutes");

// Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/horoscope", horoscopeRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/ai", aiRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "MindTracker API Server is running!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
