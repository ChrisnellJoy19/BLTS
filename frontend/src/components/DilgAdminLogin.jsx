import React, { useState } from "react";
import "../styles/DilgAdminLogin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DilgAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/dilgadmin/login", {  // Assuming your backend is running on port 5000

        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        window.location.href = "/dilgAdminDashboard"
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="DilgAdminLogin-page">
      {/* Left Section */}
      <div className="DilgAdminLogin-left-section">
        <div className="DilgAdminLogin-left-header">
          <div className="DilgAdminLogin-header">
            <span>DILG MARINDUQUE</span>
            <Link to="/homepage" className="DilgAdminLogin-home-icon">
              <img src="/images/home-icon.png" alt="Go to Homepage" />
            </Link>
          </div>
        </div>
        <p className="DilgAdminLogin-description">
          Barangay Legislative Tracking System (BLTS) is an online repository
          platform for archiving Barangay Legislative Records. Barangay
          Secretary uploads ordinances, resolutions, and others.
        </p>
        <div className="DilgAdminLogin-left-footer">
          A project by ONE MARINDUQUE DILG - LRC
          <div className="DilgAdminLogin-left-image">
            <img src="/images/accent-3.svg" alt="Lower Left Decoration" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="DilgAdminLogin-right-section">
        {/* Pattern Image */}
        <div className="DilgAdminLogin-pattern">
          <img src="/images/accent-1.svg" alt="Pattern" />
        </div>
        <div className="DilgAdminLogin-right-header">
          <h2 className="DilgAdminLogin-title">DILG-Login Account</h2>
          <p className="DilgAdminLogin-subtitle">Login your BLTS Profile</p>
        </div>

        {/* Logo and Login Form */}
        <div className="DilgAdminLogin-container">
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="blts-DilgAdminLogin-logo"
          />
          <form className="DilgAdminLogin-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="DilgAdminLogin-btn">Login</button>
          </form>
          {error && <div className="DilgAdminLogin-error">{error}</div>}
          <div className="DilgAdminLogin-footer">
            Authorized DILG Admins only.
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminLogin;
