import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import './App.css'; 
import Sidebar from './sidebar';
import { auth } from '../firebase/firebase-config';
const Dashboard = () => {
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
            <div className="title">Hello, UJ TUTORIALS</div>
            <p className='gray'>Track test progress here. You almost reach a goal</p>
            </div>
            <div className="date">
              <div className="date-text">{currentDate}</div>
              <i className="icon-calendar"></i>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <i className="stat-icon fas fa-user-graduate"></i>
              <div className="stat-value">Total no. of students</div>
              <div className="stat-value">45</div>
            </div>
            <div className="stat">
              <i className="stat-icon fas fa-comments"></i>
              <div className="stat-value">Responses</div>
              <div className="stat-value">40</div>
            </div>
            <div className="stat">
              <i className="stat-icon fas fa-chart-bar"></i>
              <div className="stat-value">Average efficiency</div>
              <div className="stat-value">93%</div>
            </div>
          </div>
          <div className="chart">
            <div className="chart-title">Performance</div>
            <div className="chart-container">
              <ChartComponent />
            </div>
          </div>
          <div className="results">
            <div className="results-title">Results</div>
            <table className="results-table">
              <thead>
                <tr className="results-header">
                  <th className="results-cell">Name</th>
                  <th className="results-cell">Start</th>
                  <th className="results-cell">End</th>
                  <th className="results-cell">Score</th>
                  <th className="results-cell">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="results-row">
                  <td className="results-cell">Stephen</td>
                  <td className="results-cell">7.00pm</td>
                  <td className="results-cell">7.30pm</td>
                  <td className="results-cell">20/25</td>
                  <td className="results-cell">80%</td>
                </tr>
                <tr className="results-row">
                  <td className="results-cell">Ranjanath</td>
                  <td className="results-cell">7.00pm</td>
                  <td className="results-cell">7.30pm</td>
                  <td className="results-cell">20/25</td>
                  <td className="results-cell">80%</td>
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

export default Dashboard;
