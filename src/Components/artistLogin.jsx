import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './directorLogin.css'; // Import the corresponding CSS file
import { FcGoogle } from 'react-icons/fc';
import { GoogleLogin } from '@react-oauth/google'; 
import newlogo from "../assets/newlogo.jpg"


const ArtistLogin = () => {
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Check if the input is an email or mobile number
    const isEmail = formData.emailOrMobile.includes('@'); // Simple check for '@' to identify email
  
    // Prepare the payload based on the input type (email or mobile)
    const data = isEmail
      ? { email: formData.emailOrMobile, password: formData.password }
      : { mobileNumber: formData.emailOrMobile, password: formData.password };
  
    try {
      const response = await axios.post('https://projectbd-ux1l.onrender.com/api/user/artistlogin', data);
      setLoading(false);
  
      // Check if the response contains a welcome message, indicating a successful login
      if (response.data.message && response.data.message.includes('Welcome back Artist')) {
        
  
        // Store the token in localStorage for future requests (optional)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user)); 
  
        // Navigate to the artist dashboard
        navigate('/artist-dashboard');  // Ensure this route exists
      } else {
        alert(response.data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      alert(error.response ? error.response.data.message : 'Something went wrong!');
    }
  };

  // Handle cancel (reset form)
  const handleCancel = () => {
    setFormData({
      emailOrMobile: '',
      password: '',
    });
  };

  // const handleGoogleLogin = async (response) => {
  //   try {
  //     const { credential } = response;  // Get the credential (tokenId) from Google login
  
  //     // Send the Google token to your backend for verification and authentication
  //     const res = await axios.post("https://projectbd-ux1l.onrender.com/api/user/google", { tokenId: credential });
  
  //     if (res.data.token) {
  //       // Check if the user is a director
  //       if (res.data.user.role !== 'artist') {
  //         alert("You are not authorized to log in as a artist.");
  //         return;
  //       }
  
  //       // If the user is a director, proceed with the login
  //       localStorage.setItem("token", res.data.token);  // Store JWT token
  //       localStorage.setItem("user", JSON.stringify(res.data.user));  // Store user info
  
        
  
  //       // Navigate to the director dashboard
  //       navigate('/artist-dashboard');  // Ensure this route exists
  //     } else {
  //       alert(res.data.message || "Google login failed!");
  //     }
  //   } catch (error) {
  //     console.error("Error during Google login:", error);
  //     alert("Google login failed!");
  //   }
  // };
  
  
  
  const goToLoginPage = () => {
    navigate('/artist-register');  
  };

  const goToHomePage = () => {
    navigate('/');  // Navigate to Home page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className='neadnav'>
                <img src={newlogo} alt="" srcset="" />

            </nav>

      {/* Secondary Navbar (Register/Login) */}
      <nav className="navbar-secondary">
      <button className="home-btn" onClick={goToHomePage}>Home</button>
        <button className="Btn" onClick={goToLoginPage}>Register / </button>
        <button className="Btn1" >Login</button>
      </nav>
      {/* Login Form Container */}
      <div className="form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Artist Login</h2>

          {/* Email or Mobile Number Input */}
          <div className="input-group1">
            <label>Email / Mobile Number</label>
            <input
              type="text"
              name="emailOrMobile"
              value={formData.emailOrMobile}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group1">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Sign In Button */}
          <div className="form-buttons">
            <button type="submit" className="btn3 signup-btn3" disabled={loading}>
              {loading ? 'logging Up...' : 'login'}
            </button>
            <button type="button" className="btn3 cancel-btn3" onClick={handleCancel}>
              Cancel
            </button>
          </div>

          {/* Google Login Button */}
          {/* <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleLogin}  // Handle Google login success
              onError={() => alert('Google login failed!')}  // Handle Google login error
            />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default ArtistLogin;
