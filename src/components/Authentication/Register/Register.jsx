import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 8000);
      return setError("Passwords do not match");
    }
    else {
      await createUserWithEmailAndPassword(auth,email,password).then(()=>{
        console.log("signed up")
      }).catch(()=>{
        setError("Invaild Email")
      })
      // localStorage.setItem("authToken", data.token);
      localStorage.setItem("username",username)
      setTimeout(() => {
        navigate("/login");
      }, 1800);
    }
  };

  return (
    <div className="Inclusive-register-page">
      <div className="register-big-wrapper">
        <div className="register-banner-section">
        <h2><b>LOGO</b></h2>
        <p> 
        Achieve Your Dreams with UJ Tutorials<br/><br/>
        At UJ Tutorials, we make success in competitive  
        exams simple. With expert teachers, focused  
        coaching, and a proven track record. <br/><br/>
        we’re here to help you reach your goals, Join our community of  
        achievers and take the first step towards your bright future.</p>
        </div>

        <div className="section-wrapper">
          <div className="top-register-explain">
            <h2>Registration</h2>
            <p>
              Enter your details to register
            </p>
          </div>

          <form onSubmit={registerHandler}>
            {error && <div className="error_message">{error}</div>}
            <div className="input-wrapper">
              <input
                type="text"
                required
                id="name"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="name">Username</label>
            </div>
            <div className="input-wrapper">
              <input
                type="email"
                required
                id="email"
                placeholder="example@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                tabIndex={1}
              />
              <label htmlFor="email">E-mail</label>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                required
                id="password"
                autoComplete="true"
                placeholder="6+ strong characters"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="input-wrapper">
              <input
                type="password"
                required
                id="confirmpassword"
                autoComplete="true"
                placeholder="Confirm password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>

            <button type="submit">Sign Up</button>
            <div className="top-suggest_login">
            <span>Have an account? </span>
            <a href="/login">Sign In</a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
