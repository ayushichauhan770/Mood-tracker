import React from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalityIntro.css";

export default function PersonalityIntro() {
  const nav = useNavigate();

  return (
    <div className="pi-wrap">
      <div className="pi-content">
        <div className="pi-icon">🧩</div>
        <h1 className="pi-title">Discover Your Personality</h1>
        <p className="pi-subtitle">
          A quick 10-question visual test to personalize your experience.
          Choose your first instinct for the most accurate results.
        </p>

        <button className="pi-btn-primary" onClick={() => {
          localStorage.removeItem('personality-test-responses');
          nav("/personality-test-page-1");
        }}>
          Start  Test
        </button>

        <button className="pi-btn-skip" onClick={() => nav("/zodiacsign")}>
          Skip for now
        </button>
      </div>
    </div>
  );
}
