import React, { useState, useEffect } from 'react';
import './profile.css';

const MoodCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarData, setCalendarData] = useState([]);
    const [stats, setStats] = useState({
        totalDays: 0,
        trackedDays: 0,
        streak: 0
    });

    useEffect(() => {
        generateCalendar();
    }, [currentDate]);

    const generateCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Get first day of month and total days
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Get mood history from localStorage
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');

        // Create calendar grid
        const days = [];

        // Add empty cells for days before start of month
        for (let i = 0; i < firstDay; i++) {
            days.push({ day: null, mood: null });
        }

        // Add days of month with mood data
        let trackedCount = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = new Date(year, month, day).toDateString();
            const moodEntry = moodHistory.find(entry => new Date(entry.date).toDateString() === dateStr);

            if (moodEntry) trackedCount++;

            days.push({
                day,
                date: dateStr,
                mood: moodEntry ? moodEntry.mood : null,
                note: moodEntry ? moodEntry.note : null
            });
        }

        setCalendarData(days);
        setStats(prev => ({
            ...prev,
            totalDays: daysInMonth,
            trackedDays: trackedCount
        }));
    };

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const getMoodColor = (mood) => {
        const colors = {
            happy: '#4caf50',
            calm: '#2196f3',
            neutral: '#ff9800',
            sad: '#9c27b0',
            angry: '#f44336'
        };
        return colors[mood] || 'rgba(102, 126, 234, 0.1)';
    };

    const getMoodEmoji = (mood) => {
        const emojis = {
            happy: '😊',
            calm: '😌',
            neutral: '😐',
            sad: '😔',
            angry: '😤'
        };
        return emojis[mood] || '';
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="section-card">
            <div className="calendar-header">
                <h2 className="section-title" style={{ margin: 0 }}>
                    <span className="title-icon">📅</span>
                    Mood Calendar
                </h2>
                <div className="month-navigation">
                    <button className="nav-arrow" onClick={() => changeMonth(-1)}>←</button>
                    <span className="current-month">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button className="nav-arrow" onClick={() => changeMonth(1)}>→</button>
                </div>
            </div>

            <div className="calendar-stats">
                <div className="mini-stat">
                    <span className="mini-label">Tracked</span>
                    <span className="mini-value">{stats.trackedDays}/{stats.totalDays}</span>
                </div>
                <div className="mini-stat">
                    <span className="mini-label">Completion</span>
                    <span className="mini-value">{Math.round((stats.trackedDays / stats.totalDays) * 100)}%</span>
                </div>
            </div>

            <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-day-header">{day}</div>
                ))}

                {calendarData.map((day, index) => (
                    <div
                        key={index}
                        className={`calendar-cell ${day.day ? 'active-day' : 'empty-day'} ${day.mood ? 'has-mood' : ''}`}
                        style={{
                            backgroundColor: day.day ? (day.mood ? getMoodColor(day.mood) : 'rgba(255, 255, 255, 0.5)') : 'transparent',
                            cursor: day.mood ? 'pointer' : 'default'
                        }}
                        title={day.note || (day.mood ? `Mood: ${day.mood}` : '')}
                    >
                        {day.day && (
                            <>
                                <span className="day-number">{day.day}</span>
                                {day.mood && <span className="day-emoji">{getMoodEmoji(day.mood)}</span>}
                            </>
                        )}
                    </div>
                ))}
            </div>

            <div className="calendar-legend">
                <div className="legend-item"><span className="legend-dot" style={{ background: '#4caf50' }}></span>Happy</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#2196f3' }}></span>Calm</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#ff9800' }}></span>Neutral</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#9c27b0' }}></span>Sad</div>
                <div className="legend-item"><span className="legend-dot" style={{ background: '#f44336' }}></span>Angry</div>
            </div>
        </div>
    );
};

export default MoodCalendar;
