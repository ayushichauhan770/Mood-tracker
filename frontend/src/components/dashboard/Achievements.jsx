import React, { useState, useEffect } from 'react';
import './Achievements.css';

const Achievements = () => {
    const [stats, setStats] = useState({
        totalMoods: 0,
        totalJournals: 0,
        totalHabits: 0,
        currentStreak: 0,
        xp: 0,
        level: 1
    });

    const [badges, setBadges] = useState([]);

    useEffect(() => {
        calculateStats();
    }, []);

    const calculateStats = () => {
        // Get data from localStorage
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');
        const journalEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
        const habits = JSON.parse(localStorage.getItem('habits') || '[]');

        // Calculate totals
        const totalMoods = moodHistory.length;
        const totalJournals = journalEntries.length;

        // Calculate habit completions
        let totalHabits = 0;
        let maxStreak = 0;
        habits.forEach(habit => {
            totalHabits += habit.history.length;
            if (habit.streak > maxStreak) maxStreak = habit.streak;
        });

        // Calculate XP (10xp per action)
        const xp = (totalMoods * 10) + (totalJournals * 20) + (totalHabits * 5);
        const level = Math.floor(xp / 100) + 1;

        setStats({
            totalMoods,
            totalJournals,
            totalHabits,
            currentStreak: maxStreak,
            xp,
            level
        });

        checkBadges(totalMoods, totalJournals, maxStreak, xp);
    };

    const checkBadges = (moods, journals, streak, xp) => {
        const allBadges = [
            {
                id: 'newcomer',
                name: 'Newcomer',
                icon: '🌱',
                description: 'Started your journey',
                condition: () => true,
                unlocked: true
            },
            {
                id: 'mood_tracker_1',
                name: 'Self Aware',
                icon: '🤔',
                description: 'Logged 5 moods',
                condition: () => moods >= 5,
                unlocked: moods >= 5
            },
            {
                id: 'mood_tracker_2',
                name: 'Emotional Intelligence',
                icon: '🧠',
                description: 'Logged 20 moods',
                condition: () => moods >= 20,
                unlocked: moods >= 20
            },
            {
                id: 'journalist_1',
                name: 'Dear Diary',
                icon: '📔',
                description: 'Wrote first journal entry',
                condition: () => journals >= 1,
                unlocked: journals >= 1
            },
            {
                id: 'journalist_2',
                name: 'Storyteller',
                icon: '✍️',
                description: 'Wrote 10 journal entries',
                condition: () => journals >= 10,
                unlocked: journals >= 10
            },
            {
                id: 'streak_1',
                name: 'Consistency Is Key',
                icon: '🔥',
                description: 'Reached a 3-day streak',
                condition: () => streak >= 3,
                unlocked: streak >= 3
            },
            {
                id: 'streak_2',
                name: 'Unstoppable',
                icon: '🚀',
                description: 'Reached a 7-day streak',
                condition: () => streak >= 7,
                unlocked: streak >= 7
            },
            {
                id: 'level_5',
                name: 'Mind Master',
                icon: '👑',
                description: 'Reached Level 5',
                condition: () => xp >= 400, // Level 5 starts at 400xp
                unlocked: xp >= 400
            }
        ];

        setBadges(allBadges);
    };

    const xpForNextLevel = stats.level * 100;
    const progressPercent = (stats.xp % 100);

    return (
        <div className="achievements-container">
            <div className="level-header">
                <div className="level-circle">
                    <span className="level-number">{stats.level}</span>
                    <span className="level-label">LEVEL</span>
                </div>
                <div className="xp-info">
                    <h3>Total XP: {stats.xp}</h3>
                    <div className="xp-bar-container">
                        <div className="xp-bar" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                    <p>{stats.xp} / {xpForNextLevel} XP to Level {stats.level + 1}</p>
                </div>
            </div>

            <div className="stats-overview">
                <div className="stat-box">
                    <span className="stat-icon">📊</span>
                    <div className="stat-details">
                        <h4>{stats.totalMoods}</h4>
                        <p>Moods Logged</p>
                    </div>
                </div>
                <div className="stat-box">
                    <span className="stat-icon">📝</span>
                    <div className="stat-details">
                        <h4>{stats.totalJournals}</h4>
                        <p>Journal Entries</p>
                    </div>
                </div>
                <div className="stat-box">
                    <span className="stat-icon">✅</span>
                    <div className="stat-details">
                        <h4>{stats.totalHabits}</h4>
                        <p>Habits Done</p>
                    </div>
                </div>
                <div className="stat-box">
                    <span className="stat-icon">🔥</span>
                    <div className="stat-details">
                        <h4>{stats.currentStreak}</h4>
                        <p>Best Streak</p>
                    </div>
                </div>
            </div>

            <h3 className="section-title">🏆 Badges & Milestones</h3>
            <div className="badges-grid">
                {badges.map(badge => (
                    <div key={badge.id} className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}>
                        <div className="badge-icon">
                            {badge.unlocked ? badge.icon : '🔒'}
                        </div>
                        <div className="badge-info">
                            <h4>{badge.name}</h4>
                            <p>{badge.description}</p>
                        </div>
                        {badge.unlocked && <div className="badge-check">✓</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Achievements;
