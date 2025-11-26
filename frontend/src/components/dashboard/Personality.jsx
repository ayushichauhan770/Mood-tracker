import React, { useState, useEffect } from 'react';
import './profile.css'; // Reusing the beautiful profile styles

const Personality = () => {
    const [personalityData, setPersonalityData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get personality test responses from localStorage
        const responses = JSON.parse(localStorage.getItem('personality-test-responses') || '{}');

        // Analyze responses and generate personality profile
        const analysis = analyzePersonality(responses);
        setPersonalityData(analysis);
        setLoading(false);
    }, []);

    const analyzePersonality = (responses) => {
        // AI-powered analysis based on image selections
        const traits = {
            introversion: 0,
            extroversion: 0,
            thinking: 0,
            feeling: 0,
            judging: 0,
            perceiving: 0,
            sensing: 0,
            intuition: 0
        };

        // Mapping questions to specific traits
        // Q1, Q5, Q9 -> Mind (Introversion vs Extroversion)
        // Q2, Q6 -> Energy (Sensing vs Intuition)
        // Q3, Q7, Q10 -> Nature (Thinking vs Feeling)
        // Q4, Q8 -> Tactics (Judging vs Perceiving)
        const questionMap = {
            1: 'mind', 5: 'mind', 9: 'mind',
            2: 'energy', 6: 'energy',
            3: 'nature', 7: 'nature', 10: 'nature',
            4: 'tactics', 8: 'tactics'
        };

        // Analyze specific questions (1-10)
        for (let i = 1; i <= 10; i++) {
            const choice = responses[i];
            if (choice === undefined) continue;

            const category = questionMap[i];

            // Options 0-1 lean towards first trait, 2-3 lean towards second trait
            const isFirstTrait = choice < 2;

            switch (category) {
                case 'mind':
                    if (isFirstTrait) traits.introversion += 1;
                    else traits.extroversion += 1;
                    break;
                case 'energy':
                    if (isFirstTrait) traits.sensing += 1;
                    else traits.intuition += 1;
                    break;
                case 'nature':
                    if (isFirstTrait) traits.thinking += 1;
                    else traits.feeling += 1;
                    break;
                case 'tactics':
                    if (isFirstTrait) traits.judging += 1;
                    else traits.perceiving += 1;
                    break;
                default:
                    break;
            }
        }

        // Normalize scores to avoid 0/0 issues
        if (traits.introversion + traits.extroversion === 0) { traits.introversion = 1; traits.extroversion = 1; }
        if (traits.sensing + traits.intuition === 0) { traits.sensing = 1; traits.intuition = 1; }
        if (traits.thinking + traits.feeling === 0) { traits.thinking = 1; traits.feeling = 1; }
        if (traits.judging + traits.perceiving === 0) { traits.judging = 1; traits.perceiving = 1; }

        // Determine personality type
        const type =
            (traits.introversion >= traits.extroversion ? 'I' : 'E') +
            (traits.sensing >= traits.intuition ? 'S' : 'N') +
            (traits.thinking >= traits.feeling ? 'T' : 'F') +
            (traits.judging >= traits.perceiving ? 'J' : 'P');

        // Personality type descriptions
        const descriptions = {
            'INTJ': { name: 'The Architect', desc: 'Strategic, analytical, and independent. You excel at planning and seeing the big picture.', icon: '🏰' },
            'INTP': { name: 'The Logician', desc: 'Innovative, curious, and logical. You love exploring ideas and solving complex problems.', icon: '🧪' },
            'ENTJ': { name: 'The Commander', desc: 'Bold, strategic, and strong-willed. You are a natural leader who inspires others.', icon: '⚔️' },
            'ENTP': { name: 'The Debater', desc: 'Quick-witted, clever, and resourceful. You enjoy intellectual challenges and debates.', icon: '🗣️' },
            'INFJ': { name: 'The Advocate', desc: 'Insightful, creative, and driven by deep values. You seek meaning and connection.', icon: '🕯️' },
            'INFP': { name: 'The Mediator', desc: 'Idealistic, empathetic, and creative. You are guided by your values and seek harmony.', icon: '🌻' },
            'ENFJ': { name: 'The Protagonist', desc: 'Charismatic, inspiring, and natural leaders. You bring out the best in others.', icon: '🎭' },
            'ENFP': { name: 'The Campaigner', desc: 'Enthusiastic, creative, and sociable. You see life as full of possibilities.', icon: '🎉' },
            'ISTJ': { name: 'The Logistician', desc: 'Practical, fact-minded, and reliable. You value order and tradition.', icon: '📋' },
            'ISFJ': { name: 'The Defender', desc: 'Warm, dedicated, and protective. You are always ready to defend loved ones.', icon: '🛡️' },
            'ESTJ': { name: 'The Executive', desc: 'Organized, practical, and results-oriented. You excel at managing people and projects.', icon: '📊' },
            'ESFJ': { name: 'The Consul', desc: 'Caring, social, and popular. You bring people together and create harmony.', icon: '🤝' },
            'ISTP': { name: 'The Virtuoso', desc: 'Bold, practical, and experimental. You are a master of tools and techniques.', icon: '🔧' },
            'ISFP': { name: 'The Adventurer', desc: 'Flexible, charming, and artistic. You live in the moment and appreciate beauty.', icon: '🎨' },
            'ESTP': { name: 'The Entrepreneur', desc: 'Energetic, perceptive, and action-oriented. You live on the edge and embrace risk.', icon: '🚀' },
            'ESFP': { name: 'The Entertainer', desc: 'Spontaneous, energetic, and enthusiastic. You love being the center of attention.', icon: '🎤' }
        };

        const typeInfo = descriptions[type] || descriptions['INFJ'];

        const strengths = generateStrengths(type);
        const growthAreas = generateGrowthAreas(type);

        return {
            type,
            name: typeInfo.name,
            description: typeInfo.desc,
            icon: typeInfo.icon,
            strengths,
            growthAreas,
            traits
        };
    };

    const generateStrengths = (type) => {
        const strengthsMap = {
            'I': ['Deep thinker', 'Self-aware', 'Focused'],
            'E': ['Energetic', 'Outgoing', 'Expressive'],
            'N': ['Imaginative', 'Future-oriented', 'Abstract thinker'],
            'S': ['Practical', 'Detail-oriented', 'Realistic'],
            'T': ['Logical', 'Objective', 'Analytical'],
            'F': ['Empathetic', 'Compassionate', 'Values-driven'],
            'J': ['Organized', 'Decisive', 'Structured'],
            'P': ['Flexible', 'Spontaneous', 'Adaptable']
        };

        return type.split('').flatMap(letter => strengthsMap[letter] || []).slice(0, 4);
    };

    const generateGrowthAreas = (type) => {
        const growthMap = {
            'I': 'Try stepping out of your comfort zone socially',
            'E': 'Practice quiet reflection and alone time',
            'N': 'Focus on present details and practical matters',
            'S': 'Explore abstract concepts and future possibilities',
            'T': 'Develop emotional awareness and empathy',
            'F': 'Practice objective decision-making',
            'J': 'Embrace spontaneity and flexibility',
            'P': 'Work on planning and follow-through'
        };

        return [growthMap[type[0]], growthMap[type[2]]];
    };

    if (loading) {
        return (
            <div className="profile-container">
                <div className="section-card" style={{ textAlign: 'center', padding: '60px' }}>
                    <h2 className="section-title" style={{ justifyContent: 'center' }}>🧠 Analyzing...</h2>
                    <p className="profile-bio">Unlocking the secrets of your mind...</p>
                </div>
            </div>
        );
    }

    if (!personalityData) {
        return (
            <div className="profile-container">
                <div className="section-card" style={{ textAlign: 'center', padding: '60px' }}>
                    <div className="stat-icon" style={{ fontSize: '4rem', marginBottom: '20px' }}>🧠</div>
                    <h2 className="section-title" style={{ justifyContent: 'center' }}>Discover Yourself</h2>
                    <p className="profile-bio" style={{ marginBottom: '30px' }}>
                        Take our visual personality test to reveal your unique traits, strengths, and potential.
                    </p>
                    <button
                        className="section-btn"
                        onClick={() => window.location.href = '/personality-intro'}
                        style={{ margin: '0 auto', fontSize: '1.1rem', padding: '16px 32px' }}
                    >
                        Start Personality Test
                    </button>
                </div>
            </div>
        );
    }

    // Calculate trait percentages for visualization
    const calculatePercent = (val1, val2) => {
        const total = val1 + val2;
        if (total === 0) return 0;
        return Math.round((val1 / total) * 100);
    };

    return (
        <div className="profile-container">
            {/* Header Section */}
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            <span className="avatar-emoji">{personalityData.icon}</span>
                        </div>
                        <div className="avatar-ring"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">{personalityData.name}</h1>
                        <p className="profile-bio">{personalityData.description}</p>
                        <div className="profile-meta">
                            <span className="meta-item">
                                <span className="meta-icon">🧩</span>
                                Type: <strong>{personalityData.type}</strong>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats / Key Traits */}
                <div className="quick-stats">
                    {personalityData.type.split('').map((letter, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-value">{letter}</div>
                            <div className="stat-label">
                                {index === 0 ? (letter === 'I' ? 'Introverted' : 'Extroverted') :
                                    index === 1 ? (letter === 'N' ? 'Intuitive' : 'Observant') :
                                        index === 2 ? (letter === 'T' ? 'Thinking' : 'Feeling') :
                                            (letter === 'J' ? 'Judging' : 'Prospecting')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trait Breakdown */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">📊</span>
                    Trait Breakdown
                </h2>
                <div className="mood-distribution">
                    {/* Mind: Introverted vs Extroverted */}
                    <div className="mood-bar-container">
                        <div className="mood-bar-header">
                            <span className="mood-bar-emoji">🧠</span>
                            <span className="mood-bar-label">Mind</span>
                            <span className="mood-bar-percentage">
                                {calculatePercent(personalityData.traits.introversion, personalityData.traits.extroversion)}% I / {calculatePercent(personalityData.traits.extroversion, personalityData.traits.introversion)}% E
                            </span>
                        </div>
                        <div className="mood-bar-track">
                            <div
                                className="mood-bar-fill"
                                style={{
                                    width: `${calculatePercent(personalityData.traits.introversion, personalityData.traits.extroversion)}%`,
                                    background: '#667eea'
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Energy: Intuitive vs Observant (Sensing) */}
                    <div className="mood-bar-container">
                        <div className="mood-bar-header">
                            <span className="mood-bar-emoji">⚡</span>
                            <span className="mood-bar-label">Energy</span>
                            <span className="mood-bar-percentage">
                                {calculatePercent(personalityData.traits.intuition, personalityData.traits.sensing)}% N / {calculatePercent(personalityData.traits.sensing, personalityData.traits.intuition)}% S
                            </span>
                        </div>
                        <div className="mood-bar-track">
                            <div
                                className="mood-bar-fill"
                                style={{
                                    width: `${calculatePercent(personalityData.traits.intuition, personalityData.traits.sensing)}%`,
                                    background: '#764ba2'
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Nature: Thinking vs Feeling */}
                    <div className="mood-bar-container">
                        <div className="mood-bar-header">
                            <span className="mood-bar-emoji">❤️</span>
                            <span className="mood-bar-label">Nature</span>
                            <span className="mood-bar-percentage">
                                {calculatePercent(personalityData.traits.thinking, personalityData.traits.feeling)}% T / {calculatePercent(personalityData.traits.feeling, personalityData.traits.thinking)}% F
                            </span>
                        </div>
                        <div className="mood-bar-track">
                            <div
                                className="mood-bar-fill"
                                style={{
                                    width: `${calculatePercent(personalityData.traits.thinking, personalityData.traits.feeling)}%`,
                                    background: '#4caf50'
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Tactics: Judging vs Perceiving */}
                    <div className="mood-bar-container">
                        <div className="mood-bar-header">
                            <span className="mood-bar-emoji">📅</span>
                            <span className="mood-bar-label">Tactics</span>
                            <span className="mood-bar-percentage">
                                {calculatePercent(personalityData.traits.judging, personalityData.traits.perceiving)}% J / {calculatePercent(personalityData.traits.perceiving, personalityData.traits.judging)}% P
                            </span>
                        </div>
                        <div className="mood-bar-track">
                            <div
                                className="mood-bar-fill"
                                style={{
                                    width: `${calculatePercent(personalityData.traits.judging, personalityData.traits.perceiving)}%`,
                                    background: '#ff9800'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Strengths & Growth */}
            <div className="achievements-grid">
                <div className="section-card" style={{ marginBottom: 0 }}>
                    <h2 className="section-title">
                        <span className="title-icon">✨</span>
                        Strengths
                    </h2>
                    <div className="tips-container" style={{ gridTemplateColumns: '1fr' }}>
                        {personalityData.strengths.map((strength, index) => (
                            <div key={index} className="tip-card">
                                <span className="tip-emoji">💪</span>
                                <p>{strength}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-card" style={{ marginBottom: 0 }}>
                    <h2 className="section-title">
                        <span className="title-icon">🌱</span>
                        Growth
                    </h2>
                    <div className="tips-container" style={{ gridTemplateColumns: '1fr' }}>
                        {personalityData.growthAreas.map((area, index) => (
                            <div key={index} className="tip-card">
                                <span className="tip-emoji">🚀</span>
                                <p>{area}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                    className="section-btn"
                    onClick={() => {
                        localStorage.removeItem('personality-test-responses');
                        window.location.href = '/personality-test-page-1';
                    }}
                    style={{ padding: '12px 24px', fontSize: '1rem' }}
                >
                    Reset Test Data
                </button>
            </div>
        </div>
    );
};

export default Personality;
