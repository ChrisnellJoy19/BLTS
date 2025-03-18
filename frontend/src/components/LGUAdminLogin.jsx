import React from "react";
import "../styles/LGUAdminLogin.css";
import { Link } from "react-router-dom";

const LguAdminLogin = () => {
  return (
    <div className="LguAdminLogin-page">
      {/* Left Section */}
      <div className="LguAdminLogin-left-section">
        <div className="LguAdminLogin-left-header">
          <div className="LguAdminLogin-header">
            <span>DILG MARINDUQUE</span>
            <Link to="/homepage" className="LguAdminLogin-home-icon">
              <img src="/images/home-icon.png" alt="Go to Homepage" />
            </Link>
          </div>
        </div>
        <p className="LguAdminLogin-description">
          Barangay Legislative Tracking System (BLTS) is an online repository
          platform for archiving Barangay Legislative Records. Barangay
          Secretary uploads ordinances, resolutions, and others.
        </p>
        <div className="LguAdminLogin-left-footer">
          A project by ONE MARINDUQUE DILG - LRC
          <div className="LguAdminLogin-left-image">
          <img src="/images/accent-3.svg" alt="Lower Left Decoration" />
        </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="LguAdminLogin-right-section">
                {/* Pattern Image */}
                <div className="LguAdminLogin-pattern">
          <img src="/images/accent-1.svg" alt="Pattern" />
        </div>
        <div className="LguAdminLogin-right-header">
          <h2 className="LguAdminLogin-title">LGU-Login Account</h2>
          <p className="LguAdminLogin-subtitle">Login your BLTS Profile</p>
        </div>

        {/* Logo and Login Form */}
        <div className="LguAdminLogin-container">
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="blts-LguAdminLogin-logo"
          />
          <form className="user-login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="LguAdminLogin-btn">Login</button>
          </form>
          <div className="LguAdminLogin-footer">
            Don't have an account?<br /> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default LguAdminLogin;
