import React, { useState, useEffect } from 'react';
import './QuizForm.css';
import Sidebar from '../Dashboard/sidebar'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-config';

const QuizForm = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get state passed during navigation
  const { numberOfQuestions , quizData } = location.state || { }; // Default to 1 question if not provided
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Initialize the questions array based on the number of questions passed
    const initialQuestions = Array.from({ length: numberOfQuestions }, () => ({
      questionText: '',
      options: { A: '', B: '', C: '', D: '' },
      answer:''
    }));
    setQuestions(initialQuestions);
  }, [numberOfQuestions]);

  const handleChangeQuestion = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } 
    else if(field === 'answer'){
      updatedQuestions[index].answer = value;
    }else {
      updatedQuestions[index].options[field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const docid = localStorage.getItem("docId")
    const dbref = doc(db,"Admin",docid)
    console.log({
      Quizdata:quizData,
      Questions : questions
  })
    await setDoc(dbref,
      {
        Doc_id:docid,
        Quizdata:quizData,
        Questions : questions
    }).then(()=>{
      alert("Submitted successfully")
      navigate('/'); // Pass the number of questions as state
    })
    console.log('Submitted Data:', questions);
  };

  return (
    <div className="quiz-container">
      <Sidebar />
      <div className="quiz-content">
        <h2>Question Type</h2>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="question-section">
              <div className="question-header">
                <label>Question {index + 1}:</label>
                <textarea
                  value={question.questionText}
                  onChange={(e) =>
                    handleChangeQuestion(index, 'questionText', e.target.value)
                  }
                  placeholder="Enter the question"
                />
              </div>
              <div className="options">
                <div className="option">
                  <label>A.</label>
                  <input
                    type="text"
                    value={question.options.A}
                    onChange={(e) =>
                      handleChangeQuestion(index, 'A', e.target.value)
                    }
                    placeholder="Enter option"
                  />
                </div>
                <div className="option">
                  <label>B.</label>
                  <input
                    type="text"
                    value={question.options.B}
                    onChange={(e) =>
                      handleChangeQuestion(index, 'B', e.target.value)
                    }
                    placeholder="Enter option"
                  />
                </div>
                <div className="option">
                  <label>C.</label>
                  <input
                    type="text"
                    value={question.options.C}
                    onChange={(e) =>
                      handleChangeQuestion(index, 'C', e.target.value)
                    }
                    placeholder="Enter option"
                  />
                </div>
                <div className="option">
                  <label>D.</label>
                  <input
                    type="text"
                    value={question.options.D}
                    onChange={(e) =>
                      handleChangeQuestion(index, 'D', e.target.value)
                    }
                    placeholder="Enter option"
                  />
                </div>
              </div>
              <div className="option">
                  <label>Answer</label>
                  <input
                    type="text"
                    value={question.answer}
                    onChange={(e) =>
                      handleChangeQuestion(index, 'answer', e.target.value)
                    }
                    placeholder="Enter answer"
                  />
                </div>
            </div>
          ))}
          <div className="submit-section">
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
