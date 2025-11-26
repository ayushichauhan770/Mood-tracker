import React, { useState } from "react";
import "../../styles/ZodiacSignPage.css";

const ZodiacSignPage = ({ onNext }) => {
  const [zodiac, setZodiac] = useState("");

  const zodiacOptions = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const handleSubmit = () => {
    if (!zodiac) {
      alert("Please choose your zodiac sign!");
      return;
    }

    // Save to backend or global state later if needed
    console.log("Selected Zodiac:", zodiac);

    if (onNext) onNext(); // go to next page
  };

  const saveZodiac = async (sign) => {
  const userId = localStorage.getItem("userId"); // stored after signup

  const res = await fetch("http://localhost:5000/api/user/save-zodiac", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, zodiacSign: sign })
  });

  const data = await res.json();
};

  return (
    <div className="zodiac-container">
      <h1 className="zodiac-title">✨ Choose Your Zodiac Sign ✨</h1>

      <div className="zodiac-select-box">
        <select
          className="zodiac-dropdown"
          value={zodiac}
          onChange={(e) => setZodiac(e.target.value)}
        >
          <option value="">Select your sign</option>
          {zodiacOptions.map((sign, index) => (
            <option key={index} value={sign}>
              {sign}
            </option>
          ))}
        </select>
      </div>

      <button className="zodiac-next-button" onClick={handleSubmit}>
        Next ➜
      </button>
    </div>
  );
};

export default ZodiacSignPage;
