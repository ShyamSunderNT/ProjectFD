import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to the home page after logout
import "./dashboard.css";
import newlogo from "../assets/newlogo.jpg"


const Artistdashboard = () => {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login state
  const navigate = useNavigate(); // useNavigate hook to redirect after logout

  // Retrieve user info from localStorage on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(user.firstName + ' ' + user.lastName);  // Set full name
    } else {
      setIsLoggedIn(false);  // If no user found, set logged-out state
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear user information from localStorage
    localStorage.removeItem('user');
    
    // Update state to simulate logout
    setIsLoggedIn(false);
    
    // Redirect to the home page
    navigate('/');
    
    // Force page reload
    window.location.reload();
  };

  return (
    <div>
      {/* Navbar with logo */}
      <nav className='neadnav'>
                <img src={newlogo} alt="" srcset="" />

            </nav>

      {/* Navbar with user's name and logout button */}
      <nav>
        <div className="navbar-username">
          {userName && <span className="user-name">Welcome, {userName}</span>}
          {/* Logout Button */}
          {isLoggedIn && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>

      <h1 className='headtag'>Artist Dashboard</h1>
    </div>
  );
};

export default Artistdashboard;

