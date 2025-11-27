import React, { useState, useEffect } from 'react';
import './Community.css';
import CommunityChat from './CommunityChat';

const Community = () => {
    const [activeView, setActiveView] = useState('explore');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [savedPosts, setSavedPosts] = useState(new Set());
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState(null);

    // Sample communities data with gradient colors
    const communities = [
        {
            id: 1,
            name: "Mindfulness & Meditation",
            emoji: "🧘",
            members: 1234,
            description: "Daily meditation practices and mindfulness tips",
            posts: 456,
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            name: "Anxiety Support",
            emoji: "💙",
            members: 892,
            description: "A safe space to share and support each other",
            posts: 234,
            gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        },
        {
            id: 3,
            name: "Gratitude Circle",
            emoji: "🌟",
            members: 2341,
            description: "Share daily gratitude and positive vibes",
            posts: 789,
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 4,
            name: "Sleep Better",
            emoji: "😴",
            members: 567,
            description: "Tips and discussions about improving sleep quality",
            posts: 145,
            gradient: "linear-gradient(135deg, #4facfe 0%, #667eea 100%)"
        },
        {
            id: 5,
            name: "Mood Warriors",
            emoji: "💪",
            members: 1567,
            description: "Tracking moods and celebrating progress together",
            posts: 923,
            gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
        },
        {
            id: 6,
            name: "Astrology & Zodiac",
            emoji: "🔮",
            members: 1890,
            description: "Discuss horoscopes, planetary alignments, and cosmic insights",
            posts: 567,
            gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        }
    ];

    // Sample posts/discussions
    const discussions = [
        {
            id: 1,
            community: "Mindfulness & Meditation",
            author: "Sarah M.",
            avatar: "🌸",
            time: "2 hours ago",
            content: "Just finished a 20-minute meditation session and feeling so centered! Anyone else practicing today?",
            likes: 24,
            replies: 8,
            tags: ["meditation", "mindfulness"]
        },
        {
            id: 2,
            community: "Gratitude Circle",
            author: "Alex K.",
            avatar: "✨",
            time: "4 hours ago",
            content: "Grateful for: ☕ morning coffee, 🌅 beautiful sunrise, and 💚 supportive friends. What are you grateful for today?",
            likes: 56,
            replies: 23,
            tags: ["gratitude", "positivity"]
        },
        {
            id: 3,
            community: "Anxiety Support",
            author: "Jamie L.",
            avatar: "🌈",
            time: "6 hours ago",
            content: "Had a tough day but using the breathing techniques we discussed. It's really helping! Thank you all for your support.",
            likes: 89,
            replies: 34,
            tags: ["support", "breathing"]
        },
        {
            id: 4,
            community: "Mood Warriors",
            author: "Chris P.",
            avatar: "🚀",
            time: "8 hours ago",
            content: "30-day streak of tracking my mood! 🎉 The insights are incredible. Highly recommend to everyone!",
            likes: 102,
            replies: 18,
            tags: ["milestone", "tracking"]
        },
        {
            id: 5,
            community: "Sleep Better",
            author: "Taylor R.",
            avatar: "🌙",
            time: "10 hours ago",
            content: "Tried the sleep meditation recommended here - slept through the night for the first time in weeks! 😊",
            likes: 67,
            replies: 12,
            tags: ["sleep", "success"]
        },
        {
            id: 6,
            community: "Astrology & Zodiac",
            author: "Morgan F.",
            avatar: "⭐",
            time: "12 hours ago",
            content: "Full moon tonight! 🌕 What rituals are you doing? I'm journaling and setting intentions.",
            likes: 45,
            replies: 29,
            tags: ["fullmoon", "rituals"]
        }
    ];

    const filters = [
        { id: 'all', label: 'All Posts', icon: '📱' },
        { id: 'trending', label: 'Trending', icon: '🔥' },
        { id: 'recent', label: 'Recent', icon: '🆕' },
        { id: 'saved', label: 'Saved', icon: '🔖' }
    ];

    const handleLike = (postId) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleSave = (postId) => {
        setSavedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const handleJoinCommunity = (community) => {
        setSelectedCommunity(community);
        setActiveView('chat');
    };

    if (activeView === 'chat' && selectedCommunity) {
        return (
            <CommunityChat
                community={selectedCommunity}
                onBack={() => setActiveView('explore')}
            />
        );
    }

    if (activeView === 'explore') {
        return (
            <div className="community-container">
                {/* Header */}
                <div className="community-header-section">
                    <button className="back-button glass-card" onClick={() => setActiveView('main')}>
                        <span className="back-icon">←</span>
                        <span>Back</span>
                    </button>
                    <h1 className="community-main-title">
                        <span className="title-icon">🌍</span>
                        Explore Communities
                    </h1>
                    <button className="create-post-btn glass-card" onClick={() => setShowCreatePost(true)}>
                        <span className="plus-icon">+</span>
                        <span>Create Post</span>
                    </button>
                </div>

                {/* Filter Pills */}
                <div className="filter-pills">
                    {filters.map(filter => (
                        <button
                            key={filter.id}
                            className={`filter-pill ${selectedFilter === filter.id ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(filter.id)}
                        >
                            <span className="filter-icon">{filter.icon}</span>
                            <span>{filter.label}</span>
                        </button>
                    ))}
                </div>

                {/* Communities Grid */}
                <div className="communities-section">
                    <h2 className="section-heading">
                        <span className="heading-icon">✨</span>
                        Popular Communities
                    </h2>
                    <div className="communities-grid">
                        {communities.map(community => (
                            <div key={community.id} className="community-card glass-card fade-in">
                                <div className="community-gradient-bg" style={{ background: community.gradient }}></div>
                                <div className="community-content">
                                    <div className="community-emoji-wrapper">
                                        <span className="community-emoji-large">{community.emoji}</span>
                                    </div>
                                    <h3 className="community-title">{community.name}</h3>
                                    <p className="community-desc">{community.description}</p>
                                    <div className="community-stats">
                                        <div className="stat-badge">
                                            <span className="stat-icon">👥</span>
                                            <span className="stat-value">{community.members.toLocaleString()}</span>
                                        </div>
                                        <div className="stat-badge">
                                            <span className="stat-icon">💬</span>
                                            <span className="stat-value">{community.posts}</span>
                                        </div>
                                    </div>
                                    <button
                                        className="join-button"
                                        style={{ background: community.gradient }}
                                        onClick={() => handleJoinCommunity(community)}
                                    >
                                        <span>Join Community</span>
                                        <span className="join-arrow">→</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Discussions */}
                <div className="discussions-section">
                    <h2 className="section-heading">
                        <span className="heading-icon">💬</span>
                        Recent Discussions
                    </h2>
                    <div className="discussions-feed">
                        {discussions.map((post, index) => (
                            <div
                                key={post.id}
                                className="discussion-card glass-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Post Header */}
                                <div className="post-header">
                                    <div className="post-author-section">
                                        <div className="author-avatar">{post.avatar}</div>
                                        <div className="author-info">
                                            <span className="author-name">{post.author}</span>
                                            <span className="post-metadata">
                                                <span className="community-badge">{post.community}</span>
                                                <span className="separator">•</span>
                                                <span className="post-time">{post.time}</span>
                                            </span>
                                        </div>
                                    </div>
                                    <button className="post-menu-btn">⋯</button>
                                </div>

                                {/* Post Content */}
                                <p className="post-content">{post.content}</p>

                                {/* Post Tags */}
                                <div className="post-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag-badge">#{tag}</span>
                                    ))}
                                </div>

                                {/* Post Actions */}
                                <div className="post-actions">
                                    <button
                                        className={`action-button ${likedPosts.has(post.id) ? 'active liked' : ''}`}
                                        onClick={() => handleLike(post.id)}
                                    >
                                        <span className="action-icon">{likedPosts.has(post.id) ? '❤️' : '🤍'}</span>
                                        <span className="action-count">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                    </button>
                                    <button className="action-button">
                                        <span className="action-icon">💬</span>
                                        <span className="action-count">{post.replies}</span>
                                    </button>
                                    <button
                                        className={`action-button ${savedPosts.has(post.id) ? 'active saved' : ''}`}
                                        onClick={() => handleSave(post.id)}
                                    >
                                        <span className="action-icon">{savedPosts.has(post.id) ? '🔖' : '📑'}</span>
                                        <span className="action-label">{savedPosts.has(post.id) ? 'Saved' : 'Save'}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Create Post Modal */}
                {showCreatePost && (
                    <div className="modal-overlay" onClick={() => setShowCreatePost(false)}>
                        <div className="create-post-modal glass-card" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3>Create New Post</h3>
                                <button className="close-modal" onClick={() => setShowCreatePost(false)}>×</button>
                            </div>
                            <div className="modal-body">
                                <textarea
                                    className="post-textarea glass-input"
                                    placeholder="What's on your mind?"
                                    rows="5"
                                />
                                <select className="community-select glass-input">
                                    <option value="">Select a community...</option>
                                    {communities.map(c => (
                                        <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button className="cancel-btn" onClick={() => setShowCreatePost(false)}>Cancel</button>
                                <button className="submit-btn">Post</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Main community view
    return (
        <div className="community-main-view">
            <div className="community-welcome glass-card">
                <div className="welcome-icon-wrapper">
                    <span className="welcome-icon">👥</span>
                </div>
                <h2 className="welcome-title">Join the Community</h2>
                <p className="welcome-description">Connect with like-minded people on their mental wellness journey</p>

                <div className="stats-grid">
                    <div className="stat-card glass-card">
                        <div className="stat-number gradient-text">127</div>
                        <div className="stat-label">Active Members</div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-number gradient-text">45</div>
                        <div className="stat-label">Posts Today</div>
                    </div>
                    <div className="stat-card glass-card">
                        <div className="stat-number gradient-text">12</div>
                        <div className="stat-label">Communities</div>
                    </div>
                </div>

                <button className="explore-button" onClick={() => setActiveView('explore')}>
                    <span>Explore Communities</span>
                    <span className="explore-arrow">→</span>
                </button>
            </div>
        </div>
    );
};

export default Community;
