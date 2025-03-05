import React from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="header">DILG MARINDUQUE</div>
        <p>Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions, and others.</p>
        <div className="left-footer">A project by ONE MARINDUQUE DILG - LRC</div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="login-container">
          {/* BLTS Logo inside login container */}
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="blts-login-logo" />

          <h2 className="login-title">Login Account</h2>
          <p className="login-subtitle">Create Your BLTS Profile</p>
          <form className="login-form">
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="login-btn">Login</button>
          </form>
          <div className="login-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
            <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
