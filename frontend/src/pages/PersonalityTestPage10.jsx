import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalityTestPage.css';
import img1 from '../assets/personality/q10/1.jpg';
import img2 from '../assets/personality/q10/2.jpg';
import img3 from '../assets/personality/q10/3.jpg';
import img4 from '../assets/personality/q10/4.jpg';

import { savePersonalityResponse } from '../utils/personalityStorage';

const PersonalityTestPage10 = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = React.useState(null);

  const handleImageClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption) {
      savePersonalityResponse(10, selectedOption);
      navigate('/zodiac');
    }
  };

  const handlePrev = () => {
    navigate('/personality-test-page-9');
  };

  return (
    <div className="personality-test-container">
      <h1 className="question">Q10: Pick the type of person you would love to hangout with?</h1>
      <div className="images-container">
        <img
          src={img1}
          alt="Option 1"
          className={`option-image ${selectedOption === '1' ? 'selected' : ''}`}
          onClick={() => handleImageClick('1')}
        />
        <img
          src={img2}
          alt="Option 2"
          className={`option-image ${selectedOption === '2' ? 'selected' : ''}`}
          onClick={() => handleImageClick('2')}
        />
        <img
          src={img3}
          alt="Option 3"
          className={`option-image ${selectedOption === '3' ? 'selected' : ''}`}
          onClick={() => handleImageClick('3')}
        />
        <img
          src={img4}
          alt="Option 4"
          className={`option-image ${selectedOption === '4' ? 'selected' : ''}`}
          onClick={() => handleImageClick('4')}
        />
      </div>

      <div className="nav-buttons">
        <button className="nav-btn prev" onClick={handlePrev}>Previous</button>
        <button className="nav-btn next" onClick={handleNext} disabled={!selectedOption}>Next</button>
      </div>
    </div>
  );
};

export default PersonalityTestPage10;
