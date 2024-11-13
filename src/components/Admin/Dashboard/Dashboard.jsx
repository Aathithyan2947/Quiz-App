import React, { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import './App.css'; 
import Sidebar from './sidebar';
import { auth, db } from '../../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore'; // Updated import

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState("");
  const navigate = useNavigate();
  const [studData, setStudData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [userTestsData, setUserTestsData] = useState({}); 
  const [userTestDetails, setUserTestDetails] = useState([]);
  useEffect(() => {
    if (auth.currentUser?.email !== "aathireguraj@gmail.com" && auth.currentUser?.email !== "admin@gmail.com") {
      navigate('/login');
    } else {
      const getData = async () => {
        const studentCollectionRef = collection(db, "User");
        const data = await getDocs(studentCollectionRef);
        const fetchedData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStudData(fetchedData);
        console.log(fetchedData);

        const adminCollectionRef = collection(db, "Admin");
        const createdData = await getDocs(adminCollectionRef);
        const collectedData = createdData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestData(collectedData);
      };
      getData();
    }

    const date = new Date();
    setCurrentDate(date.toString().split(" ").slice(0, 4).join(" "));
  }, [navigate]);

  useEffect(() => {
    const storeData = async () => {
      if (studData.length > 0) {
        const values = studData.map(doc => doc.id); 
        const allUserTests = {}; 

        for (const docId of values) {
          try {
            const userSubcollectionRef = collection(db, "User", docId, "UserTests");
            const subcollectionSnapshot = await getDocs(userSubcollectionRef);

            if (!subcollectionSnapshot.empty) {
              const subcollectionData = subcollectionSnapshot.docs.map(doc => doc.data());
              allUserTests[docId] = subcollectionData;
              console.log(`Subcollection data for ${docId}:`, subcollectionData);
            } else {
              console.log(`No data found in subcollection for User document ID: ${docId}`);
            }
          } catch (error) {
            console.error(`Error fetching subcollection for User document ID: ${docId}`, error);
          }
        }
        setUserTestsData(allUserTests);
        console.log("All User Tests Data:", allUserTests);
      }
    };

    storeData();
  }, [studData]);

  useEffect(() => {
    const fetchUserTestsData = async () => {
      try {
        const userTestDetailsArr = await Promise.all(
          Object.entries(userTestsData).map(async ([userId, tests]) => {
            const userDocRef = doc(db, 'User', userId);
            const userDocSnap = await getDoc(userDocRef);
            const username = userDocSnap.exists() ? userDocSnap.data().username : 'Unknown'; 

            const totalTests = tests.length;
            const totalMarks = tests.reduce((sum, test) => sum + (test.totalMarks || 0), 0);
            const totalQuestions = tests.reduce((sum, test) => sum + (test.totalQuestions || 0), 0);
            const efficiency = totalTests > 0 ? (totalMarks / (totalTests * 100)) * 100 : 0;

            console.log(`User ID: ${userId}, Username: ${username}, Tests:`, tests);

            return {
              userId,
              username,
              totalTests,
              totalMarks,
              totalQuestions,
              efficiency
            };
          })
        );

        setUserTestDetails(userTestDetailsArr);
        console.log("User Test Details:", userTestDetailsArr);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserTestsData();
  }, [userTestsData]);

  return (
    <div className="container">
      <div className="main-content-wrapper">
        <Sidebar />
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
              <div className="stat-value">{studData.length}</div>
            </div>
            {/* <div className="stat">
              <i className="stat-icon fas fa-chart-bar"></i>
              <div className="stat-value">Average efficiency</div>
              <div className="stat-value">93%</div>
            </div> */}
          </div>
          <div className="chart">
            <div className="chart-title">Performance</div>
            <div className="chart-container">
              <ChartComponent userTestDetails={userTestDetails}/>
            </div>
          </div>
          <div className="results">
            <div className="results-title">Results</div>
            <table className="results-table">
              <thead>
                <tr className="results-header">
                  <th className="results-cell">Name</th>
                  <th className="results-cell">No of Tests</th>
                  <th className="results-cell">Total Marks</th>
                  <th className="results-cell">No of Questions</th>
                  <th className="results-cell">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {userTestDetails.map(({ userId, username, totalTests, totalMarks, totalQuestions, efficiency }) => (
                  <tr className="results-row" key={userId}>
                    <td className="results-cell">{username}</td>
                    <td className="results-cell">{totalTests}</td>
                    <td className="results-cell">{totalMarks}</td>
                    <td className="results-cell">{totalQuestions}</td>
                    <td className="results-cell">{efficiency.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="test-conducted">
          <div className="test-conducted-title">Test Created</div>
          {
            testData
              .sort((a, b) => {
                const dateA = new Date(a.Quizdata.date.split('-').reverse().join('/'));
                const dateB = new Date(b.Quizdata.date.split('-').reverse().join('/'));
                return dateA - dateB;
              })
              .map((test, index) => (
                <div className="test-list" key={index}>
                  <div className="test-item">
                    <div className="test-item-info">
                      <div className="test-item-title">{test.Quizdata.date.split('-').reverse().join('/')}</div>
                      <div className="test-item-value">{test.Quizdata.type}</div>
                    </div>
                    <div className="test-item-info">
                      <div className="test-item-title">No. of questions</div>
                      <div className="test-item-value">{test.Questions.length}</div>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
