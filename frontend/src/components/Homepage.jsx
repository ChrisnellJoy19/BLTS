import React from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css"; // Import the CSS file

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Top Bar */}
      <div className="rectangle-2"></div>

      {/* Navigation */}
      <nav className="navigation">
      <div className="logo-container">
        <img src="/images/dilg_logo.png" alt="DILG Logo" className="dilg-logo" />
        <span className="site-title">DILG Marinduque</span>
      </div>  
        <div className="nav-items">
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/signup" className="nav-item">Sign Up</Link>
 HEAD:frontend/src/components/Homepage.js
          <Link to="/aboutus" className="nav-item">About Us</Link>
          <Link to="/about" className="nav-item">About Us</Link>
 2c1b44ad0fd470c8c6555779dfcfff25aa2d0445:frontend/src/components/Homepage.jsx
        </div>
      </nav>

      {/* Title and Description */}
      <div className="description">
        {/* <h1>Welcome to BLTS</h1> */}
        <p>Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others.</p>
      </div>

      {/* Get Started Button */}
 HEAD:frontend/src/components/Homepage.js
      <Link to="/get-started-btn" className="get-started-btn">Get Started</Link>
      <Link to="/get-started" className="get-started-btn">Get Started</Link>
 2c1b44ad0fd470c8c6555779dfcfff25aa2d0445:frontend/src/components/Homepage.jsx

      {/* BLTS Logo */}
      <img src="/images/blts_logo.png" alt="BLTS Logo" className="blts-logo" />

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">A project by ONE MARINDUQUE DILG - LRC</p>
      </footer>
    </div>
  );
};

export default Homepage;
