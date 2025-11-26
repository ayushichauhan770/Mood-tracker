import React, { useState } from 'react';
import './Support.css';

const Feedback = () => {
    const [formData, setFormData] = useState({
        type: 'feature',
        rating: 5,
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setTimeout(() => {
            setSubmitted(true);
            setFormData({ type: 'feature', rating: 5, message: '' });
        }, 1000);
    };

    if (submitted) {
        return (
            <div className="support-container">
                <div className="feedback-success">
                    <div className="success-icon">🎉</div>
                    <h2>Thank You!</h2>
                    <p>Your feedback helps us make MindTracker better for everyone.</p>
                    <button className="section-btn" onClick={() => setSubmitted(false)}>
                        Send Another Response
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="support-container">
            <div className="support-header">
                <h2>💭 Send Feedback</h2>
                <p>Have a suggestion or found a bug? We'd love to hear from you.</p>
            </div>

            <div className="feedback-form-card">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Feedback Type</label>
                        <div className="type-selector">
                            <button
                                type="button"
                                className={`type-btn ${formData.type === 'feature' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, type: 'feature' })}
                            >
                                ✨ Feature Request
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${formData.type === 'bug' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, type: 'bug' })}
                            >
                                🐛 Bug Report
                            </button>
                            <button
                                type="button"
                                className={`type-btn ${formData.type === 'general' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, type: 'general' })}
                            >
                                📝 General
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>How would you rate your experience?</label>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                                <span
                                    key={star}
                                    className={`star ${formData.rating >= star ? 'filled' : ''}`}
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Your Message</label>
                        <textarea
                            rows="5"
                            placeholder="Tell us what's on your mind..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        Submit Feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
