import React from "react";
import "../styles/DilgAdmin.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      {/* Left Section */}
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


      {/* Right Section */}
      <div className="right-section">
        {/* Title and subtitle moved to the top-left of the right section */}
        <div className="right-header">
          <h2 className="login-title">DILG-Login Account</h2>
          <p className="login-subtitle">Create Your BLTS Profile</p>
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="blts-login-logo"
          />
        </div>

        <div className="login-container">
          {/* BLTS Logo inside login container */}
          <form className="login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <div className="login-footer">
            Don't have an account?<br/> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
