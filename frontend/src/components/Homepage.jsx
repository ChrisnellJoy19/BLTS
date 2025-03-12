import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";

const Homepage = () => {
  return (
    <div className="home">
      <div className="top-bar-home"></div>
      <nav className="home-navigation">
        <div className="home-logo-container">
          <img src="/images/dilg_logo.png" alt="DILG Logo" className="home-dilg-logo" />
          <span className="home-site-title">DILG Marinduque</span>
        </div>
        <div className="home-nav-items">
          <Link to="/userlogin" className="nav-item">User</Link>
          <Link to="/adminlogin" className="nav-item">Admin</Link>
          <Link to="/about" className="nav-item">About Us</Link>
        </div>
      </nav>

      <div className="home-description">
        <img src="/images/blts_logo.png" alt="BLTS Logo" className="home-blts-logo" />

      {/* Description */}
      <p className="home-description">
          Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions, and others.
        </p>

        {/* Get Started Button */}
        <Link to="/get-started" className="home-get-started-btn">Get Started</Link>
      </div>

      <footer className="home-footer">
        <p className="home-footer-text">A project by ONE MARINDUQUE DILG - LRC</p>
      </footer>
    </div>
  );
};

export default Homepage;
