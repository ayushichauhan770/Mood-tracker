import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/PersonalityTestPage.css";

const PersonalityTestPage10 = () => {
  const navigate = useNavigate();

  const handleImageClick = (choice) => {
    console.log("Question 10 choice:", choice);
    // After last question, navigate to result page or dashboard
    navigate("/dashboard"); 
    // Later, you can navigate to /personality-result if you create ResultPage
  };
  
  const savePersonality = async (answers) => {
  const userId = localStorage.getItem("userId");

  await fetch("https://mood-tracker-backend-p4lb.onrender.com/api/user/save-personality", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, personalityAnswers: answers })
  });
};

  return (
    <div className="personality-test-container">
      <h1 className="question">Question 10: Pick the type of person you would love to hangout with</h1> 
      <div className="images-container">
        <img src={require("../../assets/personality/q10/1.jpg")} alt="1" onClick={() => handleImageClick(1)} />
        <img src={require("../../assets/personality/q10/2.jpg")} alt="2" onClick={() => handleImageClick(2)} />
        <img src={require("../../assets/personality/q10/3.jpg")} alt="3" onClick={() => handleImageClick(3)} />
        <img src={require("../../assets/personality/q10/4.jpg")} alt="4" onClick={() => handleImageClick(4)} />
      </div>
    </div>
  );
};

export default PersonalityTestPage10;
