import React, { useEffect, useState } from 'react';
import './quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/firebase-config';

const QuestionCard = () => {
  const navigation = useNavigate()
  const location = useLocation();
  const { data , duration ,details} = location.state || { data: [] }; // Ensure data is always an array

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(data.length).fill('')); // Array to store answers
  const [timeRemaining, setTimeRemaining] = useState(parseInt(duration)*60); // Set duration in seconds (e.g., 600 seconds = 10 minutes)
  const [timerActive, setTimerActive] = useState(true); // To control timer activity

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            alert("Time's up! Quiz completed.");
            // Handle quiz completion (e.g., redirect to results page)
            handleSubmit()
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timerActive]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleAnswerSelect = (event) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = event.target.value; // Update the current question's answer
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGridButtonClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleClearAnswer = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = ''; // Clear the answer for the current question
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Stop the timer
    setTimerActive(false);

    // Logic to handle quiz submission
    const results = {
      answers: selectedAnswers,
      timeRemaining,
      user_id: auth.currentUser.uid
    };

    console.log("Quiz submitted with results:", results);
    alert("Quiz submitted!"); 
    navigation('/review',{state:{results,details}})
  };

  const currentQuestion = data[currentQuestionIndex];

  // Convert seconds to MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="timer">
        Time Remaining: {formatTime(timeRemaining)}
      </div>
      <div className='row'>
        <div className="grid-container">
          {Array.from({ length: data.length }, (_, index) => (
            <button
              key={index}
              className={`grid-item ${index === currentQuestionIndex ? 'active' : ''} ${selectedAnswers[index] ? 'answered' : ''}`}
              onClick={() => handleGridButtonClick(index)} // Set the question when clicked
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="question-section">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <h3>{currentQuestion.questionText}</h3>
          <h3>Options:</h3>
          <div className="options">
          {currentQuestion.options ? (
  Object.entries(currentQuestion.options)
    .sort(([key1], [key2]) => key1.localeCompare(key2)) // Sort by the key in ascending order
    .map(([key, value]) => (
      <label key={key}>
        <input
          type="radio"
          value={value}
          checked={selectedAnswers[currentQuestionIndex] === value} // Check if this option is selected
          onChange={handleAnswerSelect}
        />
        {key}) {value}
      </label>
    ))
) : (
  <p>No options available for this question.</p>
)}

          </div>
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="back-btn" onClick={handleBack} disabled={currentQuestionIndex === 0}>Back</button>
        {currentQuestionIndex === data.length - 1 ? <button className="next-btn" onClick={handleSubmit}>submit</button> :<button className="next-btn" onClick={handleNext}>next</button>}
        <button className="clear-btn" onClick={handleClearAnswer} disabled={!selectedAnswers[currentQuestionIndex]}>Clear Answer</button>
      </div>
    </div>
  );
};

export default QuestionCard;
