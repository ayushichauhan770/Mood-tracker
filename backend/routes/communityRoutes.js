const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Get all posts with optional filters
router.get("/posts", async (req, res) => {
    try {
        const { type, category } = req.query;
        let filter = {};

        if (type) filter.type = type;
        if (category) filter.category = category;

        const posts = await Post.find(filter)
            .sort({ createdAt: -1 })
            .limit(50);

        res.json(posts);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// Create new post
router.post("/posts", async (req, res) => {
    try {
        const { userId, type, category, title, content, anonymous } = req.body;

        if (!userId || !type || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Get username unless anonymous
        let username = "Anonymous";
        if (!anonymous) {
            const user = await User.findById(userId);
            username = user ? user.name : "User";
        }

        const newPost = new Post({
            userId,
            username,
            type,
            category,
            title,
            content,
            anonymous
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).json({ message: "Error creating post" });
    }
});

// Like/unlike a post
router.post("/posts/:id/like", async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const likeIndex = post.likes.indexOf(userId);
        if (likeIndex > -1) {
            // Unlike
            post.likes.splice(likeIndex, 1);
        } else {
            // Like
            post.likes.push(userId);
        }

        await post.save();
        res.json(post);
    } catch (err) {
        console.error("Error liking post:", err);
        res.status(500).json({ message: "Error liking post" });
    }
});

// Add comment to post
router.post("/posts/:id/comment", async (req, res) => {
    try {
        const { userId, content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const user = await User.findById(userId);
        const comment = {
            userId,
            username: user ? user.name : "User",
            content
        };

        post.comments.push(comment);
        await post.save();
        res.json(post);
    } catch (err) {
        console.error("Error adding comment:", err);
        res.status(500).json({ message: "Error adding comment" });
    }
});

// Delete post (only own posts)
router.delete("/posts/:id", async (req, res) => {
    try {
        const { userId } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted" });
    } catch (err) {
        console.error("Error deleting post:", err);
        res.status(500).json({ message: "Error deleting post" });
    }
});

module.exports = router;
