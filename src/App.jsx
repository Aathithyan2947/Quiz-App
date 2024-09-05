import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/login";
const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
