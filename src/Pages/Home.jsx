import React from 'react'
import homeimg from "../assets/home.jpg"
import './Home.css'; 
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate =useNavigate()
  const goToHomePage = () => {
    navigate('/');  // Navigate to Home page
  };
 

  return (
    <div>
      <nav className='neadnav'>
                <img src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-golden-photography-wing-camera-logo-png-image_6007201.png" alt="" srcset="" />

            </nav>
      {/* Navbar Section */}
      <nav className='navbar'>
       <button  className="button5" onClick={goToHomePage} >Home</button>
      </nav>

      {/* Main Image Section with Centered Content */}
      <div className="main-section">
        {/* Adding the Image Tag for Background */}
        <img
          src={homeimg}
          alt="Background"
          className="background-image"
        />

        <div className="overlay">
          <h1 className='main-heading'>Register as ..!</h1>
          <div className='buttons-container'>
            <Link to="/director-register" style={{ textDecoration: 'none' }}>
              <button className='btn2'>Director</button>
            </Link>
            <Link to="/artist-register" style={{ textDecoration: 'none' }}>
              <button className='btn1'>Artist</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
