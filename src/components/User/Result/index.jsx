import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../../../firebase/firebase-config';
import { getDoc , doc, collection, setDoc} from 'firebase/firestore';
import './index.css';

const ResultPage = () => {
  const navigate = useNavigate();
  const [currentDate,setCurrentDate]=useState("")
  const location = useLocation();
  const { results, evaluate,details } = location.state || { evaluate: [] };  
  const [docId , setDocid] = useState('')
  const [attended, setAttended] = useState(0);
  const [notAttended, setNotAttended] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [totalMarks,setTotalMarks] = useState(0)

  useEffect(() => {
    const date = new Date()
    setCurrentDate(date.toString().split(" ").slice(0,4).join(" "))
    console.log(results, evaluate);
    calculation();
  }, [results, evaluate]);

  const calculation = () => {
    const calAttended = evaluate.filter(question => question.attended);
    const calNotAttended = evaluate.filter(question => !question.attended);

    // Set the count of attended and not attended questions
    setAttended(calAttended.length);
    setNotAttended(calNotAttended.length);

    // Set the total number of questions
    setTotalQuestions(calAttended.length + calNotAttended.length);
    answerCal()
  };

  const answerCal = async ()=>{
    const docid = localStorage.getItem("Question_Id")
    setDocid(docid)
    const docRef = doc(db, "Admin", docid);
    try{
      const docsnap = await getDoc(docRef)
    const evalAnswer = docsnap.data().Questions
    const userAnswer = results.answers
    let temp =0 
    for (let i = 0; i < userAnswer.length; i++) {
      if (userAnswer[i] === evalAnswer[i].answer) { // Compare user answer with the correct one
        temp += 1; // Increment score
      }
    }
    setTotalMarks(temp)
    }
    catch(err){
      console.log(err)
    }
  }

  const handleBack = async() => {
    const testData = {
      docId: docId,
      totalQuestions: totalQuestions,
      attended: attended,
      notAttended: notAttended,
      attempt: 1,
      totalMarks:totalMarks,
      attendedDate : currentDate,
      testType : details.type
    };
    
    // Reference to the User document with the user's unique ID
    const userDocRef = doc(db, "User", auth.currentUser.uid);
    
    // Reference to the UserTests collection inside the user document
    const usertestCollectionRef = collection(userDocRef, "UserTests");
    
    // Reference to a specific document (using docId) inside the UserTests collection
    const specificTestDocRef = doc(usertestCollectionRef, docId); 
    
    // Set the test data in the specific document
    await setDoc(specificTestDocRef, testData)
      .then(() => {
        navigate('/user');
      })
      .catch(error => {
        console.error("Error writing document: ", error);
      });
    
  };

  return (
    <div className="container">
      <h2>Result</h2>
      <table className="result-table">
        <tbody>
          <tr>
            <td>Total No. of Questions</td>
            <td>{totalQuestions}</td>
          </tr>
          <tr>
            <td>No. of Questions Attended</td>
            <td>{attended}</td>
          </tr>
          <tr>
            <td>No. of Questions Not Attended</td>
            <td>{notAttended}</td>
          </tr>
          <tr>
            <td>Total Marks</td>
            <td>{totalQuestions}</td>
          </tr>
          <tr>
            <td>Total Marks Obtained</td>
            <td>{totalMarks}</td>
          </tr>
        </tbody>
      </table>

      <center>
        <button className="back-btn" onClick={handleBack}>
          Return Home
        </button>
      </center>
    </div>
  );
};

export default ResultPage;
