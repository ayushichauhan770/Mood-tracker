import React, { useEffect } from "react";
import "../styles/Notification.css";

const Notification = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // close in 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="custom-notification">
            <span>{message}</span>
        </div>
    );
};

export default Notification;
