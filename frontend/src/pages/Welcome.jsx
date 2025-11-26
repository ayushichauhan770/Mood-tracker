import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  return (
    <div className="wel-wrap">
      <div className="wel-card">
        <h1 className="wel-title">Welcome to MindTracker</h1>
        <p className="wel-sub">Your personal mood, mind & wellness companion</p>

        <div className="wel-btn-box">
          <Link to="/signup" className="wel-btn signup-btn">
            Create an Account
          </Link>

          <Link to="/login" className="wel-btn login-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
