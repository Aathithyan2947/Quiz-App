import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/login";
import Dashboard from './Dashboard/Dashboard'
import CreateQuizForm from "./QuizForm/creatquiz";
import QuizForm from "./QuizForm/QuizForm";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard/>}/>
      <Route path='/createquiz' element={<CreateQuizForm/>}/>
      <Route path="/quizform" element={<QuizForm/>}/>
    </Routes>
  );
};

export default App;
