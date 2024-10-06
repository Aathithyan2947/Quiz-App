import React, { useState } from 'react';
import './createquiz.css'; // Add your custom styles here
import Sidebar from '../Dashboard/sidebar'; // Assuming Sidebar is a separate component
import { useNavigate } from 'react-router-dom'; // Import the navigation hook

const CreateQuizForm = () => {
  const [quizData, setQuizData] = useState({
    date: '',
    type: '',
    startTime: '',
    endTime: '',
    questions: '',
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData({
      ...quizData,
      [name]: value,
    });
  };

  const handleClear = () => {
    setQuizData({
      date: '',
      type: '',
      startTime: '',
      endTime: '',
      questions: '',
    });
  };

  const handleNext = () => {
    const numberOfQuestions = parseInt(quizData.questions, 10);
    if (numberOfQuestions > 0) {
      navigate('/quizform', { state: { numberOfQuestions } }); // Pass the number of questions as state
    } else {
      alert('Please enter a valid number of questions.');
    }
  };

  return (
    <div className="create-quiz-container">
      <Sidebar />
      <div className="create-quiz-form-container">
        <h1>Create Quiz</h1>
        <div className="form-box">
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                name="date" 
                value={quizData.date} 
                onChange={handleChange}
                placeholder="Enter a date"
              />
              <i className="icon-calendar"></i> {/* Use icon here */}
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                name="type" 
                value={quizData.type} 
                onChange={handleChange}
              >
                <option value="">Select Type</option>
                <option value="MCQ">MCQ</option>
                <option value="Descriptive">Descriptive</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Time</label>
              <input 
                type="time" 
                name="startTime" 
                value={quizData.startTime} 
                onChange={handleChange} 
              />
              <i className="icon-clock"></i> {/* Use icon here */}
            </div>
            <div className="form-group">
              <label>End Time</label>
              <input 
                type="time" 
                name="endTime" 
                value={quizData.endTime} 
                onChange={handleChange} 
              />
              <i className="icon-clock"></i> {/* Use icon here */}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>No. of Questions</label>
              <input 
                type="number" 
                name="questions" 
                value={quizData.questions} 
                onChange={handleChange} 
                placeholder="No. of Questions" 
              />
            </div>
          </div>
          <div className="form-actions">
            <button className="clear-btn" onClick={handleClear}>Clear Form</button>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizForm;
