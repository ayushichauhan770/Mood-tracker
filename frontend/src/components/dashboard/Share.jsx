import React, { useState, useEffect } from 'react';
import './Share.css';

const Share = () => {
    const [stats, setStats] = useState({
        moods: 0,
        streak: 0,
        level: 1,
        zodiac: 'Aries' // Default
    });

    useEffect(() => {
        // Get real stats
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');
        const habits = JSON.parse(localStorage.getItem('habits') || '[]');
        const userSignup = JSON.parse(localStorage.getItem('user-signup') || '{}');

        // Calculate max streak
        let maxStreak = 0;
        habits.forEach(habit => {
            if (habit.streak > maxStreak) maxStreak = habit.streak;
        });

        // Estimate level (simplified logic from Achievements)
        const xp = (moodHistory.length * 10);
        const level = Math.floor(xp / 100) + 1;

        setStats({
            moods: moodHistory.length,
            streak: maxStreak,
            level: level,
            zodiac: userSignup.zodiac || 'Star Child'
        });
    }, []);

    const handleShare = async (platform) => {
        const text = `I'm Level ${stats.level} on MindTracker! 🚀\nLogged ${stats.moods} moods and hit a ${stats.streak}-day streak! #MindTracker #MentalHealth`;
        const url = 'https://mindtracker.app'; // Placeholder URL

        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(`${text}\n${url}`);
                alert('Link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        } else if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        }
    };

    return (
        <div className="share-container">
            <div className="share-header">
                <h2>📱 Share Your Journey</h2>
                <p>Inspire others by sharing your progress and achievements.</p>
            </div>

            <div className="share-preview-card">
                <div className="card-content">
                    <div className="card-header">
                        <span className="app-logo">🧠 MindTracker</span>
                        <span className="user-level">Level {stats.level}</span>
                    </div>

                    <div className="card-body">
                        <div className="stat-highlight">
                            <span className="highlight-value">{stats.moods}</span>
                            <span className="highlight-label">Moods Logged</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-highlight">
                            <span className="highlight-value">{stats.streak}</span>
                            <span className="highlight-label">Day Streak</span>
                        </div>
                    </div>

                    <div className="card-footer">
                        <span className="zodiac-tag">✨ {stats.zodiac}</span>
                        <span className="date-tag">{new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="share-actions">
                <button className="share-btn copy" onClick={() => handleShare('copy')}>
                    <span className="btn-icon">📋</span>
                    Copy Link
                </button>
                <button className="share-btn twitter" onClick={() => handleShare('twitter')}>
                    <span className="btn-icon">🐦</span>
                    Twitter
                </button>
                <button className="share-btn whatsapp" onClick={() => handleShare('whatsapp')}>
                    <span className="btn-icon">💬</span>
                    WhatsApp
                </button>
            </div>

            <div className="invite-section">
                <h3>Invite Friends</h3>
                <p>Get 50 XP for every friend who joins!</p>
                <div className="invite-link-box">
                    <input type="text" value="mindtracker.app/invite/u/ayush" readOnly />
                    <button onClick={() => handleShare('copy')}>Copy</button>
                </div>
            </div>
        </div>
    );
};

export default Share;
