import React, { useState } from 'react';
import './quiz.css';

const QuestionCard = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <div className="container">
      <div className='row'>
      <div className="grid-container">
        {Array.from({ length: 30 }, (_, index) => (
          <button key={index} className={`grid-item ${index === 0 ? 'active' : ''}`}>
            {index + 1}
          </button>
        ))}
      </div>

      <div className="question-section">
        <h2>Question 1</h2>
        <h3>
          A man starting from his home walks 5 km towards East, and then he turns left 
          and goes 4 km. At last, he turns to his left and walks 5 km. Now find the distance 
          between the man and his home and also find at which direction he is facing?
        </h3>
        <h3>Options:</h3>
        <div className="options">
          <label>
            <input
              type="radio"
              value="4km, west"
              checked={selectedAnswer === '4km, west'}
              onChange={handleAnswerSelect}
            />
            A) 4km, west
          </label>
          <label>
            <input
              type="radio"
              value="4km, east"
              checked={selectedAnswer === '4km, east'}
              onChange={handleAnswerSelect}
            />
            B) 4km, east
          </label>
          <label>
            <input
              type="radio"
              value="5km, west"
              checked={selectedAnswer === '5km, west'}
              onChange={handleAnswerSelect}
            />
            C) 5km, west
          </label>
          <label>
            <input
              type="radio"
              value="5km, north"
              checked={selectedAnswer === '5km, north'}
              onChange={handleAnswerSelect}
            />
            D) 5km, north
          </label>
        </div>
      </div>
      </div>

      <div className="navigation-buttons">
        <button className="back-btn">Back</button>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default QuestionCard;
