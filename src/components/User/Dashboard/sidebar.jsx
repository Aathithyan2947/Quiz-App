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
        alert("Logout successfully");
        navigate('/login');
      })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">LOGO</div>
        <div className="nav-item">
          <a href="/" className="nav-link">
            <i className="fas fa-home"></i>
            Home
          </a>
        </div>
        <div className="nav-item">
          <a onClick={signout}className="nav-link">
            <i className="fas fa-sign-out-alt"></i> 
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
