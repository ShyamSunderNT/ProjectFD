import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Use navigate for redirection
import "./otp.css";

const OtpVerify = () => {
  const [otp, setOtp] = useState(""); // Store the OTP entered by the user
  const [loading, setLoading] = useState(false); // Track loading state
  const [activationToken, setActivationToken] = useState(localStorage.getItem("activationToken"));
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages
  const [successMessage, setSuccessMessage] = useState(""); // To store success messages
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    if (!activationToken) {
      setErrorMessage("Activation token missing. Please register first.");
      navigate("/director-register"); // Redirect to director registration page
    }
  }, [activationToken, navigate]);

  // Handle OTP change
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.trim()) {
      setLoading(true);
      try {
        // Send OTP and activation token to the backend for verification
        const response = await axios.post("https://projectbd-ux1l.onrender.com/api/user/verify", {
          otp,
          activationToken,
        });

        setLoading(false);

        console.log("OTP verification response:", response.data); // Debugging

        if (response.data.success) {
          setSuccessMessage("OTP verified successfully!");
          

          // Check the role and navigate accordingly
          if (response.data.role === "director") {
            navigate("/director-dashboard");
          } else {
            navigate("/artist-dashboard");
          }
        } else {
          setErrorMessage(response.data.message || "Invalid OTP");
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.response ? error.response.data.message : "Something went wrong!");
      }
    } else {
      setErrorMessage("Please enter a valid OTP.");
    }
  };

  return (
    <div className="otp-container">
      <nav className="navbar">
        <h1>OTP Verification</h1>
      </nav>

      <div className="otp-form-container">
        <form onSubmit={handleVerifyOtp}>
          <h2 className="otphead">Enter OTP</h2>
          <div className="input-group">
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleOtpChange}
              required
              className="box-input"
            />
          </div>

          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Displaying success or error messages */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

 export default OtpVerify;


