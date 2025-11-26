import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalityTestPage.css";

const PersonalityTestPage9 = () => {
  const navigate = useNavigate();

  const handleImageClick = (choice) => {
    console.log("Question 9 choice:", choice);
    navigate("/personality-test-page-10");
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Question 9: Pick the emoji that describes your current mood</h1>
      <div className="images-container">
        <img src={require("../../assets/personality/q9/1.jpg")} alt="1" onClick={() => handleImageClick(1)} />
        <img src={require("../../assets/personality/q9/2.jpg")} alt="2" onClick={() => handleImageClick(2)} />
        <img src={require("../../assets/personality/q9/3.jpg")} alt="3" onClick={() => handleImageClick(3)} />
        <img src={require("../../assets/personality/q9/4.jpg")} alt="4" onClick={() => handleImageClick(4)} />
      </div>
    </div>
  );
};

export default PersonalityTestPage9;
