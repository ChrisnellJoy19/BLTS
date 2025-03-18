import React from "react";
import "../styles/DilgAdminLogin.css";
import { Link } from "react-router-dom";

const DilgAdminLogin = () => {
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
          <form className="DilgAdminLogin-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="DilgAdminLogin-btn">Login</button>
          </form>
          <div className="DilgAdminLogin-footer">
            Don't have an account?<br /> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminLogin;
