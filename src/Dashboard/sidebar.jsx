import React from 'react';
import './App.css'; // Import CSS for styling

const Sidebar = () => {
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
          <a href="/createquiz" className="nav-link">
            <i className="fas fa-clipboard-list"></i>
            Create Quiz
            <i className="fas fa-plus-circle add-icon"></i> 
          </a>
        </div>
        <div className="nav-item">
          <a href="/logout" className="nav-link">
            <i className="fas fa-sign-out-alt"></i> 
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
