import React from 'react';
import './App.css'; 
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const signout = async()=>{
    try{
      await signOut(auth).then(()=>{
        localStorage.clear()
        alert("Logged out")
        navigate('/login')
      })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div>
        <div className="logo">LOGO</div>
        <div className="nav-item">
          <a href="/" className="nav-link">
            <i className="fas fa-home"></i>
            Home
          </a>
        </div>
        <div className="nav-item">
          <a href="/createquiz" className="nav-link">
            <i className="fas fa-clipboard-list"></i>
            Create Quiz
            <i className="fas fa-plus-circle add-icon"></i> 
          </a>
        </div>
        </div>
        <div className="nav-item">
          <a onClick={signout} className="nav-link">
            <i className="fas fa-sign-out-alt"></i> 
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
