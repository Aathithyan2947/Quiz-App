import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const ReviewPage = () => {
  const navigate = useNavigate();

  const questions = [
    { id: 1, attended: true },
    { id: 2, attended: true },
    { id: 3, attended: false },
    { id: 4, attended: true },
    { id: 5, attended: true },
  ];

  const handleShowResult = () => {
    navigate('/result'); 
  };

  return (
    <div className="container">
      <h1>Review</h1>
      <table className="review-table">
        <thead>
          <tr>
            <th>Question No</th>
            <th>Attended / Not Attended</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.attended ? 'Attended' : 'Not Attended'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
        <button className="show-result-btn" onClick={handleShowResult}>
          Show Result
        </button>
      </center>
    </div>
  );
};

export default ReviewPage;
