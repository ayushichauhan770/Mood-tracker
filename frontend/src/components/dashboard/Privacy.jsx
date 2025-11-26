import React, { useState } from 'react';
import './Privacy.css';

const Privacy = () => {
    const [settings, setSettings] = useState({
        profileVisibility: localStorage.getItem('profileVisibility') || 'Friends Only',
        shareMoods: localStorage.getItem('shareMoods') === 'true',
        shareAchievements: localStorage.getItem('shareAchievements') !== 'false',
        allowSearch: localStorage.getItem('allowSearch') !== 'false'
    });

    const handleToggle = (key) => {
        const newValue = !settings[key];
        setSettings({ ...settings, [key]: newValue });
        localStorage.setItem(key, newValue);
    };

    const handleSelect = (key, value) => {
        setSettings({ ...settings, [key]: value });
        localStorage.setItem(key, value);
    };

    const handleExportData = () => {
        const moodHistory = JSON.parse(localStorage.getItem('mood-history') || '[]');
        const personalityData = JSON.parse(localStorage.getItem('personality-test-responses') || '{}');
        const journalEntries = JSON.parse(localStorage.getItem('journal-entries') || '[]');

        const exportData = {
            moodHistory,
            personalityData,
            journalEntries,
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
            '⚠️ WARNING: This will permanently delete all your data including mood history, journal entries, and account information. This action cannot be undone.\n\nAre you absolutely sure you want to delete your account?'
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
        <div className="privacy-container">
            <div className="privacy-header">
                <h2>🔒 Privacy & Security</h2>
                <p>Manage your data and control who sees your activity.</p>
            </div>

            <div className="privacy-section">
                <h3>Profile Visibility</h3>
                <div className="privacy-card">
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Who can see your profile?</h4>
                            <p>Control the visibility of your basic profile info.</p>
                        </div>
                        <select
                            value={settings.profileVisibility}
                            onChange={(e) => handleSelect('profileVisibility', e.target.value)}
                            className="privacy-select"
                        >
                            <option>Public</option>
                            <option>Friends Only</option>
                            <option>Private</option>
                        </select>
                    </div>
                    <div className="setting-divider"></div>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Allow others to find me</h4>
                            <p>Let people search for you by name or email.</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.allowSearch}
                                onChange={() => handleToggle('allowSearch')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="privacy-section">
                <h3>Data Sharing</h3>
                <div className="privacy-card">
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Share Mood Updates</h4>
                            <p>Allow friends to see your daily mood log.</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.shareMoods}
                                onChange={() => handleToggle('shareMoods')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-divider"></div>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Share Achievements</h4>
                            <p>Show off your badges and levels to friends.</p>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={settings.shareAchievements}
                                onChange={() => handleToggle('shareAchievements')}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="privacy-section danger-zone">
                <h3>Data Management</h3>
                <div className="privacy-card danger-card">
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4>Export Your Data</h4>
                            <p>Download a copy of all your data in JSON format.</p>
                        </div>
                        <button className="action-btn export-btn" onClick={handleExportData}>
                            📥 Export Data
                        </button>
                    </div>
                    <div className="setting-divider"></div>
                    <div className="setting-row">
                        <div className="setting-info">
                            <h4 className="danger-text">Delete Account</h4>
                            <p>Permanently remove your account and all data.</p>
                        </div>
                        <button className="action-btn delete-btn" onClick={handleDeleteAccount}>
                            🗑️ Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
