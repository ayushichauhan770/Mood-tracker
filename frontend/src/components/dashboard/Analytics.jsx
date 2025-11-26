import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import './profile.css';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Analytics = () => {
    const [stats, setStats] = useState({
        totalMoods: 0,
        streak: 0,
        avgScore: 0,
        happyPercentage: 0,
        moodDistribution: {},
        weeklyData: [],
        monthlyData: []
    });

    useEffect(() => {
        calculateAnalytics();
    }, []);

    const calculateAnalytics = () => {
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');

        if (moodHistory.length === 0) {
            return;
        }

        // Calculate basic stats
        const totalMoods = moodHistory.length;
        const distribution = {};
        const moodScores = { happy: 5, calm: 4, neutral: 3, sad: 2, angry: 1 };

        moodHistory.forEach(entry => {
            distribution[entry.mood] = (distribution[entry.mood] || 0) + 1;
        });

        const avgScore = (
            moodHistory.reduce((sum, entry) => sum + (moodScores[entry.mood] || 3), 0) / totalMoods
        ).toFixed(1);

        const happyPercentage = distribution.happy
            ? ((distribution.happy / totalMoods) * 100).toFixed(0)
            : 0;

        // Calculate streak
        const streak = calculateStreak(moodHistory);

        // Get last 30 days data for line chart
        const monthlyData = getLast30DaysData(moodHistory, moodScores);

        // Get weekly summary
        const weeklyData = getWeeklySummary(moodHistory, moodScores);

        setStats({
            totalMoods,
            streak,
            avgScore,
            happyPercentage,
            moodDistribution: distribution,
            weeklyData,
            monthlyData
        });
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

    const getLast30DaysData = (moodHistory, moodScores) => {
        const last30Days = [];
        const now = new Date();

        for (let i = 29; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toDateString();

            const dayMoods = moodHistory.filter(
                entry => new Date(entry.date).toDateString() === dateStr
            );

            let avgScore = 0;
            if (dayMoods.length > 0) {
                avgScore = dayMoods.reduce((sum, entry) => sum + (moodScores[entry.mood] || 3), 0) / dayMoods.length;
            }

            last30Days.push({
                date: dateStr,
                label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                score: avgScore
            });
        }

        return last30Days;
    };

    const getWeeklySummary = (moodHistory, moodScores) => {
        const now = new Date();
        const weeklyData = [];

        for (let week = 0; week < 4; week++) {
            const weekStart = new Date(now);
            weekStart.setDate(weekStart.getDate() - (week + 1) * 7);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 7);

            const weekMoods = moodHistory.filter(entry => {
                const entryDate = new Date(entry.date);
                return entryDate >= weekStart && entryDate < weekEnd;
            });

            let avgScore = 0;
            if (weekMoods.length > 0) {
                avgScore = (weekMoods.reduce((sum, entry) => sum + (moodScores[entry.mood] || 3), 0) / weekMoods.length).toFixed(1);
            }

            weeklyData.unshift({
                week: `Week ${4 - week}`,
                count: weekMoods.length,
                avgScore
            });
        }

        return weeklyData;
    };

    // Line Chart Data
    const lineChartData = {
        labels: stats.monthlyData.map(d => d.label),
        datasets: [
            {
                label: 'Mood Score',
                data: stats.monthlyData.map(d => d.score),
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#8B5CF6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }
        ]
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1F2937',
                padding: 12,
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#8B5CF6',
                borderWidth: 1,
                callbacks: {
                    label: (context) => {
                        return `Mood Score: ${context.parsed.y.toFixed(2)}`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
                ticks: {
                    stepSize: 1,
                    callback: (value) => {
                        const labels = ['', '😤', '😔', '😐', '😌', '😊'];
                        return labels[value] || value;
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    maxRotation: 45,
                    minRotation: 45
                }
            }
        }
    };

    // Doughnut Chart Data
    const moodColors = {
        happy: '#4caf50',
        calm: '#2196f3',
        neutral: '#ff9800',
        sad: '#9c27b0',
        angry: '#f44336'
    };

    const doughnutChartData = {
        labels: Object.keys(stats.moodDistribution).map(mood =>
            mood.charAt(0).toUpperCase() + mood.slice(1)
        ),
        datasets: [
            {
                data: Object.values(stats.moodDistribution),
                backgroundColor: Object.keys(stats.moodDistribution).map(mood => moodColors[mood]),
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 10
            }
        ]
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 15,
                    font: {
                        size: 13
                    },
                    generateLabels: (chart) => {
                        const data = chart.data;
                        if (data.labels.length && data.datasets.length) {
                            return data.labels.map((label, i) => {
                                const value = data.datasets[0].data[i];
                                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);

                                return {
                                    text: `${label}: ${percentage}%`,
                                    fillStyle: data.datasets[0].backgroundColor[i],
                                    hidden: false,
                                    index: i
                                };
                            });
                        }
                        return [];
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1F2937',
                padding: 12,
                callbacks: {
                    label: (context) => {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((context.parsed / total) * 100).toFixed(1);
                        return `${context.label}: ${context.parsed} (${percentage}%)`;
                    }
                }
            }
        },
        cutout: '65%'
    };

    const getMoodEmoji = (mood) => {
        const emojis = { happy: '😊', calm: '😌', neutral: '😐', sad: '😔', angry: '😤' };
        return emojis[mood] || '😐';
    };

    if (stats.totalMoods === 0) {
        return (
            <div className="profile-container">
                <div className="section-card" style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="stat-icon" style={{ fontSize: '4rem', marginBottom: '20px' }}>📊</div>
                    <h2 className="section-title" style={{ justifyContent: 'center' }}>No Data Yet</h2>
                    <p className="profile-bio" style={{ marginBottom: '30px' }}>
                        Start tracking your moods to see insights and analytics!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {/* Header */}
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            <span className="avatar-emoji">📊</span>
                        </div>
                        <div className="avatar-ring"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">Analytics & Insights</h1>
                        <p className="profile-bio">Track your emotional wellness journey 📈</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <div className="stat-icon">📊</div>
                        <div className="stat-value">{stats.totalMoods}</div>
                        <div className="stat-label">Total Moods</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">🔥</div>
                        <div className="stat-value">{stats.streak}</div>
                        <div className="stat-label">Day Streak</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-value">{stats.avgScore}</div>
                        <div className="stat-label">Avg Score</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon">😊</div>
                        <div className="stat-value">{stats.happyPercentage}%</div>
                        <div className="stat-label">Positive</div>
                    </div>
                </div>
            </div>

            {/* Mood Trends Chart */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">📈</span>
                    Mood Trends (Last 30 Days)
                </h2>
                <div style={{ height: '300px', padding: '20px 10px' }}>
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>
            </div>

            {/* Weekly Summary */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">📅</span>
                    Weekly Summary
                </h2>
                <div className="mood-distribution">
                    {stats.weeklyData.map((week, index) => (
                        <div key={index} className="mood-bar-container">
                            <div className="mood-bar-header">
                                <span className="mood-bar-emoji">📆</span>
                                <span className="mood-bar-label">{week.week}</span>
                                <span className="mood-bar-percentage">
                                    {week.count} moods • Avg: {week.avgScore || 'N/A'}
                                </span>
                            </div>
                            <div className="mood-bar-track">
                                <div
                                    className="mood-bar-fill"
                                    style={{
                                        width: week.avgScore ? `${(week.avgScore / 5) * 100}%` : '0%',
                                        background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mood Distribution Doughnut Chart */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">🎨</span>
                    Mood Distribution
                </h2>
                <div style={{ height: '300px', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                </div>
            </div>

            {/* Insights & Recommendations */}
            <div className="section-card wellness-tips">
                <h2 className="section-title">
                    <span className="title-icon">💡</span>
                    Insights & Recommendations
                </h2>
                <div className="tips-container">
                    {stats.avgScore >= 4 && (
                        <div className="tip-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                            <span className="tip-emoji">🌟</span>
                            <p>You're doing great! Your average mood score is {stats.avgScore}/5. Keep up the positive energy!</p>
                        </div>
                    )}
                    {stats.avgScore < 3 && (
                        <div className="tip-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                            <span className="tip-emoji">💙</span>
                            <p>We notice you've been feeling down. Consider talking to someone or trying meditation exercises.</p>
                        </div>
                    )}
                    {stats.streak >= 7 && (
                        <div className="tip-card">
                            <span className="tip-emoji">🔥</span>
                            <p>Amazing {stats.streak}-day streak! Consistency is key to understanding your emotional patterns.</p>
                        </div>
                    )}
                    {stats.totalMoods >= 30 && (
                        <div className="tip-card">
                            <span className="tip-emoji">📊</span>
                            <p>You've tracked {stats.totalMoods} moods! You now have enough data for meaningful insights.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
