import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalityTestPage.css";

const PersonalityTestPage2 = () => {
  const navigate = useNavigate();

  const handleImageClick = (choice) => {
    console.log("Question 2 choice:", choice);
    navigate("/personality-test-page-3");
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Question 2: which animal would youu like to connect the most?</h1>
      <div className="images-container">
        <img src={require("../../assets/personality/q2/1.jpg")} alt="1" onClick={() => handleImageClick(1)} />
        <img src={require("../../assets/personality/q2/2.jpg")} alt="2" onClick={() => handleImageClick(2)} />
        <img src={require("../../assets/personality/q2/3.jpg")} alt="3" onClick={() => handleImageClick(3)} />
        <img src={require("../../assets/personality/q2/4.jpg")} alt="4" onClick={() => handleImageClick(4)} />
      </div>
    </div>
  );
};

export default PersonalityTestPage2;
