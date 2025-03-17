import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/DilgAdmin.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/adminlogin", { email, password });
  
      if (response.data.message === "Login successful") {
        alert("Login Successful! Redirecting to dashboard...");
        // navigate("/admin-dashboard"); 
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="login-page">
      <div className="left-section">
        <div className="left-header">
          <div className="header">
            <span>DILG MARINDUQUE</span>
            <Link to="/homepage" className="home-icon">
              <img src="/images/home-icon.png" alt="Go to Homepage" />
            </Link>
          </div>
        </div>
        <p>
          Barangay Legislative Tracking System (BLTS) is an online repository
          platform for archiving Barangay Legislative Records. Barangay
          Secretary uploads ordinances, resolutions, and others.
        </p>
        <div className="left-footer">
          A project by ONE MARINDUQUE DILG - LRC
        </div>
      </div>

      <div className="right-section">
        <div className="right-header">
          <h2 className="login-title">DILG-Login Account</h2>
          <p className="login-subtitle">Create Your BLTS Profile</p>
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="blts-login-logo" />
        </div>

        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px", fontWeight: "bold" }}>
              {errorMessage}
            </div>
          )}
          <div className="login-footer">
            Don't have an account?<br/> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
