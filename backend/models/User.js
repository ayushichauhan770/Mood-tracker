const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  zodiac: String,
  birthdate: { type: String },
  birthTime: { type: String },
  birthLocation: {
    city: { type: String },
    lat: { type: Number },
    lng: { type: Number }
  },
  personalityAnswers: { type: Object },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

