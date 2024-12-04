import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./DirectorRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';



const ArtistRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        role: 'artist', // Always set role as 'director' for this form
      };

      const response = await axios.post('https://projectbd-ux1l.onrender.com/api/user/register', payload);

      setLoading(false);
      console.log('Server Response:', response); // Log the response for debugging

      if (response.data && response.data.message === "OTP sent to your email") {
        console.log('Redirecting to OTP verification page');
        
        // Store user and activation token in localStorage
        localStorage.setItem('activationToken', response.data.activationToken);
        localStorage.setItem('user', JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
          role: 'artist',
        }));


        toast.success('OTP has been sent to your email. Please verify!');

        // Navigate to OTP verification page
        navigate('/otpverify');
      } else {
        console.log('Unexpected message:', response.data.message);
        toast.error('Something went wrong. Please try again.');
      }

    } catch (error) {
      setLoading(false);
      console.error(error.response ? error.response.data.message : "Something went wrong!");
      toast.error(error.response ? error.response.data.message : 'Something went wrong!');
    }
  };


  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const goToLoginPage = () => {
    navigate('/artist-login');  // Navigate to director login page
  };

  const goToHomePage = () => {
    navigate('/');  // Navigate to Home page
  };


  return (
    <div>
      
      {/* Navbar with Company Logo */}
      <nav className='neadnav'>
                <img src="https://png.pngtree.com/png-vector/20220719/ourmid/pngtree-golden-photography-wing-camera-logo-png-image_6007201.png" alt="" srcset="" />

            </nav>

      {/* Secondary Navbar for Register/Login */}
      <nav className="navbar-secondary">
      <button className="home-btn" onClick={goToHomePage}>Home</button> 
        <button className="Btn">Register /</button>
        <button className="Btn1"  onClick={goToLoginPage}> Login</button>
      </nav>

      {/* Main Content Container */}
      <div className="form-container">
        {/* Registration Form */}
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <h2>you will register as a Artist</h2>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn5 signup-btn5" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <button type="button" className="btn5 cancel-btn5" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    
    </div>
  );
};

export default ArtistRegister;
