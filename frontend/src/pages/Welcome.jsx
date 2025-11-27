import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="wel-wrap">
      <div className="wel-content">
        <div className="wel-logo-container">
          <div className="wel-logo">🧠</div>
          <h1 className="wel-title">MindTracker</h1>
        </div>

        <p className="wel-subtitle">Your personal companion for mental wellness and mood tracking</p>

        <div className="wel-cta-box">
          <Link to="/signup" className="wel-btn wel-btn-primary">
            Get Started
          </Link>

          <Link to="/login" className="wel-btn wel-btn-secondary">
            Sign In
          </Link>
        </div>

        <div className="wel-features">
          <div className="wel-feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Mood</h3>
          </div>
          <div className="wel-feature-card">
            <div className="feature-icon">🌙</div>
            <h3>Astrology</h3>
          </div>
          <div className="wel-feature-card">
            <div className="feature-icon">💬</div>
            <h3>Community</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
