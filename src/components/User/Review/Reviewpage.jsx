import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';

const ReviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {results,details} =  location.state || { data: [] }
  const answers = results.answers
  const [evaluate,setEvaluate]=useState([]);

  useEffect(()=>{
    DummyResult()
  },[])

  const DummyResult = () => {
    let temp = [];
    for (let i = 0; i < answers.length; i++) {
      const newObj = {
        id: i + 1,
        attended: answers[i] !== '' 
      };
      temp.push(newObj);  
    }
    setEvaluate(temp)
  };
  
  const handleShowResult = () => {
    navigate('/result',{state:{results,evaluate,details}}); 
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
          {evaluate.map((question) => (
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
