import React, { useState } from 'react';
import './createquiz.css'; // Add your custom styles here
import Sidebar from '../Dashboard/sidebar'; // Assuming Sidebar is a separate component
import { useNavigate } from 'react-router-dom'; // Import the navigation hook
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';

const CreateQuizForm = () => {
  const [quizData, setQuizData] = useState({
    date: '',
    type: '',
    startTime: '',
    duration: '',
    questions: '',
  });

  const navigate = useNavigate();

  const handleChange = async(e) => {
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
      duration: '',
      questions: '',
    });
  };

  const handleNext = async() => {
    const dbref = collection(db,"Admin")
    const numberOfQuestions = parseInt(quizData.questions, 10);
    if (numberOfQuestions > 0) {
      await addDoc(dbref,quizData).then((docRef)=>{
        localStorage.setItem("docId",docRef.id)
        console.log({ state: { numberOfQuestions ,quizData} })
        navigate('/quizform', { state: { numberOfQuestions , quizData} });
      })
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
              <i className="icon-calendar"></i>
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
              <i className="icon-clock"></i> 
            </div>
            <div className="form-group">
              <label>Duration</label>
              <input 
                type="range" 
                name="duration" 
                min="0"
                max="60"
                onChange={handleChange} 
              />
              <i className="icon-clock"></i> {/* Use icon here */}
              <div>
                <h5>{quizData.duration} minutes</h5>
              </div>
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
