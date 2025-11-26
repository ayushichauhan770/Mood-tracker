import React, { useState, useEffect } from 'react';
import './Themes.css';

const Themes = () => {
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem('theme') || 'light');

    const themes = [
        { id: 'light', name: 'Light Mode', icon: '☀️', colors: ['#ffffff', '#f5f5f5', '#2196f3'] },
        { id: 'dark', name: 'Dark Mode', icon: '🌙', colors: ['#121212', '#1e1e1e', '#bb86fc'] },
        { id: 'ocean', name: 'Ocean Breeze', icon: '🌊', colors: ['#e0f7fa', '#b2ebf2', '#00bcd4'] },
        { id: 'sunset', name: 'Sunset Glow', icon: '🌅', colors: ['#fff3e0', '#ffe0b2', '#ff9800'] },
        { id: 'forest', name: 'Forest Mist', icon: '🌲', colors: ['#e8f5e9', '#c8e6c9', '#4caf50'] },
        { id: 'lavender', name: 'Lavender Dream', icon: '💜', colors: ['#f3e5f5', '#e1bee7', '#9c27b0'] },
    ];

    useEffect(() => {
        applyTheme(currentTheme);
    }, [currentTheme]);

    const applyTheme = (themeId) => {
        document.body.setAttribute('data-theme', themeId);

        // Also handle the specific dark mode toggle for backward compatibility
        if (themeId === 'dark') {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    };

    const handleThemeSelect = (themeId) => {
        setCurrentTheme(themeId);
        localStorage.setItem('theme', themeId);
        applyTheme(themeId);
    };

    return (
        <div className="themes-container">
            <div className="themes-header">
                <h2>🎨 App Themes</h2>
                <p>Personalize your MindTracker experience with a look that matches your vibe.</p>
            </div>

            <div className="themes-grid">
                {themes.map(theme => (
                    <div
                        key={theme.id}
                        className={`theme-card ${currentTheme === theme.id ? 'active' : ''}`}
                        onClick={() => handleThemeSelect(theme.id)}
                    >
                        <div className="theme-preview" style={{ background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})` }}>
                            <div className="theme-icon">{theme.icon}</div>
                            <div className="color-swatches">
                                {theme.colors.map((color, index) => (
                                    <div key={index} className="swatch" style={{ backgroundColor: color }}></div>
                                ))}
                            </div>
                            {currentTheme === theme.id && <div className="active-badge">✓</div>}
                        </div>
                        <div className="theme-info">
                            <h3>{theme.name}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="theme-preview-section">
                <h3>Preview</h3>
                <div className="mock-dashboard-card">
                    <div className="mock-header">
                        <span className="mock-avatar">👤</span>
                        <div className="mock-title-bar"></div>
                    </div>
                    <div className="mock-content">
                        <div className="mock-stat-box"></div>
                        <div className="mock-stat-box"></div>
                        <div className="mock-list-item"></div>
                        <div className="mock-list-item"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Themes;
