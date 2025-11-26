import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalityTestPage.css';
import img1 from '../../assets/personality/q6/1.jpg';
import img2 from '../../assets/personality/q6/2.jpg';
import img3 from '../../assets/personality/q6/3.jpg';
import img4 from '../../assets/personality/q6/4.jpg';

const PersonalityTestPage6 = () => {
  const navigate = useNavigate();

  const handleImageClick = (selectedOption) => {
    console.log('Selected option:', selectedOption);
    navigate('/personality-test-page-7');
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Q6: Choose the long door you'd like to travel down</h1>
      <div className="images-container">
        <img src={img1} alt="Option 1" className="option-image" onClick={() => handleImageClick('1')} />
        <img src={img2} alt="Option 2" className="option-image" onClick={() => handleImageClick('2')} />
        <img src={img3} alt="Option 3" className="option-image" onClick={() => handleImageClick('3')} />
        <img src={img4} alt="Option 4" className="option-image" onClick={() => handleImageClick('4')} />
      </div>
    </div>
  );
};

export default PersonalityTestPage6;
