import React, { useState, useEffect } from 'react';
import './profile.css'; // Reusing the beautiful profile styles

const Settings = () => {
    const [userData, setUserData] = useState({
        name: localStorage.getItem('userName') || 'MindTracker User',
        email: localStorage.getItem('userEmail') || 'user@mindtracker.com',
        notifications: localStorage.getItem('notifications') !== 'false',
        dailyReminder: localStorage.getItem('dailyReminder') || '20:00',
        language: localStorage.getItem('language') || 'English',
        profileVisibility: localStorage.getItem('profileVisibility') || 'Friends Only',
        shareMoods: localStorage.getItem('shareMoods') === 'true'
    });

    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [saveStatus, setSaveStatus] = useState('');

    // Save settings to localStorage
    const handleSave = (field, value) => {
        localStorage.setItem(field, value);
        setUserData(prev => ({ ...prev, [field]: value }));
        setSaveStatus('Saved!');
        setTimeout(() => setSaveStatus(''), 2000);
    };

    const handlePasswordChange = () => {
        if (passwordData.new !== passwordData.confirm) {
            alert('New passwords do not match!');
            return;
        }
        if (passwordData.new.length < 6) {
            alert('Password must be at least 6 characters!');
            return;
        }
        // In a real app, this would call an API
        alert('Password changed successfully!');
        setShowPasswordDialog(false);
        setPasswordData({ current: '', new: '', confirm: '' });
    };

    const handleExportData = () => {
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');
        const personalityData = JSON.parse(localStorage.getItem('personality-test-responses') || '{}');

        const exportData = {
            userData,
            moodHistory,
            personalityData,
            exportDate: new Date().toISOString()
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mindtracker-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        alert('Your data has been exported successfully!');
    };

    const handleDeleteAccount = () => {
        const confirm = window.confirm(
            '⚠️ WARNING: This will permanently delete all your data including mood history, personality test results, and account information. This action cannot be undone.\n\nAre you absolutely sure you want to delete your account?'
        );

        if (confirm) {
            const doubleConfirm = window.prompt('Type "DELETE" to confirm account deletion:');
            if (doubleConfirm === 'DELETE') {
                localStorage.clear();
                alert('Your account has been deleted. You will be redirected to the login page.');
                window.location.href = '/login';
            }
        }
    };

    return (
        <div className="profile-container">
            {/* Header */}
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            <span className="avatar-emoji">⚙️</span>
                        </div>
                        <div className="avatar-ring"></div>
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-name">Settings</h1>
                        <p className="profile-bio">Customize your MindTracker experience</p>
                    </div>
                </div>
            </div>

            {saveStatus && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    right: '20px',
                    background: '#4caf50',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease'
                }}>
                    ✓ {saveStatus}
                </div>
            )}

            {/* PROFILE SECTION */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">👤</span>
                    Profile Information
                </h2>
                <div className="settings-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            onBlur={(e) => handleSave('userName', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            onBlur={(e) => handleSave('userEmail', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <button
                            className="section-btn"
                            onClick={() => setShowPasswordDialog(true)}
                            style={{ marginTop: '8px' }}
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </div>

            {/* PREFERENCES SECTION */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">🎯</span>
                    Preferences
                </h2>
                <div className="settings-form">
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Enable Notifications</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={userData.notifications}
                                    onChange={(e) => {
                                        const value = e.target.checked;
                                        setUserData({ ...userData, notifications: value });
                                        handleSave('notifications', value);
                                    }}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Daily Reminder Time</label>
                        <input
                            type="time"
                            className="form-input"
                            value={userData.dailyReminder}
                            onChange={(e) => setUserData({ ...userData, dailyReminder: e.target.value })}
                            onBlur={(e) => handleSave('dailyReminder', e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Language</label>
                        <select
                            className="form-input"
                            value={userData.language}
                            onChange={(e) => {
                                setUserData({ ...userData, language: e.target.value });
                                handleSave('language', e.target.value);
                            }}
                        >
                            <option>English</option>
                            <option>Español</option>
                            <option>Français</option>
                            <option>Deutsch</option>
                            <option>हिन्दी</option>
                            <option>中文</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* PRIVACY SECTION */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">🔒</span>
                    Privacy & Security
                </h2>
                <div className="settings-form">
                    <div className="form-group">
                        <label>Profile Visibility</label>
                        <select
                            className="form-input"
                            value={userData.profileVisibility}
                            onChange={(e) => {
                                setUserData({ ...userData, profileVisibility: e.target.value });
                                handleSave('profileVisibility', e.target.value);
                            }}
                        >
                            <option>Public</option>
                            <option>Friends Only</option>
                            <option>Private</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Share Mood Data</span>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={userData.shareMoods}
                                    onChange={(e) => {
                                        const value = e.target.checked;
                                        setUserData({ ...userData, shareMoods: value });
                                        handleSave('shareMoods', value);
                                    }}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </label>
                        <small style={{ color: '#6B7280', fontSize: '0.85rem' }}>
                            Allow friends to see your mood updates
                        </small>
                    </div>
                </div>
            </div>

            {/* ACCOUNT MANAGEMENT SECTION */}
            <div className="section-card">
                <h2 className="section-title">
                    <span className="title-icon">💾</span>
                    Data & Account
                </h2>
                <div className="settings-form">
                    <div className="form-group">
                        <button
                            className="section-btn"
                            onClick={handleExportData}
                            style={{ width: '100%', background: '#3B82F6' }}
                        >
                            📥 Export My Data
                        </button>
                        <small style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '8px', display: 'block' }}>
                            Download all your mood and personality data as JSON
                        </small>
                    </div>
                    <div className="form-group" style={{ marginTop: '24px', paddingTop: '24px', borderTop: '2px solid #fee' }}>
                        <button
                            className="section-btn"
                            onClick={handleDeleteAccount}
                            style={{
                                width: '100%',
                                background: '#dc2626',
                                color: 'white'
                            }}
                        >
                            🗑️ Delete Account
                        </button>
                        <small style={{ color: '#dc2626', fontSize: '0.85rem', marginTop: '8px', display: 'block' }}>
                            ⚠️ This action is permanent and cannot be undone
                        </small>
                    </div>
                </div>
            </div>

            {/* Password Change Dialog */}
            {showPasswordDialog && (
                <div className="mood-modal-overlay" onClick={() => setShowPasswordDialog(false)}>
                    <div className="mood-detail-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
                        <button className="mood-close" onClick={() => setShowPasswordDialog(false)}>×</button>
                        <h2 className="section-title" style={{ justifyContent: 'center', marginBottom: '24px' }}>
                            🔐 Change Password
                        </h2>
                        <div className="settings-form">
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={passwordData.current}
                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                />
                            </div>
                            <button
                                className="section-btn"
                                onClick={handlePasswordChange}
                                style={{ width: '100%', marginTop: '16px' }}
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
