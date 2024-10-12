import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css';

const ResultPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/review');
  };

  return (
    <div className="container">
      <h2>Result</h2>
      <table className="result-table">
        <tbody>
          <tr>
            <td>Total No. of Questions</td>
            <td>30</td>
          </tr>
          <tr>
            <td>No. of Questions Attended</td>
            <td>25</td>
          </tr>
          <tr>
            <td>No. of Questions Not Attended</td>
            <td>05</td>
          </tr>
          <tr>
            <td>Total Marks</td>
            <td>30</td>
          </tr>
          <tr>
            <td>Total Marks Obtained</td>
            <td>25</td>
          </tr>
        </tbody>
      </table>

      <center>
      <button className="back-btn" onClick={handleBack}>
        Back
      </button>
      </center>
    </div>
  );
};

export default ResultPage;
