const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

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

// Chat with community AI
// Chat with community AI
router.post("/chat", async (req, res) => {
    try {
        const { communityName, message, history } = req.body;

        // Define specific personas for different communities
        const personas = {
            "Anxiety Support": [
                { name: "Dr. Calm", role: "a gentle guide who offers breathing techniques and reassurance" },
                { name: "PeacefulMind", role: "a user who shares their own success stories with overcoming panic" }
            ],
            "Depression Support": [
                { name: "HopefulHeart", role: "a supportive friend who listens without judgment" },
                { name: "LightSeeker", role: "someone who suggests small, manageable daily goals" }
            ],
            "Mindfulness & Meditation": [
                { name: "ZenMaster", role: "an experienced meditator who shares wisdom and quotes" },
                { name: "PresentMoment", role: "a beginner who asks thoughtful questions and shares discoveries" }
            ],
            "Sleep Hygiene": [
                { name: "DreamCatcher", role: "an expert on sleep cycles and relaxation routines" },
                { name: "NightOwl", role: "someone who is fixing their sleep schedule and shares tips" }
            ],
            "Stress Management": [
                { name: "ChillVibes", role: "a relaxed individual who suggests hobbies and breaks" },
                { name: "BalanceSeeker", role: "a busy professional who has found ways to manage work-life balance" }
            ]
        };

        // Fallback for other communities
        const defaultPersonas = [
            { name: "Alex", role: "a friendly and welcoming community member" },
            { name: "Sam", role: "a supportive listener" }
        ];

        const communityPersonas = personas[communityName] || defaultPersonas;
        const selectedPersona = communityPersonas[Math.floor(Math.random() * communityPersonas.length)];

        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_key_here') {
            console.log("Using offline fallback mode for chat");
            return res.json({
                reply: getOfflineResponse(selectedPersona.name, communityName, message),
                sender: selectedPersona.name
            });
        }

        // Construct system prompt based on community and persona
        const systemPrompt = `You are ${selectedPersona.name}, ${selectedPersona.role} in the "${communityName}" community chat.
        
        Context: This is a supportive group chat for mental wellness.
        Your Personality: Warm, empathetic, non-judgmental, and human-like.
        
        Instructions:
        1. Keep your response short (under 40 words).
        2. Respond directly to the user's message.
        3. Use casual language, emojis, and maybe a typo occasionally to sound real.
        4. NEVER say you are an AI or a language model.
        5. If the user is in distress, offer gentle support but do not give medical advice.
        
        Current conversation history is provided to give you context.`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...(history || []).map(msg => ({
                role: msg.isUser ? "user" : "assistant",
                content: msg.text
            })),
            { role: "user", content: message }
        ];

        const result = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            max_tokens: 100,
            temperature: 0.7
        });

        res.json({
            reply: result.choices[0].message.content,
            sender: selectedPersona.name
        });

    } catch (err) {
        console.error("Error in community chat:", err);
        // Fallback if API fails
        const { communityName } = req.body;
        const fallbackPersona = "System"; // Or try to reuse selectedPersona if accessible

        res.json({
            reply: getOfflineResponse(fallbackPersona, communityName, "fallback"),
            sender: fallbackPersona
        });
    }
});

// Helper function for offline responses
function getOfflineResponse(personaName, communityName, userMessage) {
    const msg = userMessage.toLowerCase();

    const responses = [
        "That's really interesting, tell us more! 💭",
        "I totally get where you're coming from. 💙",
        "Sending you good vibes! ✨",
        "Thanks for sharing that with the group.",
        "We're all here for you. 🤗",
        "Has anyone else felt this way?",
        "Take a deep breath, you've got this. 🌿"
    ];

    // Specific responses based on keywords
    if (msg.includes("hello") || msg.includes("hi")) {
        return `Hey there! Welcome to the ${communityName} chat! 👋`;
    }
    if (msg.includes("sad") || msg.includes("depressed") || msg.includes("down")) {
        return "I'm sorry you're feeling down. We're here to listen. 💙";
    }
    if (msg.includes("anxious") || msg.includes("panic") || msg.includes("worry")) {
        return "Breathe with us. In... and out. You're safe here. 🌬️";
    }
    if (msg.includes("sleep") || msg.includes("tired")) {
        return "Rest is so important. Have you tried winding down earlier? 😴";
    }
    if (msg.includes("thanks") || msg.includes("thank you")) {
        return "You're so welcome! Happy to help. 🌟";
    }

    return responses[Math.floor(Math.random() * responses.length)];
}

module.exports = router;
