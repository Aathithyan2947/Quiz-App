import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Authentication/Register/Register";
import Login from "./components/Authentication/Login/login";
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateQuizForm from "./components/Admin/QuizForm/creatquiz";
import QuizForm from "./components/Admin/QuizForm/QuizForm";
import UserDashboard from "./components/User/Dashboard/Dashboard";
import QuestionCard from "./components/User/Question";
import ReviewPage from "./components/User/Review/Reviewpage";
import ResultPage from "./components/User/Result";
const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard/>}/>
      <Route path='/createquiz' element={<CreateQuizForm/>}/>
      <Route path="/quizform" element={<QuizForm/>}/>
      <Route path="/user" element={<UserDashboard/>}/>
      <Route path="/quiz" element={<QuestionCard/>}/>
      <Route path='/review' element={<ReviewPage/>}/>
      <Route path='/result' element={<ResultPage/>}/>
    </Routes>
  );
};

export default App;
