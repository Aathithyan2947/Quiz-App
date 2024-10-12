import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import './App.css'; 
import Sidebar from './sidebar';
import { auth } from '../../Authentication/firebase/firebase-config';
const UserDashboard = () => {
  const [currentDate,setCurrentDate]=useState("")
  useEffect(()=>{

    const date = new Date()
    setCurrentDate(date.toString().split(" ").slice(0,4).join(" "))
  },[currentDate])

  return (
    <div className="container">
      <div className="main-content-wrapper">
      <Sidebar/>
        <div className="main">
          <div className="header">
            <div>
            <div className="title">Hello Aathi</div>
            <p className='gray'>Track test progress here. You almost reach a goal</p>
            </div>
            <div className="date">
              <div className="date-text">{currentDate}</div>
              <i className="icon-calendar"></i>
            </div>
          </div>
          <div className="chart">
            <div className="chart-title">Performance</div>
            <div className="chart-container">
              <ChartComponent />
            </div>
          </div>
          <div className="results">
            <div className="results-title">Upcoming Assessments</div>
            <table className="results-table">
              <thead>
                <tr className="results-header">
                  <th className="results-cell">Assessments</th>
                  <th className="results-cell">Start At</th>
                  <th className="results-cell">Attend Test</th>
                </tr>
              </thead>
              <tbody>
                <tr className="results-row">
                  <td className="results-cell">Quantitative Aptitude</td>
                  <td className="results-cell">5.00pm</td>
                  <td><button>click for test</button></td>
                </tr>
                <tr className="results-row">
                  <td className="results-cell">Reasoning</td>
                  <td className="results-cell">5.00pm</td>
                  <td><button>click for test</button></td>
                </tr>
                <tr className="results-row">
                  <td className="results-cell">Verbal Ability</td>
                  <td className="results-cell">8.00pm</td>
                  <td><button>click for test</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="test-conducted">
          <div className="test-conducted-title">Test Conducted</div>
          <div className="search-bar">
            <input type="text" className="search-input" placeholder="Search with date" />
            <i className="calendar-icon ion-calendar-outline"></i>
          </div>
          <div className="button">
          <button className="search-button">Search</button>
            <button className="clear-button">Clear</button>
          </div>
          <div className="test-list">
            <div className="test-item">
              <div className="test-item-info">
              <div className="test-item-title">01.09.2024</div>
              <div className="test-item-value">Reasoning</div>
              </div>
              <div className="test-item-info">
              <div className="test-item-title">No. of students</div>
                <div className="test-item-value"> 45</div>
              </div>
            </div>
            <div className="test-item">
              <div className="test-item-info">
              <div className="test-item-title">01.09.2024</div>
              <div className="test-item-value">Reasoning</div>
              </div>
              <div className="test-item-info">
              <div className="test-item-title">No. of students</div>
                <div className="test-item-value"> 45</div>
              </div>
            </div>
            <div className="test-item">
              <div className="test-item-info">
              <div className="test-item-title">01.09.2024</div>
              <div className="test-item-value">Reasoning</div>
              </div>
              <div className="test-item-info">
              <div className="test-item-title">No. of students</div>
                <div className="test-item-value"> 45</div>
              </div>
            </div>
            <div className="test-item">
              <div className="test-item-info">
              <div className="test-item-title">01.09.2024</div>
              <div className="test-item-value">Reasoning</div>
              </div>
              <div className="test-item-info">
              <div className="test-item-title">No. of students</div>
                <div className="test-item-value"> 45</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
