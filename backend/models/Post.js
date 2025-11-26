const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
    content: String,
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: String,
    type: {
        type: String,
        enum: ["story", "vent", "discussion", "event"],
        required: true
    },
    category: String, // e.g., "Aries", "Leo", "general", etc.
    title: String,
    content: { type: String, required: true },
    anonymous: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", postSchema);
