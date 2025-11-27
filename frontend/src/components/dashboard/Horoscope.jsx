import React, { useEffect, useState } from "react";
import "./Horoscope.css";
import { tarotCards, compatibilityData, getMoonPhase } from "../../utils/astrologyData";

const Horoscope = () => {
    const [horoscope, setHoroscope] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dailyReading, setDailyReading] = useState(null);
    const [readingLoading, setReadingLoading] = useState(false);
    const [tarotCard, setTarotCard] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedPartnerSign, setSelectedPartnerSign] = useState("Aries");
    const [moonPhase, setMoonPhase] = useState(getMoonPhase());
    const [bigThree, setBigThree] = useState(null);
    const [compatibilityResult, setCompatibilityResult] = useState(null);

    const zodiacSigns = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    // AI Big Three Analysis
    const generateBigThreeAnalysis = async (sun, moon, birthDetails) => {
        if (!sun || !moon) return;
        try {
            const res = await fetch("https://mood-tracker-backend-p4lb.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `Based on birth date ${birthDetails.birthdate}, time ${birthDetails.birthTime}, and city ${birthDetails.birthLocation.city}:
                    1. Estimate the Rising Sign (Ascendant).
                    2. Explain the user's "Big Three" (Sun in ${sun}, Moon in ${moon}, and the estimated Rising).
                    3. Provide a short, deep psychological profile based on this combination.
                    Format as JSON with keys: risingSign, bigThreeExplanation, psychologicalProfile.`
                })
            });
            const data = await res.json();
            let cleanJson = data.reply.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(cleanJson);
        } catch (err) {
            console.error("AI Error:", err);
            return null;
        }
    };

    // AI Compatibility Analysis
    const generateCompatibilityAnalysis = async (mySign, partnerSign) => {
        setReadingLoading(true);
        try {
            const res = await fetch("https://mood-tracker-backend-p4lb.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `Analyze the romantic compatibility between a ${mySign} and a ${partnerSign}.
                    Provide:
                    1. A compatibility percentage (0-100).
                    2. A short, insightful description of their dynamic.
                    3. One tip for making it work.
                    Format as JSON with keys: score, description, tip.`
                })
            });
            const data = await res.json();
            let cleanJson = data.reply.replace(/```json/g, "").replace(/```/g, "").trim();
            setCompatibilityResult(JSON.parse(cleanJson));
        } catch (err) {
            console.error("AI Error:", err);
        } finally {
            setReadingLoading(false);
        }
    };

    // Fetch Horoscope Data
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setError("User not logged in");
                setLoading(false);
                return;
            }

            try {
                const userRes = await fetch(`/https://mood-tracker-backend-p4lb.onrender.com${userId}`);
                const userData = await userRes.json();

                if (!userData.birthdate || !userData.birthTime || !userData.birthLocation) {
                    setError("Please complete your birth profile in settings first.");
                    setLoading(false);
                    return;
                }

                const res = await fetch("https://mood-tracker-backend-p4lb.onrender.com/api/horoscope/details", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        birthdate: userData.birthdate,
                        birthTime: userData.birthTime,
                        birthLocation: userData.birthLocation
                    })
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Failed to fetch horoscope");

                setHoroscope(data);
                setLoading(false);

                // Generate Daily Reading
                generateDailyReading(data.sunSign);

                // Generate Big Three Analysis
                const analysis = await generateBigThreeAnalysis(data.sunSign, data.moonSign, userData);
                if (analysis) {
                    setBigThree(analysis);
                }

            } catch (err) {
                console.error("Error:", err);
                setError(err.message || "Failed to load cosmic details.");
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // AI Daily Reading
    const generateDailyReading = async (sign) => {
        if (!sign) return;
        setReadingLoading(true);
        try {
            const res = await fetch("https://mood-tracker-backend-p4lb.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    question: `Give me a short, inspiring daily horoscope for ${sign} today. Include lucky number and color. Format as JSON with keys: message, luckyNumber, luckyColor.`
                })
            });
            const data = await res.json();

            // Parse JSON from AI response
            let cleanJson = data.reply.replace(/```json/g, "").replace(/```/g, "").trim();
            setDailyReading(JSON.parse(cleanJson));
        } catch (err) {
            console.error("AI Error:", err);
            setDailyReading({
                message: "The stars align in your favor today. Trust your intuition.",
                luckyNumber: "7",
                luckyColor: "Gold"
            });
        } finally {
            setReadingLoading(false);
        }
    };

    // Tarot Draw
    const drawTarotCard = () => {
        setIsFlipped(false);
        setTimeout(() => {
            const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
            setTarotCard(randomCard);
            setIsFlipped(true);
        }, 300);
    };

    if (loading) return <div className="horoscope-loading">✨ Aligning the stars for you...</div>;
    if (error) return <div className="horoscope-error">{error}</div>;
    if (!horoscope) return null;

    return (
        <div className="horoscope-container">
            <header className="horoscope-header">
                <h1 className="horoscope-title">Cosmic Insights</h1>
                <p className="horoscope-subtitle">Your Personal Astrological Blueprint</p>
            </header>

            {/* Big Three Section */}
            {bigThree && (
                <section className="big-three-section feature-card">
                    <h3 className="card-title">🌟 Your Big Three</h3>
                    <div className="big-three-grid">
                        <div className="big-three-card sun">
                            <div className="planet-icon">☀️</div>
                            <div className="planet-info">
                                <span className="planet-label">Sun (Essence)</span>
                                <span className="planet-sign">{horoscope.sunSign}</span>
                            </div>
                        </div>
                        <div className="big-three-card moon">
                            <div className="planet-icon">🌙</div>
                            <div className="planet-info">
                                <span className="planet-label">Moon (Emotion)</span>
                                <span className="planet-sign">{horoscope.moonSign}</span>
                            </div>
                        </div>
                        <div className="big-three-card rising">
                            <div className="planet-icon">🌅</div>
                            <div className="planet-info">
                                <span className="planet-label">Rising (Mask)</span>
                                <span className="planet-sign">{bigThree.risingSign}</span>
                            </div>
                        </div>
                    </div>
                    <div className="big-three-analysis">
                        <p>{bigThree.bigThreeExplanation}</p>
                        <div className="psych-profile">
                            <strong>Psychological Profile:</strong> {bigThree.psychologicalProfile}
                        </div>
                    </div>
                </section>
            )}

            {/* Daily Reading */}
            <section className="daily-reading-section">
                <div className="daily-card">
                    <div className="daily-card-header">
                        <span className="daily-date">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        <button className="refresh-btn" onClick={() => generateDailyReading(horoscope.sunSign)} disabled={readingLoading}>
                            {readingLoading ? "..." : "↻"}
                        </button>
                    </div>

                    <div className="daily-content">
                        <div className="reading-text">
                            <h3>Daily Forecast</h3>
                            <p>{dailyReading ? dailyReading.message : "Consulting the cosmos..."}</p>

                            <div className="daily-stats-grid">
                                <div className="stat-box">
                                    <span className="stat-label">Lucky Number</span>
                                    <span className="stat-val">{dailyReading?.luckyNumber || "-"}</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-label">Power Color</span>
                                    <span className="stat-val">{dailyReading?.luckyColor || "-"}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="features-grid">
                {/* Tarot Card */}
                <div className="feature-card tarot-container">
                    <h3 className="card-title">🎴 Daily Tarot</h3>
                    <div className={`tarot-card-flip ${isFlipped ? "flipped" : ""}`} onClick={drawTarotCard}>
                        <div className="tarot-inner">
                            <div className="tarot-front">
                                <div className="card-pattern">✨</div>
                            </div>
                            <div className="tarot-back">
                                {tarotCard ? (
                                    <>
                                        <div className="tarot-img-placeholder">🔮</div>
                                        <div className="tarot-name">{tarotCard.name}</div>
                                        <p className="tarot-meaning">{tarotCard.meaning}</p>
                                    </>
                                ) : (
                                    <div className="tarot-name">Tap to Reveal</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button className="draw-btn" onClick={drawTarotCard}>Draw Card</button>
                </div>

                {/* AI Compatibility */}
                <div className="feature-card">
                    <h3 className="card-title">❤️ Relationship Synergy</h3>
                    <div className="compatibility-selectors">
                        <select
                            className="zodiac-select"
                            value={selectedPartnerSign}
                            onChange={(e) => setSelectedPartnerSign(e.target.value)}
                        >
                            {zodiacSigns.map(sign => (
                                <option key={sign} value={sign}>{sign}</option>
                            ))}
                        </select>
                        <button
                            className="analyze-btn"
                            onClick={() => generateCompatibilityAnalysis(horoscope.sunSign, selectedPartnerSign)}
                            disabled={readingLoading}
                        >
                            {readingLoading ? "Analyzing..." : "Analyze"}
                        </button>
                    </div>

                    {compatibilityResult ? (
                        <div className="match-result ai-match">
                            <div className="match-score">{compatibilityResult.score}%</div>
                            <p className="match-desc">{compatibilityResult.description}</p>
                            <div className="match-tip">
                                <strong>💡 Tip:</strong> {compatibilityResult.tip}
                            </div>
                        </div>
                    ) : (
                        <div className="match-placeholder">
                            Select a sign to analyze compatibility
                        </div>
                    )}
                </div>

                {/* Lunar Phase */}
                <div className="feature-card">
                    <h3 className="card-title">🌙 Moon Phase</h3>
                    <div className="moon-visual">{moonPhase.emoji}</div>
                    <div className="moon-info">
                        <div className="moon-phase-name">{moonPhase.name}</div>
                        <p className="moon-desc">{moonPhase.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Horoscope;
