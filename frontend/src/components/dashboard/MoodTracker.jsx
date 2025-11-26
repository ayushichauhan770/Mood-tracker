import React, { useState } from 'react';
import './dashboard.css';

const MoodTracker = ({ onClose, onSave }) => {
    const [selectedMood, setSelectedMood] = useState(null);
    const [moodNote, setMoodNote] = useState('');

    const moods = [
        { emoji: '😊', label: 'Happy', value: 'happy' },
        { emoji: '😌', label: 'Calm', value: 'calm' },
        { emoji: '😐', label: 'Neutral', value: 'neutral' },
        { emoji: '😔', label: 'Sad', value: 'sad' },
        { emoji: '😤', label: 'Angry', value: 'angry' },
    ];

    const handleMoodClick = (mood) => {
        setSelectedMood(mood);
    };

    const handleSaveMood = () => {
        if (selectedMood) {
            // Get existing mood history
            const history = JSON.parse(localStorage.getItem('mood-history') || '[]');

            // Add new mood entry with note
            const newEntry = {
                mood: selectedMood,
                note: moodNote,
                date: new Date().toISOString()
            };

            history.push(newEntry);

            // Save to localStorage
            localStorage.setItem('mood-history', JSON.stringify(history));

            // Call onSave callback to trigger notification in Dashboard
            if (onSave) {
                onSave();
            }

            // Close modal
            if (onClose) {
                onClose();
            }

            // Reset selection
            setSelectedMood(null);
            setMoodNote('');
        }
    };

    return (
        <div className="section-container">
            <h2 className="section-title">📊 Mood Tracker</h2>
            <div className="mood-content">
                <p className="mood-question">How are you feeling today?</p>
                <div className="mood-options">
                    {moods.map((mood) => (
                        <div
                            key={mood.value}
                            className={`mood-option ${selectedMood === mood.value ? 'selected' : ''}`}
                            onClick={() => handleMoodClick(mood.value)}
                        >
                            <span className="mood-emoji">{mood.emoji}</span>
                            <span className="mood-label">{mood.label}</span>
                        </div>
                    ))}
                </div>

                {selectedMood && (
                    <div className="mood-note-section">
                        <label className="mood-note-label">
                            Why do you feel this way? (Optional)
                        </label>
                        <textarea
                            className="mood-note-input"
                            placeholder="Share your thoughts, what happened today, or what's on your mind..."
                            value={moodNote}
                            onChange={(e) => setMoodNote(e.target.value)}
                            rows="4"
                        />
                    </div>
                )}

                {selectedMood && (
                    <button className="section-btn mood-save-btn" onClick={handleSaveMood}>
                        Save Mood
                    </button>
                )}
            </div>
        </div>
    );
};

export default MoodTracker;
