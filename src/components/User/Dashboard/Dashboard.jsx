import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import './App.css'; 
import Sidebar from './sidebar';
import { auth, db } from '../../../firebase/firebase-config';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigation = useNavigate()
  const [currentDate,setCurrentDate]=useState("")
  const [testData,setTestData] = useState([])
  const [attendedTests,setattendData]=useState([])
  const testCollectionref = collection(db,"Admin")
  const [username,setUsername] = useState('')
  
  
  useEffect(() => {
    const getData = async () => {
      // Retrieve the username from localStorage
      const name = localStorage.getItem("username");
      
      if (name) {
        setUsername(name); // Set the username in state
      } else {
        console.log("No username found in localStorage");
      }
      
      try {
        // Fetch test data and sort it by date
        const data = await getDocs(testCollectionref);
        const fetchedData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sortedData = fetchedData.sort((a, b) => {
          const dateA = new Date(a.Quizdata?.date);
          const dateB = new Date(b.Quizdata?.date);
          return dateB - dateA; // Descending order (latest first)
        });
        setTestData(sortedData);
        
        // Only proceed with Firestore write operation if username is available
        if (name) {
          const userDocref = doc(db, "User", auth.currentUser.uid);
          await setDoc(userDocref, { username: name }, { merge: true });
        } else {
          console.log("Username is not available, skipping Firestore update");
        }
  
        // Fetch user tests
        const userDocref = doc(db, "User", auth.currentUser.uid);
        const userCollectionref = collection(userDocref, "UserTests");
        const userTestAttended = await getDocs(userCollectionref);
        const fetchedTestData = userTestAttended.docs.map(doc => doc.data());
        setattendData(fetchedTestData);
        
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
  
    getData();
  }, []);
  
  
  const handleTestClick = (data,details,id) => {
    let duration = details.duration
    localStorage.setItem("Question_Id",id)
    setTimeout(()=>{
      navigation('/quiz',{state:{data,duration,details}})
    },1000)
  };


  return (
    <div className="container">
      <div className="main-content-wrapper">
      <Sidebar/>
        <div className="main">
          <div className="header">
            <div>
            <div className="title">Hi {username}</div>
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
              <ChartComponent attendedTests ={attendedTests} />
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
              {
  testData.length === 0 ? (
    <tr><td colSpan="3">No Tests Available</td></tr>
  ) : (
    testData.map((test, index) => {
      const isTestAttended = attendedTests.some(attended => attended.docId === test.id); // Use the unique identifier for the test
      return (
        <tr className="results-row" key={index}>
          <td className="results-cell">{test.Quizdata?.type || 'N/A'}</td>
          <td className="results-cell">{test.Quizdata?.startTime || 'N/A'}</td>
          <td>
            <button 
              className="search-button" 
              onClick={() => handleTestClick(test.Questions, test.Quizdata, test.id)}
              disabled={isTestAttended}
            >
              {isTestAttended ? "Already Attended" : "Click for test"}
            </button>
          </td>
        </tr>
      );
    })
  )
}
              </tbody>
            </table>
          </div>
        </div>
        <div className="test-conducted">
          <div className="test-conducted-title">Test Attended</div>
          {
            attendedTests.length === 0 ? (
              <h1>No Test has been attended yet!</h1>
            ) : (
              attendedTests.map((test, index) => (
                <div className="test-list" key={index}>
                  <div className="test-item">
                    <div className="test-item-info">
                      <div className="test-item-title">{test?.attendedDate || "N/A"}</div> 
                      <div className="test-item-value">{test?.testType || "N/A"}</div> 
                    </div>
                    <div className="test-item-info">
                      <div className="test-item-title">Marks scored</div>
                      <div className="test-item-value">{`${test?.totalMarks} / ${test?.totalQuestions}` || "N/A"}</div>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
