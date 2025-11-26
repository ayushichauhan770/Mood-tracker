import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalityTestPage.css";

const PersonalityTestPage7 = () => {
  const navigate = useNavigate();

  const handleImageClick = (choice) => {
    console.log("Question 7 choice:", choice);
    navigate("/personality-test-page-8");
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Question 7: Pick the quote that resonates with you</h1>
      <div className="images-container">
        <img src={require("../../assets/personality/q7/1.jpg")} alt="1" onClick={() => handleImageClick(1)} />
        <img src={require("../../assets/personality/q7/2.jpg")} alt="2" onClick={() => handleImageClick(2)} />
        <img src={require("../../assets/personality/q7/3.jpg")} alt="3" onClick={() => handleImageClick(3)} />
        <img src={require("../../assets/personality/q7/4.jpg")} alt="4" onClick={() => handleImageClick(4)} />
      </div>
    </div>
  );
};

export default PersonalityTestPage7;
