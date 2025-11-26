import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import './DashboardExtras.css';
import Profile from '../components/dashboard/Profile';
import Personality from '../components/dashboard/Personality';
import Horoscope from '../components/dashboard/Horoscope';
import Community from '../components/dashboard/Community';
import MoodTracker from '../components/dashboard/MoodTracker';
import Settings from '../components/dashboard/Settings';
import Analytics from '../components/dashboard/Analytics';
import MoodCalendar from '../components/dashboard/MoodCalendar';
import Goals from '../components/dashboard/Goals';
import Journal from '../components/dashboard/Journal';
import Achievements from '../components/dashboard/Achievements';
import Friends from '../components/dashboard/Friends';
import Share from '../components/dashboard/Share';
import Themes from '../components/dashboard/Themes';
import Privacy from '../components/dashboard/Privacy';
import Notifications from '../components/dashboard/Notifications';
import Help from '../components/dashboard/Help';
import Feedback from '../components/dashboard/Feedback';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState(null);
    const [showMoodTracker, setShowMoodTracker] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedMoodEntry, setSelectedMoodEntry] = useState(null);
    const [refreshMoodHistory, setRefreshMoodHistory] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');

    const handleMoodSaved = () => {
        setRefreshMoodHistory(prev => prev + 1);
        setShowNotification(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const renderContent = () => {
        // When no section is selected, show mood history
        if (!activeSection) {
            const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');

            if (moodHistory.length === 0) {
                // Show empty state with animation
                return (
                    <div className="empty-mood-state">
                        <div className="empty-mood-animation">
                            <div className="floating-emoji">😊</div>
                            <div className="floating-emoji">😌</div>
                            <div className="floating-emoji">🤩</div>
                            <div className="floating-emoji">😢</div>
                            <div className="floating-emoji">😰</div>
                        </div>
                        <h2 className="empty-mood-title">No Moods Saved Yet</h2>
                        <p className="empty-mood-message">
                            Start tracking your mood by clicking the + button below!
                        </p>
                    </div>
                );
            }

            // Show mood history
            return (
                <div className="mood-history-container">
                    <h2 className="mood-history-title">📊 Your Mood Journey</h2>
                    <div className="mood-history-grid">
                        {moodHistory.map((entry, index) => (
                            <div
                                key={index}
                                className="mood-card"
                                onClick={() => setSelectedMoodEntry(entry)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="mood-card-emoji">
                                    {entry.mood === 'happy' && '😊'}
                                    {entry.mood === 'calm' && '😌'}
                                    {entry.mood === 'neutral' && '😐'}
                                    {entry.mood === 'sad' && '😔'}
                                    {entry.mood === 'angry' && '😤'}
                                </div>
                                <div className="mood-card-info">
                                    <span className="mood-card-mood">{entry.mood}</span>
                                    <span className="mood-card-date">
                                        {new Date(entry.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                    {entry.note && (
                                        <p className="mood-card-note-preview">{entry.note.substring(0, 50)}{entry.note.length > 50 ? '...' : ''}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Show selected section content
        switch (activeSection) {
            case 'profile':
                return <Profile />;
            case 'personality':
                return <Personality />;
            case 'horoscope':
                return <Horoscope />;
            case 'community':
                return <Community />;
            case 'settings':
                return <Settings />;
            case 'analytics':
                return <Analytics />;
            case 'calendar':
                return <MoodCalendar />;
            case 'goals':
                return <Goals />;
            case 'journal':
                return <Journal />;
            case 'achievements':
                return <Achievements />;
            case 'friends':
                return <Friends />;
            case 'share':
                return <Share />;
            case 'themes':
                return <Themes />;
            case 'privacy':
                return <Privacy />;
            case 'notifications':
                return <Notifications />;
            case 'help':
                return <Help />;
            case 'feedback':
                return <Feedback />;
            default:
                return null;
        }
    };

    const handleMenuAction = (action) => {
        setShowMenu(false);
        switch (action) {
            case 'settings':
                setActiveSection('settings');
                break;
            case 'analytics':
                setActiveSection('analytics');
                break;
            case 'calendar':
                setActiveSection('calendar');
                break;
            case 'goals':
                setActiveSection('goals');
                break;
            case 'darkmode':
                const newDarkMode = !darkMode;
                setDarkMode(newDarkMode);
                localStorage.setItem('darkMode', newDarkMode);
                document.body.classList.toggle('dark-mode', newDarkMode);
                break;
            case 'journal':
                setActiveSection('journal');
                break;
            case 'friends':
                setActiveSection('friends');
                break;
            case 'themes':
                setActiveSection('themes');
                break;
            case 'privacy':
                setActiveSection('privacy');
                break;
            case 'share':
                setActiveSection('share');
                break;
            case 'help':
                setActiveSection('help');
                break;
            case 'notifications':
                setActiveSection('notifications');
                break;
            case 'achievements':
                setActiveSection('achievements');
                break;
            case 'feedback':
                setActiveSection('feedback');
                break;
            case 'logout':
                if (window.confirm('Are you sure you want to logout?')) {
                    localStorage.clear();
                    navigate('/login');
                }
                break;
            default:
                break;
        }
    };

    return (
        <div className="dashboard-container">
            {/* Hamburger Menu Button */}
            <button className="hamburger-btn" onClick={() => setShowMenu(!showMenu)}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {/* Side Menu */}
            {showMenu && (
                <>
                    <div className="menu-overlay" onClick={() => setShowMenu(false)}></div>
                    <div className="side-menu">
                        <div className="menu-header">
                            <h3>Menu</h3>
                            <button className="menu-close" onClick={() => setShowMenu(false)}>×</button>
                        </div>

                        <div className="menu-items">
                            {/* MAIN SECTION */}
                            <div className="menu-category">MAIN</div>

                            <button className="menu-item" onClick={() => handleMenuAction('analytics')}>
                                <span className="menu-icon">📊</span>
                                <span>Analytics & Insights</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('calendar')}>
                                <span className="menu-icon">📅</span>
                                <span>Calendar View</span>
                            </button>

                            <div className="menu-divider"></div>

                            {/* WELLNESS SECTION */}
                            <div className="menu-category">WELLNESS</div>

                            <button className="menu-item" onClick={() => handleMenuAction('goals')}>
                                <span className="menu-icon">🎯</span>
                                <span>Goals & Habits</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('journal')}>
                                <span className="menu-icon">📝</span>
                                <span>Journal</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('achievements')}>
                                <span className="menu-icon">🏆</span>
                                <span>Achievements</span>
                            </button>

                            <div className="menu-divider"></div>

                            {/* SOCIAL SECTION */}
                            <div className="menu-category">SOCIAL</div>

                            <button className="menu-item" onClick={() => handleMenuAction('friends')}>
                                <span className="menu-icon">👥</span>
                                <span>Friends</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('share')}>
                                <span className="menu-icon">📱</span>
                                <span>Share</span>
                            </button>

                            <div className="menu-divider"></div>

                            {/* SETTINGS SECTION */}
                            <div className="menu-category">SETTINGS</div>

                            <button className="menu-item" onClick={() => handleMenuAction('settings')}>
                                <span className="menu-icon">⚙️</span>
                                <span>App Settings</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('themes')}>
                                <span className="menu-icon">🎨</span>
                                <span>Themes</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('darkmode')}>
                                <span className="menu-icon">{darkMode ? '☀️' : '🌙'}</span>
                                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('privacy')}>
                                <span className="menu-icon">🔒</span>
                                <span>Privacy</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('notifications')}>
                                <span className="menu-icon">🔔</span>
                                <span>Notifications</span>
                            </button>

                            <div className="menu-divider"></div>

                            {/* SUPPORT SECTION */}
                            <div className="menu-category">SUPPORT</div>

                            <button className="menu-item" onClick={() => handleMenuAction('help')}>
                                <span className="menu-icon">❓</span>
                                <span>Help & Tutorial</span>
                            </button>

                            <button className="menu-item" onClick={() => handleMenuAction('feedback')}>
                                <span className="menu-icon">💬</span>
                                <span>Send Feedback</span>
                            </button>

                            <div className="menu-divider"></div>

                            <button className="menu-item menu-item-logout" onClick={() => handleMenuAction('logout')}>
                                <span className="menu-icon">🚪</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </>
            )}

            <div className="dashboard-layout">
                {/* Main Content Area */}
                <div className="dashboard-content" key={refreshMoodHistory}>
                    {renderContent()}
                </div>

                {/* Bottom Navigation Bar */}
                <nav className="dashboard-navbar">
                    <button
                        className={`nav-item ${activeSection === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveSection('profile')}
                    >
                        <span className="nav-icon">👤</span>
                        <span className="nav-label">Profile</span>
                    </button>

                    <button
                        className={`nav-item ${activeSection === 'personality' ? 'active' : ''}`}
                        onClick={() => setActiveSection('personality')}
                    >
                        <span className="nav-icon">🧠</span>
                        <span className="nav-label">Personality</span>
                    </button>

                    <button
                        className="nav-item nav-item-mood"
                        onClick={() => setShowMoodTracker(!showMoodTracker)}
                    >
                        <span className="nav-icon-plus">+</span>
                    </button>

                    <button
                        className={`nav-item ${activeSection === 'horoscope' ? 'active' : ''}`}
                        onClick={() => setActiveSection('horoscope')}
                    >
                        <span className="nav-icon">🔮</span>
                        <span className="nav-label">Horoscope</span>
                    </button>

                    <button
                        className={`nav-item ${activeSection === 'community' ? 'active' : ''}`}
                        onClick={() => setActiveSection('community')}
                    >
                        <span className="nav-icon">👥</span>
                        <span className="nav-label">Community</span>
                    </button>
                </nav>
            </div>

            {/* Mood Tracker Modal */}
            {showMoodTracker && (
                <div className="mood-modal-overlay" onClick={() => setShowMoodTracker(false)}>
                    <div className="mood-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="mood-close" onClick={() => setShowMoodTracker(false)}>×</button>
                        <MoodTracker
                            onClose={() => setShowMoodTracker(false)}
                            onSave={handleMoodSaved}
                        />
                    </div>
                </div>
            )}

            {/* Mood Detail Modal */}
            {selectedMoodEntry && (
                <div className="mood-modal-overlay" onClick={() => setSelectedMoodEntry(null)}>
                    <div className="mood-detail-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="mood-close" onClick={() => setSelectedMoodEntry(null)}>×</button>

                        <div className="mood-detail-header">
                            <div className="mood-detail-emoji">
                                {selectedMoodEntry.mood === 'happy' && '😊'}
                                {selectedMoodEntry.mood === 'calm' && '😌'}
                                {selectedMoodEntry.mood === 'neutral' && '😐'}
                                {selectedMoodEntry.mood === 'sad' && '😔'}
                                {selectedMoodEntry.mood === 'angry' && '😤'}
                            </div>
                            <h2 className="mood-detail-title">{selectedMoodEntry.mood}</h2>
                            <p className="mood-detail-date">
                                {new Date(selectedMoodEntry.date).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </p>
                        </div>

                        {selectedMoodEntry.note && (
                            <div className="mood-detail-note">
                                <h3>Your Thoughts</h3>
                                <p>{selectedMoodEntry.note}</p>
                            </div>
                        )}

                        {!selectedMoodEntry.note && (
                            <div className="mood-detail-no-note">
                                <p>No notes were added for this mood entry.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Success Notification - At Top */}
            {showNotification && (
                <div className="mood-success-notification">
                    <div className="notification-icon">✓</div>
                    <div className="notification-content">
                        <h3>Mood Saved!</h3>
                        <p>Your mood has been tracked successfully 🎉</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
