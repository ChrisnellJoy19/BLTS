import React from "react";
import "../styles/DilgAdminLogin.css";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="user-login-page">
      {/* Left Section */}
      <div className="user-left-section">
        <div className="user-left-header">
          <div className="user-header">
            <span>DILG MARINDUQUE</span>
            <Link to="/homepage" className="user-home-icon">
              <img src="/images/home-icon.png" alt="Go to Homepage" />
            </Link>
          </div>
        </div>
        <p className="user-description">
          Barangay Legislative Tracking System (BLTS) is an online repository
          platform for archiving Barangay Legislative Records. Barangay
          Secretary uploads ordinances, resolutions, and others.
        </p>
        <div className="user-left-footer">
          A project by ONE MARINDUQUE DILG - LRC
          <div className="user-left-image">
          <img src="/images/accent-3.svg" alt="Lower Left Decoration" />
        </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="user-right-section">
                {/* Pattern Image */}
                <div className="user-pattern">
          <img src="/images/accent-1.svg" alt="Pattern" />
        </div>
        <div className="user-right-header">
          <h2 className="user-login-title">DILG-Login Account</h2>
          <p className="user-login-subtitle">Login your BLTS Profile</p>
        </div>

        {/* Logo and Login Form */}
        <div className="user-login-container">
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="blts-user-login-logo"
          />
          <form className="user-login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="user-login-btn">Login</button>
          </form>
          <div className="user-login-footer">
            Don't have an account?<br /> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
