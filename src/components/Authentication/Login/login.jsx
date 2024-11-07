import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase-config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    e.preventDefault();
      // localStorage.setItem("authToken", data.token);
      if(email==="admin@gmail.com" || email==="aathireguraj@gmail.com"){
        await signInWithEmailAndPassword(auth,email,password).then(()=>{
          setTimeout(() => {
            localStorage.setItem("user_id",auth.currentUser.uid)
            navigate("/")
          }, 1800)
        }).catch((err)=>{
          setError("Provide valid credentials");
          setTimeout(() => {
          setError("");
        }, 4500);
        })  
      }    
      else{
        await signInWithEmailAndPassword(auth,email,password).then(()=>{
          setTimeout(() => {
            localStorage.setItem("user_id",auth.currentUser.uid)
            navigate("/user")
          }, 1800)
        }).catch((err)=>{
          setError("Provide valid credentials");
          setTimeout(() => {
          setError("");
        }, 4500);
        })  
      }
  };

  return (

    <div className="Inclusive-login-page">
      <div className="login-big-wrapper">
        <div className="section-wrapper">
        <div className="top-login-explain">
            <h2>Login to Your Account </h2>
            <p>
              Please Login Your Account, Thank You!
            </p>
          </div>
          <form onSubmit={loginHandler} >
            {error && <div className="error_message">{error}</div>}
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
                placeholder="6+ strong character"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                tabIndex={2}
              />
              <label htmlFor="password">
                Password

              </label>
            </div>
            <Link to="/forgotpassword" className="login-screen__forgotpassword"> Forgot Password ?
            </Link>
            <button type="submit" >
              Login
            </button>
            <div className="top-suggest_register">

            <span>Don't have an account? </span>
            <a href="/register">Sign Up</a>

          </div>
          </form>


        </div>

        <div className="login-banner-section ">
        <h2><b>LOGO</b></h2>
        <h3> 
        Achieve Your Dreams with UJ Tutorials<br/><br/>
        At UJ Tutorials, we make success in competitive  
        exams simple. With expert teachers, focused  
        coaching, and a proven track record. <br/><br/>
        we’re here to help you reach your goals, Join our community of  
        achievers and take the first step towards your bright future.</h3>
        </div>
      </div>

    </div>


  );
};

export default Login;
