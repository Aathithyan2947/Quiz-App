/* eslint-disable no-constant-binary-expression */
import { useEffect, useState } from 'react';
import ChartComponent from './ChartComponent';
// import './App.css';
import Sidebar from './sidebar';
import { auth, db } from '../../../firebase/firebase-config';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigation = useNavigate();
  const [testData, setTestData] = useState([]);
  const [attendedTests, setattendData] = useState([]);
  const testCollectionref = collection(db, 'Admin');
  const [username, setUsername] = useState('');
  const [ongoingTests, setOngoingTests] = useState([]); // To track ongoing tests

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const name = localStorage.getItem('username');
    if (name) {
      setUsername(name);
    }
    try {
      const data = await getDocs(testCollectionref);
      const fetchedData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedData = fetchedData.sort((a, b) => {
        const dateA = new Date(a.Quizdata?.date);
        const dateB = new Date(b.Quizdata?.date);
        return dateB - dateA;
      });
      setTestData(sortedData);

      if (name) {
        const userDocref = doc(db, 'User', auth.currentUser.uid);
        await setDoc(userDocref, { username: name }, { merge: true });
      } else {
        console.log('Username is not available, skipping Firestore update');
      }

      const userDocref = doc(db, 'User', auth.currentUser.uid);
      const userCollectionref = collection(userDocref, 'UserTests');
      const userTestAttended = await getDocs(userCollectionref);
      const fetchedTestData = userTestAttended.docs.map((doc) => doc.data());
      setattendData(fetchedTestData);

      // Fetch ongoing tests
      const ongoingTestData = userTestAttended.docs
        .filter((doc) => doc.data().isOngoing)
        .map((doc) => doc.data().docId);
      setOngoingTests(ongoingTestData);
    } catch (err) {
      console.log('Error fetching data:', err);
    }
  };

  const handleTestClick = async (data, details, id) => {
    let duration = details.duration;
    localStorage.setItem('Question_Id', id);

    // Update Firestore with ongoing test status
    try {
      const userDocref = doc(db, 'User', auth.currentUser.uid);
      const testDocref = doc(userDocref, 'UserTests', id);
      await setDoc(
        testDocref,
        {
          docId: id,
          isOngoing: true,
          attendedDate: new Date().toISOString(),
          testType: details.type || 'N/A',
        },
        { merge: true }
      );

      setOngoingTests((prev) => [...prev, id]);
    } catch (err) {
      console.log('Error updating ongoing test status:', err);
    }

    setTimeout(() => {
      navigation('/quiz', { state: { data, duration, details } });
    }, 1000);
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-12 col-md-2'>
          <Sidebar />
        </div>
        <div className='col-12 col-md-7'>
          <div className='d-flex justify-content-between align-items-center mb-4'>
            <div className='ml-5 mt-2'>
              <h2>Welcome {username ? username : 'to your dashboard'}</h2>
              <p className='text-muted'>
                Track test progress here. You almost reach a goal.
              </p>
            </div>
          </div>

          <div className='mb-4 d-none d-md-block'>
            <h4>Performance</h4>
            <div className='bg-light p-3'>
              <ChartComponent attendedTests={attendedTests} />
            </div>
          </div>

          <div className='mb-4'>
            <h4>Upcoming Tests</h4>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Tests</th>
                  <th>Start At</th>
                  <th>Attend Test</th>
                </tr>
              </thead>
              <tbody>
                {testData.length === 0 ? (
                  <tr>
                    <td colSpan='3'>No Tests Available</td>
                  </tr>
                ) : (
                  testData.map((test, index) => {
                    const isTestAttended = attendedTests.some(
                      (attended) => attended.docId === test.id
                    );
                    const isOngoing = ongoingTests.includes(test.id);

                    return (
                      <tr key={index}>
                        <td>{test.Quizdata?.type || 'N/A'}</td>
                        <td>{test.Quizdata?.startTime || 'N/A'}</td>
                        <td>
                          <button
                            className='btn btn-primary'
                            onClick={() =>
                              handleTestClick(
                                test.Questions,
                                test.Quizdata,
                                test.id
                              )
                            }
                            disabled={isTestAttended || isOngoing}
                          >
                            {isTestAttended || isOngoing
                              ? 'Already Attended'
                              : 'Click for test'}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className='col-12 col-md-3'>
          <h4 className='mt-3'>Test Attended</h4>
          {attendedTests.length === 0 ? (
            <h5>No Test has been attended yet!</h5>
          ) : (
            attendedTests.map((test, index) => (
              <div className='card mb-2' key={index}>
                <div className='card-body'>
                  <h5 className='card-title'>{test?.attendedDate || 'N/A'}</h5>
                  <p className='card-text'>
                    Test Type: {test?.testType || 'N/A'}
                  </p>
                  <p className='card-text'>
                    {test?.totalMarks === undefined
                      ? 'You have left the test'
                      : `Marks Scored:${test?.totalMarks} / ${test?.totalQuestions}` ||
                        'N/A'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
