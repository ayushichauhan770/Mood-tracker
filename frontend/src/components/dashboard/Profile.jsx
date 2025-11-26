import React, { useState, useEffect } from 'react';
import './profile.css';
import MoodCalendar from './MoodCalendar';

const Profile = () => {
    const [stats, setStats] = useState({
        totalMoods: 0,
        streak: 0,
        avgScore: 0,
        moodDistribution: {},
        memberSince: localStorage.getItem('memberSince') || new Date().toISOString()
    });

    const [achievements, setAchievements] = useState([
        { id: 1, name: 'First Step', icon: '🌟', description: 'Track your first mood', unlocked: false, progress: 0, goal: 1 },
        { id: 2, name: 'Week Warrior', icon: '🔥', description: '7-day streak', unlocked: false, progress: 0, goal: 7 },
        { id: 3, name: 'Centurion', icon: '💯', description: 'Track 100 moods', unlocked: false, progress: 0, goal: 100 },
        { id: 4, name: 'Storyteller', icon: '📝', description: 'Add your first note', unlocked: false, progress: 0, goal: 1 },
        { id: 5, name: 'Month Master', icon: '📅', description: '30-day streak', unlocked: false, progress: 0, goal: 30 },
        { id: 6, name: 'Consistent', icon: '⭐', description: 'Track mood 50 times', unlocked: false, progress: 0, goal: 50 }
    ]);

    useEffect(() => {
        calculateStats();
    }, []);

    const calculateStats = () => {
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');

        // Calculate total moods
        const totalMoods = moodHistory.length;

        // Calculate mood distribution
        const distribution = {};
        moodHistory.forEach(entry => {
            distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
        });

        // Calculate streak
        const streak = calculateStreak(moodHistory);

        // Calculate average score (happy=5, calm=4, neutral=3, sad=2, angry=1)
        const moodScores = { happy: 5, calm: 4, neutral: 3, sad: 2, angry: 1 };
        const avgScore = moodHistory.length > 0
            ? (moodHistory.reduce((sum, entry) => sum + (moodScores[entry.mood] || 3), 0) / moodHistory.length).toFixed(1)
            : 0;

        setStats({
            totalMoods,
            streak,
            avgScore,
            moodDistribution: distribution,
            memberSince: localStorage.getItem('memberSince') || new Date().toISOString()
        });

        // Update achievements
        updateAchievements(moodHistory, streak);
    };

    const calculateStreak = (moodHistory) => {
        if (moodHistory.length === 0) return 0;

        const sortedDates = moodHistory
            .map(entry => new Date(entry.date).toDateString())
            .sort((a, b) => new Date(b) - new Date(a));

        let streak = 1;
        const today = new Date().toDateString();

        if (sortedDates[0] !== today && sortedDates[0] !== new Date(Date.now() - 86400000).toDateString()) {
            return 0;
        }

        for (let i = 0; i < sortedDates.length - 1; i++) {
            const current = new Date(sortedDates[i]);
            const next = new Date(sortedDates[i + 1]);
            const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                streak++;
            } else if (diffDays > 1) {
                break;
            }
        }

        return streak;
    };

    const updateAchievements = (moodHistory, streak) => {
        const notesCount = moodHistory.filter(entry => entry.note && entry.note.trim()).length;

        setAchievements(prev => prev.map(achievement => {
            let progress = 0;
            let unlocked = false;

            switch (achievement.id) {
                case 1: // First mood
                    progress = Math.min(moodHistory.length, 1);
                    unlocked = moodHistory.length >= 1;
                    break;
                case 2: // 7-day streak
                    progress = Math.min(streak, 7);
                    unlocked = streak >= 7;
                    break;
                case 3: // 100 moods
                    progress = Math.min(moodHistory.length, 100);
                    unlocked = moodHistory.length >= 100;
                    break;
                case 4: // First note
                    progress = Math.min(notesCount, 1);
                    unlocked = notesCount >= 1;
                    break;
                case 5: // 30-day streak
                    progress = Math.min(streak, 30);
                    unlocked = streak >= 30;
                    break;
                case 6: // 50 moods
                    progress = Math.min(moodHistory.length, 50);
                    unlocked = moodHistory.length >= 50;
                    break;
                default:
                    break;
            }

            return { ...achievement, progress, unlocked };
        }));
    };

    const getMoodColor = (mood) => {
        const colors = {
            happy: '#4caf50',
            calm: '#2196f3',
            neutral: '#ff9800',
            sad: '#9c27b0',
            angry: '#f44336'
        };
        return colors[mood] || '#999';
    };

    const getMoodEmoji = (mood) => {
        const emojis = {
            happy: '😊',
            calm: '😌',
            neutral: '😐',
            sad: '😔',
            angry: '😤'
        };
        return emojis[mood] || '😐';
    };

    const getMemberDuration = () => {
        const memberDate = new Date(stats.memberSince);
        const now = new Date();
        const diffTime = Math.abs(now - memberDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return `${diffDays} days`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`;
        return `${Math.floor(diffDays / 365)} years`;
    };

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            <span className="avatar-emoji">👤</span>
                        </div>
                        <div className="avatar-ring"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">MindTracker User</h1>
                        <p className="profile-bio">Tracking my journey to better mental wellness 🌱</p>
                        <div className="profile-meta">
                            <span className="meta-item">
                                <span className="meta-icon">📅</span>
                                Member for {getMemberDuration()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">{stats.streak}</div>
                        <div className="stat-label">Day Streak</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-value">{stats.totalMoods}</div>
                        <div className="stat-label">Moods Tracked</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-value">{stats.avgScore}</div>
                        <div className="stat-label">Avg Score</div>
                    </div>
                </div>
            </div>

            {/* Mood Distribution */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">🎨</span>
                    Mood Distribution
                </h2>
                <div className="mood-distribution">
                    {Object.entries(stats.moodDistribution).map(([mood, count]) => {
                        const percentage = ((count / stats.totalMoods) * 100).toFixed(1);
                        return (
                            <div key={mood} className="mood-bar-container">
                                <div className="mood-bar-header">
                                    <span className="mood-bar-emoji">{getMoodEmoji(mood)}</span>
                                    <span className="mood-bar-label">{mood}</span>
                                    <span className="mood-bar-percentage">{percentage}%</span>
                                </div>
                                <div className="mood-bar-track">
                                    <div
                                        className="mood-bar-fill"
                                        style={{
                                            width: `${percentage}%`,
                                            background: getMoodColor(mood)
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                    {stats.totalMoods === 0 && (
                        <p className="empty-state">Start tracking moods to see your distribution!</p>
                    )}
                </div>
            </div>

            {/* Mood Calendar */}
            <MoodCalendar />

            {/* Achievements */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">🏆</span>
                    Achievements
                </h2>
                <div className="achievements-grid">
                    {achievements.map(achievement => (
                        <div
                            key={achievement.id}
                            className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                        >
                            <div className="badge-icon">{achievement.icon}</div>
                            <div className="badge-info">
                                <h3 className="badge-name">{achievement.name}</h3>
                                <p className="badge-description">{achievement.description}</p>
                                <div className="badge-progress">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(achievement.progress / achievement.goal) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="progress-text">
                                        {achievement.progress}/{achievement.goal}
                                    </span>
                                </div>
                            </div>
                            {achievement.unlocked && <div className="unlock-badge">✓</div>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Wellness Tips */}
            <div className="section-card wellness-tips">
                <h2 className="section-title">
                    <span className="title-icon">💡</span>
                    Wellness Tips
                </h2>
                <div className="tips-container">
                    <div className="tip-card">
                        <span className="tip-emoji">🧘</span>
                        <p>Take 5 minutes to meditate daily</p>
                    </div>
                    <div className="tip-card">
                        <span className="tip-emoji">💧</span>
                        <p>Stay hydrated throughout the day</p>
                    </div>
                    <div className="tip-card">
                        <span className="tip-emoji">🌙</span>
                        <p>Maintain a consistent sleep schedule</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
