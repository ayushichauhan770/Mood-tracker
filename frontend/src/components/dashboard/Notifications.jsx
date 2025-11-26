import React, { useState } from 'react';
import './Notifications.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'achievement', title: 'New Badge Unlocked!', message: 'You earned the "Consistency Is Key" badge.', time: '2 hours ago', read: false, icon: '🏆' },
        { id: 2, type: 'social', title: 'Friend Request', message: 'Alex Turner sent you a friend request.', time: '5 hours ago', read: false, icon: '👥' },
        { id: 3, type: 'reminder', title: 'Daily Journal', message: 'Don\'t forget to log your mood today!', time: '1 day ago', read: true, icon: '📝' },
        { id: 4, type: 'system', title: 'Welcome to MindTracker', message: 'Thanks for joining our community.', time: '3 days ago', read: true, icon: '👋' }
    ]);

    const markAllAsRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
    };

    const markAsRead = (id) => {
        const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
        setNotifications(updated);
    };

    const deleteNotification = (id, e) => {
        e.stopPropagation();
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="notifications-container">
            <div className="notifications-header">
                <div className="header-title">
                    <h2>🔔 Notifications</h2>
                    {unreadCount > 0 && <span className="badge-count">{unreadCount}</span>}
                </div>
                {unreadCount > 0 && (
                    <button className="mark-read-btn" onClick={markAllAsRead}>
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="notifications-list">
                {notifications.length === 0 ? (
                    <div className="empty-notifications">
                        <span className="empty-icon">🔕</span>
                        <h3>No notifications</h3>
                        <p>You're all caught up!</p>
                    </div>
                ) : (
                    notifications.map(notification => (
                        <div
                            key={notification.id}
                            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className={`notification-icon ${notification.type}`}>
                                {notification.icon}
                            </div>
                            <div className="notification-content">
                                <div className="notification-top">
                                    <h4>{notification.title}</h4>
                                    <span className="notification-time">{notification.time}</span>
                                </div>
                                <p>{notification.message}</p>
                            </div>
                            {!notification.read && <div className="unread-dot"></div>}
                            <button
                                className="delete-notif-btn"
                                onClick={(e) => deleteNotification(notification.id, e)}
                                title="Delete"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
