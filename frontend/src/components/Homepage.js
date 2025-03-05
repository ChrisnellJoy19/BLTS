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
          <a href="#" className="nav-item">Sign Up</a>
          <a href="#" className="nav-item">About Us</a>
        </div>
      </nav>

      {/* Title and Description */}
      <div className="description">
        {/* <h1>Welcome to BLTS</h1> */}
        <p>Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others.</p>
      </div>

      {/* Get Started Button */}
      <a href="#" className="get-started-btn">Get Started</a>

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
