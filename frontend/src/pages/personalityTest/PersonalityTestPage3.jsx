import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalityTestPage.css";

const PersonalityTestPage3 = () => {
  const navigate = useNavigate();

  const handleImageClick = (choice) => {
    console.log("Question 3 choice:", choice);
    navigate("/personality-test-page-4");
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Question 3: Choose your comfort food</h1>
      <div className="images-container">
        <img src={require("../../assets/personality/q3/1.jpg")} alt="1" onClick={() => handleImageClick(1)} />
        <img src={require("../../assets/personality/q3/2.jpg")} alt="2" onClick={() => handleImageClick(2)} />
        <img src={require("../../assets/personality/q3/3.jpg")} alt="3" onClick={() => handleImageClick(3)} />
        <img src={require("../../assets/personality/q3/4.jpg")} alt="4" onClick={() => handleImageClick(4)} />
      </div>
    </div>
  );
};

export default PersonalityTestPage3;
