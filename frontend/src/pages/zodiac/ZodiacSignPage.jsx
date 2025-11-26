import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ZodiacSignPage.css';

import { zodiacSigns } from '../../utils/zodiacData';

const ZodiacSignPage = () => {
    const navigate = useNavigate();
    const [selectedSign, setSelectedSign] = useState(null);
    const [horoscope, setHoroscope] = useState('');

    const handleSignClick = (sign) => {
        setSelectedSign(sign);
    };

    // Simple placeholder horoscope that includes today's date.
    const generateHoroscope = (sign) => {
        const today = new Date().toLocaleDateString();
        return `${sign.name} (${today}): ${sign.description} Today you may feel a surge of energy – use it wisely!`;
    };

    // Update horoscope whenever a sign is selected.
    useEffect(() => {
        if (selectedSign) {
            setHoroscope(generateHoroscope(selectedSign));
        }
    }, [selectedSign]);

    const handleNext = async () => {
        if (!selectedSign) return;

        // Get signup data
        const signupData = JSON.parse(localStorage.getItem("user-signup") || "{}");
        if (!signupData.email) {
            alert("Session expired. Please start over.");
            navigate("/signup");
            return;
        }

        // Gather all data
        const personalityAnswers = JSON.parse(localStorage.getItem("personality-test-responses") || "{}");

        const payload = {
            ...signupData, // name, email, password
            zodiac: selectedSign.name,
            personalityAnswers
        };

        // Call Signup API
        console.log("🚀 Attempting signup with payload:", payload);
        console.log("📡 Sending request to: http://localhost:5000/api/auth/signup");

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            console.log("📥 Response received:", res.status, res.statusText);
            const data = await res.json();
            console.log("📦 Response data:", data);

            if (!res.ok) {
                throw new Error(data.message || "Signup failed");
            }

            console.log("Signup successful:", data);

            // Save userId (if returned)
            if (data.userId) {
                localStorage.setItem("userId", data.userId);
            }

            // Clear temp data
            localStorage.removeItem("user-signup");
            localStorage.removeItem("personality-test-responses");
            localStorage.removeItem("zodiacSign");

            // Navigate to login
            alert("🎉 Signup successful! Please login to continue.");
            navigate('/login');

        } catch (error) {
            console.error("❌ Signup error:", error);
            console.error("Error details:", {
                message: error.message,
                name: error.name,
                stack: error.stack
            });

            // Handle specific errors gracefully
            if (error.message && error.message.toLowerCase().includes("already registered")) {
                // Email already exists - redirect to login
                console.log("Email already registered, redirecting to login...");

                // Clear signup data
                localStorage.removeItem("user-signup");
                localStorage.removeItem("personality-test-responses");
                localStorage.removeItem("zodiacSign");

                alert("✨ Email already registered! Please login to continue.");
                navigate("/login");

            } else if (error.message && error.message.includes("Failed to fetch")) {
                console.error("🔌 Network error - cannot reach backend server");
                alert("⚠️ Cannot connect to server.\\n\\nPlease make sure:\\n• Backend server is running on port 5000\\n• MongoDB is connected\\n\\nThen try again.");
            } else {
                alert("❌ Signup failed: " + (error.message || "Unknown error. Please try again."));
            }
        }
    };

    return (
        <div className="zodiac-page-container">
            <h1 className="zodiac-title">What's your Zodiac Sign?</h1>
            <p className="zodiac-subtitle">Select your sign to continue</p>

            <div className="zodiac-grid">
                {zodiacSigns.map((sign) => (
                    <div
                        key={sign.name}
                        className={`zodiac-card ${selectedSign?.name === sign.name ? 'selected' : ''}`}
                        onClick={() => handleSignClick(sign)}
                    >
                        <div className="zodiac-icon">{sign.icon}</div>
                        <div className="zodiac-name">{sign.name}</div>
                        <div className="zodiac-date">{sign.date}</div>
                    </div>
                ))}
            </div>

            {/* Detailed view for the selected sign */}
            {selectedSign && (
                <div className="zodiac-detail">
                    <h2>{selectedSign.name} {selectedSign.icon}</h2>
                    <p><strong>Date Range:</strong> {selectedSign.date}</p>
                    <p><strong>Element:</strong> {selectedSign.element}</p>
                    <p><strong>Ruling Planet:</strong> {selectedSign.rulingPlanet}</p>
                    <p><strong>Compatibility:</strong> {selectedSign.compatibility}</p>
                    <p><strong>Strengths:</strong> {selectedSign.strengths}</p>
                    <p><strong>Weaknesses:</strong> {selectedSign.weaknesses}</p>
                    <p><strong>Description:</strong> {selectedSign.description}</p>
                    {horoscope && (
                        <div className="horoscope-box">
                            <p>{horoscope}</p>
                        </div>
                    )}
                </div>
            )}

            <button
                className="zodiac-next-btn"
                onClick={handleNext}
                disabled={!selectedSign}
            >
                Complete Signup
            </button>
        </div>
    );
};

export default ZodiacSignPage;
