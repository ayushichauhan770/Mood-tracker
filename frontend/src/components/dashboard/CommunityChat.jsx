import React, { useState, useEffect, useRef } from 'react';
import './Community.css';

const CommunityChat = ({ community, onBack }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: `Welcome to the ${community.name} community!`, sender: "System", isUser: false },
        { id: 2, text: "How is everyone feeling today?", sender: "Alex", isUser: false }
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMsg = {
            id: Date.now(),
            text: newMessage,
            sender: "You",
            isUser: true
        };

        setMessages(prev => [...prev, userMsg]);
        setNewMessage("");
        setLoading(true);

        try {
            const response = await fetch('https://mood-tracker-backend-p4lb.onrender.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    communityName: community.name,
                    message: userMsg.text,
                    history: messages.slice(-5) // Send last 5 messages for context
                })
            });

            const data = await response.json();

            const aiMsg = {
                id: Date.now() + 1,
                text: data.reply,
                sender: data.sender,
                isUser: false
            };

            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="community-chat-container glass-card">
            <div className="chat-header" style={{ background: community.gradient }}>
                <button className="back-button-chat" onClick={onBack}>←</button>
                <div className="chat-header-info">
                    <span className="chat-emoji">{community.emoji}</span>
                    <h3>{community.name}</h3>
                </div>
                <div className="online-count">
                    <span className="online-dot"></span>
                    {Math.floor(Math.random() * 50) + 10} online
                </div>
            </div>

            <div className="chat-messages">
                {messages.map(msg => (
                    <div key={msg.id} className={`message-wrapper ${msg.isUser ? 'user' : 'other'}`}>
                        {!msg.isUser && <div className="message-sender">{msg.sender}</div>}
                        <div className="message-bubble">
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && <div className="typing-indicator">Someone is typing...</div>}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button type="submit" className="send-button" disabled={loading}>
                    ➤
                </button>
            </form>
        </div>
    );
};

export default CommunityChat;
