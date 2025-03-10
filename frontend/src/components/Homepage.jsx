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
          <Link to="/userlogin" className="nav-item">User</Link>
          <Link to="/adminlogin" className="nav-item">Admin</Link>
          <Link to="/about" className="nav-item">About Us</Link>
        </div>
      </nav>

      {/* Title and Description */}
      <div className="description">
        {/* <h1>Welcome to BLTS</h1> */}
        <p>Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others.</p>
      </div>

      {/* Get Started Button */}
      <Link to="/get-started" className="get-started-btn">Get Started</Link>


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
