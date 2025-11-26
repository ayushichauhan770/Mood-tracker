import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalityTestPage.css";

const PersonalityTestPage8 = () => {
  const navigate = useNavigate();

  const handleImageClick = (choice) => {
    console.log("Question 8 choice:", choice);
    navigate("/personality-test-page-9");
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Question 8: Choose one shape</h1>
      <div className="images-container">
        <img src={require("../../assets/personality/q8/1.jpg")} alt="1" onClick={() => handleImageClick(1)} />
        <img src={require("../../assets/personality/q8/2.jpg")} alt="2" onClick={() => handleImageClick(2)} />
        <img src={require("../../assets/personality/q8/3.jpg")} alt="3" onClick={() => handleImageClick(3)} />
        <img src={require("../../assets/personality/q8/4.jpg")} alt="4" onClick={() => handleImageClick(4)} />
      </div>
    </div>
  );
};

export default PersonalityTestPage8;
