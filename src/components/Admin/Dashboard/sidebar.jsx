import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase-config';
import './s.css';
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on mobile
  const navigate = useNavigate();

  const signout = async () => {
    try {
      await signOut(auth).then(() => {
        localStorage.clear();
        alert('Logged out');
        navigate('/');
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility on mobile
  };

  return (
    <>
      {/* Hamburger Icon visible on mobile */}
      <button
        className='navbar-toggler d-md-none' // Only on mobile view
        type='button'
        onClick={toggleSidebar}
        aria-controls='sidebarMenu'
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-label='Toggle sidebar'
      >
        {
          <div className={`mb-2 ${isOpen ? 'd-none' : 'd-block'}`}>
            <i className='fa-solid fa-bars'></i>
          </div>
        }
      </button>

      {/* Sidebar Container */}
      <div
        className={`sidebar ${isOpen ? 'open' : ''}`} // Conditionally add 'open' class
        id='sidebarMenu'
      >
        {/* Close Button for Mobile */}
        {isOpen && (
          <button className='close-btn d-md-none' onClick={toggleSidebar}>
            &times; {/* X to close the sidebar */}
          </button>
        )}

        {/* Sidebar content */}
        <div className='mb-4'>
          <div className='fs-4 text-center mb-4 logo'>
            <img src="./logo.png" alt="Logo" width="100" height="100" />
          </div>

          <div className='nav-item'>
            <Link
              to='/admindash'
              className='nav-link d-flex align-items-center'
            >
              <i className='fas fa-home me-2'></i> Home
            </Link>
          </div>
          <div className='nav-item'>
            <Link
              to='/createquiz'
              className='nav-link d-flex align-items-center'
            >
              <i className='fas fa-clipboard-list me-2'></i> Create Quiz
              <i className='fas fa-plus-circle add-icon ms-2'></i>
            </Link>
          </div>
        </div>

        {/* Logout */}
        <div className='mt-auto'>
          <div className='nav-item'>
            <a onClick={signout} className='nav-link d-flex align-items-center'>
              <i className='fas fa-sign-out-alt me-2'></i> Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
