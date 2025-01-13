import { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
import Sidebar from './sidebar';
import { db } from '../../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import './s.css';

const Dashboard = () => {
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();
  const [studData, setStudData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [userTestsData, setUserTestsData] = useState({});
  const [userTestDetails, setUserTestDetails] = useState([]);

  // Redirect to login if not admin or authorized user
  useEffect(() => {
    const getData = async () => {
      const studentCollectionRef = collection(db, 'User');
      const data = await getDocs(studentCollectionRef);
      if (data.empty) {
        console.log('Collection is empty');
      } else {
        const fetchedData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedData);
        setStudData(fetchedData);
      }

      const adminCollectionRef = collection(db, 'Admin');
      const createdData = await getDocs(adminCollectionRef);
      const collectedData = createdData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestData(collectedData);
    };
    getData();

    // Setting current date
    const date = new Date();
    setCurrentDate(date.toString().split(' ').slice(0, 4).join(' '));
  }, [navigate]);

  // Store tests data for each student
  useEffect(() => {
    const storeData = async () => {
      if (studData.length > 0) {
        const values = studData.map((doc) => doc.id);
        const allUserTests = {};

        for (const docId of values) {
          try {
            const userSubcollectionRef = collection(
              db,
              'User',
              docId,
              'UserTests'
            );
            const subcollectionSnapshot = await getDocs(userSubcollectionRef);

            if (!subcollectionSnapshot.empty) {
              const subcollectionData = subcollectionSnapshot.docs.map((doc) =>
                doc.data()
              );
              allUserTests[docId] = subcollectionData;
            } else {
              console.log(
                `No data found in subcollection for User document ID: ${docId}`
              );
            }
          } catch (error) {
            console.error(
              `Error fetching subcollection for User document ID: ${docId}`,
              error
            );
          }
        }
        setUserTestsData(allUserTests);
      }
    };

    storeData();
  }, [studData]);

  // Fetching and calculating test details for each user
  useEffect(() => {
    const fetchUserTestsData = async () => {
      try {
        const userTestDetailsArr = await Promise.all(
          Object.entries(userTestsData).map(async ([userId, tests]) => {
            const userDocRef = doc(db, 'User', userId);
            const userDocSnap = await getDoc(userDocRef);
            const username = userDocSnap.exists()
              ? userDocSnap.data().username
              : 'Unknown';

            const totalTests = tests.length;
            const totalMarks = tests.reduce(
              (sum, test) => sum + (test.totalMarks || 0),
              0
            );
            const totalQuestions = tests.reduce(
              (sum, test) => sum + (test.totalQuestions || 0),
              0
            );
            const efficiency =
              totalTests > 0 ? (totalMarks / (totalTests * 100)) * 100 : 0;

            return {
              userId,
              username,
              totalTests,
              totalMarks,
              totalQuestions,
              efficiency,
            };
          })
        );

        setUserTestDetails(userTestDetailsArr);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserTestsData();
  }, [userTestsData]);

  return (
    <div className='container-fluid pt-3'>
      <div className='row'>
        {/* Sidebar */}
        <div className='col-12 col-md-2 d-md-block'>
          <Sidebar />
        </div>

        {/* Main Dashboard Content */}
        <div className='col-12 col-md-7 bg-white'>
          <div className='d-flex flex-column p-4 bg-light'>
            <div className='d-flex justify-content-between mb-3'>
              <div>
                <h1 className='h3'>Hello, Admin</h1>
                <p className='text-muted'>
                  Track test progress here. You almost reach a goal
                </p>
              </div>
              <div className='d-flex align-items-center'>
                <span className='mr-2'>{currentDate}</span>
              </div>
            </div>

            {/* Total Students */}
            <div className='d-flex mb-3'>
              <h5>Total no. of students :</h5>
              <h5 className='pl-2'>{studData.length}</h5>
            </div>

            {/* Performance Section (Hide on Mobile) */}
            <div className='mb-5 d-none d-md-block'>
              <h5>Performance</h5>
              <div className='chart-container' style={{ height: '500px' }}>
                <ChartComponent userTestDetails={userTestDetails} />
              </div>
            </div>

            {/* Test Results Section */}
            <div className='overflow-auto mb-3 bg-white p-3'>
              <h5>Results</h5>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>No of Tests</th>
                    <th>Total Marks</th>
                    <th>No of Questions</th>
                    <th>Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {userTestDetails.map(
                    ({
                      userId,
                      username,
                      totalTests,
                      totalMarks,
                      totalQuestions,
                      efficiency,
                    }) => (
                      <tr key={userId}>
                        <td>{username}</td>
                        <td>{totalTests}</td>
                        <td>{totalMarks}</td>
                        <td>{totalQuestions}</td>
                        <td>{efficiency.toFixed(2)}%</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar for Test Created */}
        <div className='col-12 col-md-3 bg-white p-4 shadow-sm  d-md-block'>
          <h5>Test Created</h5>
          {testData
            .sort((a, b) => {
              const dateA = new Date(
                a.Quizdata.date.split('-').reverse().join('/')
              );
              const dateB = new Date(
                b.Quizdata.date.split('-').reverse().join('/')
              );
              return dateA - dateB;
            })
            .map((test, index) => (
              <div
                className='card mb-3 d-flex flex-row justify-content-between p-2'
                key={index}
              >
                <div>
                  <div className='text-muted'>
                    {test.Quizdata.date.split('-').reverse().join('/')}
                  </div>
                  <div>{test.Quizdata.type}</div>
                </div>
                <div>
                  <div className='text-muted'>No. of questions</div>
                  <div>{test.Questions.length}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
