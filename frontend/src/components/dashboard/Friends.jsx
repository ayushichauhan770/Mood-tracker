import React, { useState } from 'react';
import './Friends.css';

const Friends = () => {
    const [activeTab, setActiveTab] = useState('my-friends');

    // Mock Data
    const [friends, setFriends] = useState([
        { id: 1, name: 'Sarah Parker', avatar: '👩', status: 'online', mood: 'happy', lastActive: 'Now' },
        { id: 2, name: 'Mike Chen', avatar: '👨', status: 'offline', mood: 'calm', lastActive: '2h ago' },
        { id: 3, name: 'Emma Wilson', avatar: '👩‍🦰', status: 'online', mood: 'excited', lastActive: 'Now' },
        { id: 4, name: 'James Rod', avatar: '🧔', status: 'offline', mood: 'neutral', lastActive: '1d ago' },
    ]);

    const [requests, setRequests] = useState([
        { id: 5, name: 'Alex Turner', avatar: '👱', mutual: 3 },
        { id: 6, name: 'Lisa Wong', avatar: '👩‍🦳', mutual: 1 },
    ]);

    const [activities] = useState([
        { id: 1, user: 'Sarah Parker', action: 'completed a 7-day streak!', time: '2h ago', icon: '🔥' },
        { id: 2, user: 'Mike Chen', action: 'reached Level 5!', time: '4h ago', icon: '🏆' },
        { id: 3, user: 'Emma Wilson', action: 'is feeling excited today', time: '5h ago', icon: '🤩' },
    ]);

    const handleAccept = (id) => {
        const newFriend = requests.find(r => r.id === id);
        setFriends([...friends, { ...newFriend, status: 'online', mood: 'neutral', lastActive: 'Now' }]);
        setRequests(requests.filter(r => r.id !== id));
    };

    const handleDecline = (id) => {
        setRequests(requests.filter(r => r.id !== id));
    };

    return (
        <div className="friends-container">
            <div className="friends-header">
                <h2>👥 Friends & Community</h2>
                <div className="friends-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'my-friends' ? 'active' : ''}`}
                        onClick={() => setActiveTab('my-friends')}
                    >
                        My Friends ({friends.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
                        onClick={() => setActiveTab('requests')}
                    >
                        Requests ({requests.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'find-friends' ? 'active' : ''}`}
                        onClick={() => setActiveTab('find-friends')}
                    >
                        Find Friends
                    </button>
                </div>
            </div>

            <div className="friends-content">
                {activeTab === 'my-friends' && (
                    <div className="friends-grid">
                        <div className="friends-list-section">
                            {friends.map(friend => (
                                <div key={friend.id} className="friend-card">
                                    <div className="friend-avatar-container">
                                        <span className="friend-avatar">{friend.avatar}</span>
                                        <span className={`status-dot ${friend.status}`}></span>
                                    </div>
                                    <div className="friend-info">
                                        <h3>{friend.name}</h3>
                                        <p className="friend-mood">Feeling: {friend.mood === 'happy' ? '😊' : friend.mood === 'calm' ? '😌' : friend.mood === 'excited' ? '🤩' : '😐'} {friend.mood}</p>
                                    </div>
                                    <span className="last-active">{friend.lastActive}</span>
                                </div>
                            ))}
                        </div>

                        <div className="activity-feed">
                            <h3>Recent Activity</h3>
                            {activities.map(activity => (
                                <div key={activity.id} className="activity-item">
                                    <div className="activity-icon">{activity.icon}</div>
                                    <div className="activity-details">
                                        <p><strong>{activity.user}</strong> {activity.action}</p>
                                        <span className="activity-time">{activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="requests-list">
                        {requests.length === 0 ? (
                            <div className="empty-state">No pending requests</div>
                        ) : (
                            requests.map(request => (
                                <div key={request.id} className="request-card">
                                    <div className="request-info">
                                        <span className="request-avatar">{request.avatar}</span>
                                        <div>
                                            <h3>{request.name}</h3>
                                            <p>{request.mutual} mutual friends</p>
                                        </div>
                                    </div>
                                    <div className="request-actions">
                                        <button className="accept-btn" onClick={() => handleAccept(request.id)}>Accept</button>
                                        <button className="decline-btn" onClick={() => handleDecline(request.id)}>Decline</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'find-friends' && (
                    <div className="find-friends-section">
                        <div className="search-bar">
                            <input type="text" placeholder="Search for people..." />
                            <button>🔍</button>
                        </div>
                        <div className="suggested-friends">
                            <h3>Suggested for you</h3>
                            {/* Mock suggestions */}
                            <div className="friend-card">
                                <span className="friend-avatar">🎨</span>
                                <div className="friend-info">
                                    <h3>Artist Anna</h3>
                                    <p>Interests: Art, Meditation</p>
                                </div>
                                <button className="add-friend-btn">Add Friend</button>
                            </div>
                            <div className="friend-card">
                                <span className="friend-avatar">🏃</span>
                                <div className="friend-info">
                                    <h3>Runner Rob</h3>
                                    <p>Interests: Fitness, Health</p>
                                </div>
                                <button className="add-friend-btn">Add Friend</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;
