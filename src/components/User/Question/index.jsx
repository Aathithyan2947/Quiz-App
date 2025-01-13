import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/firebase-config';
import './quiz.css';

const QuestionCard = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const { data, duration, details } = location.state || { data: [] };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(data.length).fill('')
  );
  const [timeRemaining, setTimeRemaining] = useState(parseInt(duration) * 60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            alert("Time's up! Quiz completed.");
            handleSubmit();
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive]);

  const handleAnswerSelect = (event) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleGridButtonClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleClearAnswer = () => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = '';
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setTimerActive(false);
    const results = {
      answers: selectedAnswers,
      timeRemaining,
      user_id: auth.currentUser.uid,
    };

    console.log('Quiz submitted with results:', results);
    alert('Quiz submitted!');
    navigation('/review', { state: { results, details } });
  };

  const currentQuestion = data[currentQuestionIndex];

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className='container my-4'>
      <div className='row'>
        {/* Grid for Question Buttons */}
        <div className='col-12 col-md-3'>
          <div className='grid-container'>
            {Array.from({ length: data.length }, (_, index) => (
              <button
                key={index}
                className={`grid-item ${
                  index === currentQuestionIndex ? 'active' : ''
                } ${selectedAnswers[index] ? 'answered' : ''}`}
                onClick={() => handleGridButtonClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Section */}
        <div className='col-12 mt-3 '>
          <div className='question-section'>
            <div className='timer mb-4 pb-2'>
              Time Remaining: {formatTime(timeRemaining)}
            </div>

            <h3>Question {currentQuestionIndex + 1}</h3>
            <p>{currentQuestion.questionText}</p>
            <h5>Options:</h5>
            <div className='options'>
              {currentQuestion.options &&
                Object.entries(currentQuestion.options)
                  .sort(([key1], [key2]) => key1.localeCompare(key2))
                  .map(
                    ([key, value]) =>
                      value !== null && value !== '' ? ( // Render only if value is not null or empty
                        <div key={key} className='form-check'>
                          <input
                            className='form-check-input'
                            type='radio'
                            value={value}
                            checked={
                              selectedAnswers[currentQuestionIndex] === value
                            }
                            onChange={handleAnswerSelect}
                            id={`option-${key}`} // Add a unique id for the radio button
                          />
                          <label
                            className='ml-3 form-check-label'
                            htmlFor={`option-${key}`}
                          >
                            {key}) {value}
                          </label>
                        </div>
                      ) : null // Skip rendering if value is null or empty
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='navigation-buttons d-flex justify-content-end'>
        <button
          className='btn btn-secondary backbn mb-2'
          onClick={handleBack}
          disabled={currentQuestionIndex === 0}
        >
          Back
        </button>
        {currentQuestionIndex === data.length - 1 ? (
          <button
            className='mb-2 btn btn-primary nextbn'
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button className='mb-2 btn btn-primary nextbn' onClick={handleNext}>
            Next
          </button>
        )}
        <button
          className=' btn btn-warning clearbn'
          onClick={handleClearAnswer}
          disabled={!selectedAnswers[currentQuestionIndex]}
        >
          Clear Answer
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
