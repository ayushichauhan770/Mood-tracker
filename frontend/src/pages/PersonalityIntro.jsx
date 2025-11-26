import React from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalityIntro.css";

export default function PersonalityIntro() {
  const nav = useNavigate();

  return (
    <div className="pi-wrap">
      <div className="pi-card">
        <h1 className="pi-title">Let’s Get to Know You 🤍</h1>
        <p className="pi-desc">
          Before we personalize your Mood Tracker experience,
          we have a small fun personality test for you.
        </p>

        <button className="pi-btn" onClick={() => {
          localStorage.removeItem('personality-test-responses');
          nav("/personality-test-page-1");
        }}>
          Continue
        </button>
      </div>
    </div>
  );
}
