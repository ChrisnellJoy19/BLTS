import React from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css"; // Import the CSS file

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Top Bar */}
      <div className="rectangle-2"></div>

      {/* Navigation */}
      <nav className="navigation">
      <div className="logo-container">
        <img src="/images/dilg_logo.png" alt="dilg-logo" className="dilglogo" />
        <span className="site-title">DILG Marinduque</span>
      </div>  
        <div className="nav-items">
          <Link to="/homepage" className="homeicon">
            <img src="/images/home-icon.png" alt="Go to Homepage" />
          </Link>
          <Link to="/about" className="nav-item">About Us</Link>
        </div>
      </nav>

      {/* Title and Description */}
      <div className="dilg-description">
        <p>Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others.</p>
      </div>

      <div className="login-identity">
        <p>Login As:</p>
      </div>

      <div className="button-container">
        <Link to="/adminDILG" className="oblong-btn">DILG</Link>
        <Link to="/adminLGU" className="oblong-btn">LGU</Link>
      </div>

      {/* BLTS Logo */}
      <img src="/images/blts_logo.png" alt="BLTS Logo" className="bltslogo" />

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">A project by ONE MARINDUQUE DILG - LRC</p>
      </footer>
    </div>
  );
};

export default Homepage;
