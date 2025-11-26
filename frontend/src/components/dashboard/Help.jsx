import React, { useState } from 'react';
import './Support.css';

const Help = () => {
    const [activeFaq, setActiveFaq] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "How do I track my mood?",
            answer: "Simply click on the 'Mood Tracker' icon in the dashboard or the '+' button. Select your current mood, add a note if you like, and save!"
        },
        {
            id: 2,
            question: "Can I delete a journal entry?",
            answer: "Yes, go to the Journal section, find the entry you want to remove, and click the trash icon in the top right corner of the card."
        },
        {
            id: 3,
            question: "How are XP and Levels calculated?",
            answer: "You earn 10 XP for every mood log, 20 XP for journal entries, and 5 XP for completing habits. Levels increase every 100 XP."
        },
        {
            id: 4,
            question: "Is my data private?",
            answer: "Absolutely. Your data is stored locally on your device by default. You can manage visibility settings in the Privacy section."
        },
        {
            id: 5,
            question: "How do I change the app theme?",
            answer: "Go to Settings > Themes to choose from various color schemes like Dark Mode, Ocean Breeze, and more."
        }
    ];

    const toggleFaq = (id) => {
        setActiveFaq(activeFaq === id ? null : id);
    };

    return (
        <div className="support-container">
            <div className="support-header">
                <h2>❓ Help & Support</h2>
                <p>Find answers to common questions and learn how to get the most out of MindTracker.</p>
            </div>

            <div className="support-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                    {faqs.map(faq => (
                        <div
                            key={faq.id}
                            className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}
                            onClick={() => toggleFaq(faq.id)}
                        >
                            <div className="faq-question">
                                <h4>{faq.question}</h4>
                                <span className="faq-toggle">{activeFaq === faq.id ? '−' : '+'}</span>
                            </div>
                            <div className="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="support-section">
                <h3>Contact Support</h3>
                <div className="contact-card">
                    <p>Still need help? Our team is here for you.</p>
                    <div className="contact-methods">
                        <a href="mailto:support@mindtracker.app" className="contact-btn email">
                            📧 Email Support
                        </a>
                        <a href="#" className="contact-btn chat">
                            💬 Live Chat (Coming Soon)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
