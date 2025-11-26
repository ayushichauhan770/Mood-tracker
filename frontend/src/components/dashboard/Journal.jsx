import React, { useState, useEffect } from 'react';
import './Journal.css';

const Journal = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({ title: '', content: '', mood: 'neutral' });
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [promptOfTheDay, setPromptOfTheDay] = useState('');

    const prompts = [
        "What made you smile today?",
        "What is one thing you learned today?",
        "Describe a challenge you overcame recently.",
        "What are you grateful for right now?",
        "How are you feeling physically and mentally?",
        "What is a goal you want to achieve this week?",
        "Write about a person who inspires you.",
        "What is your favorite memory from this month?",
        "If you could change one thing about today, what would it be?",
        "What are you looking forward to tomorrow?"
    ];

    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');
        setEntries(savedEntries);
        generatePrompt();
    }, []);

    const generatePrompt = () => {
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
        setPromptOfTheDay(randomPrompt);
    };

    const saveEntry = () => {
        if (!newEntry.title || !newEntry.content) return;

        const entry = {
            id: Date.now(),
            ...newEntry,
            date: new Date().toISOString(),
            prompt: promptOfTheDay
        };

        const updatedEntries = [entry, ...entries];
        setEntries(updatedEntries);
        localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));

        setNewEntry({ title: '', content: '', mood: 'neutral' });
        setShowAddForm(false);
        generatePrompt(); // New prompt for next time
    };

    const deleteEntry = (id) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            const updatedEntries = entries.filter(entry => entry.id !== id);
            setEntries(updatedEntries);
            localStorage.setItem('journal-entries', JSON.stringify(updatedEntries));
        }
    };

    const filteredEntries = entries.filter(entry =>
        entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getMoodEmoji = (mood) => {
        switch (mood) {
            case 'happy': return '😊';
            case 'excited': return '🤩';
            case 'calm': return '😌';
            case 'neutral': return '😐';
            case 'sad': return '😔';
            case 'stressed': return '😰';
            case 'angry': return '😠';
            default: return '😐';
        }
    };

    return (
        <div className="journal-container">
            <div className="journal-header">
                <h2>📝 Personal Journal</h2>
                <button className="add-entry-btn" onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancel' : '+ New Entry'}
                </button>
            </div>

            {showAddForm && (
                <div className="journal-form">
                    <div className="prompt-box">
                        <span className="prompt-label">✨ Prompt of the Day:</span>
                        <p className="prompt-text">{promptOfTheDay}</p>
                        <button className="refresh-prompt" onClick={generatePrompt}>🔄</button>
                    </div>

                    <input
                        type="text"
                        placeholder="Title your entry..."
                        className="entry-title-input"
                        value={newEntry.title}
                        onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    />

                    <div className="mood-selector">
                        <label>How are you feeling?</label>
                        <select
                            value={newEntry.mood}
                            onChange={(e) => setNewEntry({ ...newEntry, mood: e.target.value })}
                        >
                            <option value="happy">😊 Happy</option>
                            <option value="excited">🤩 Excited</option>
                            <option value="calm">😌 Calm</option>
                            <option value="neutral">😐 Neutral</option>
                            <option value="sad">😔 Sad</option>
                            <option value="stressed">😰 Stressed</option>
                            <option value="angry">😠 Angry</option>
                        </select>
                    </div>

                    <textarea
                        placeholder="Write your thoughts here..."
                        className="entry-content-input"
                        value={newEntry.content}
                        onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    />

                    <button className="save-entry-btn" onClick={saveEntry}>Save Entry</button>
                </div>
            )}

            <div className="journal-search">
                <input
                    type="text"
                    placeholder="🔍 Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="journal-timeline">
                {filteredEntries.length === 0 ? (
                    <div className="empty-journal">
                        <div className="empty-icon">📔</div>
                        <p>No entries found. Start writing your journey!</p>
                    </div>
                ) : (
                    filteredEntries.map(entry => (
                        <div key={entry.id} className="journal-card">
                            <div className="journal-card-header">
                                <div className="journal-meta">
                                    <span className="journal-mood">{getMoodEmoji(entry.mood)}</span>
                                    <span className="journal-date">
                                        {new Date(entry.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <button className="delete-entry-btn" onClick={() => deleteEntry(entry.id)}>×</button>
                            </div>
                            <h3 className="journal-title">{entry.title}</h3>
                            <p className="journal-content">{entry.content}</p>
                            {entry.prompt && (
                                <div className="journal-prompt-ref">
                                    <small>Prompt: {entry.prompt}</small>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Journal;
