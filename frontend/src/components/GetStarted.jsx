import React from "react";
import { Link } from "react-router-dom";
import "../styles/GetStarted.css"; // Import the CSS file

const GetStarted = () => {
  return (
    <div className="get-started-page">
      {/* Top Bar */}
      <div className="top-bar"></div>

      {/* Navigation */}
      <nav className="get-started-navigation">
        <div className="get-started-logo-container">
          <img src="/images/dilg_logo.png" alt="DILG Logo" className="get-started-dilg-logo" />
          <span className="get-started-site-title">DILG Marinduque</span>
        </div>
        <div className="get-started-nav-items">
          <Link to="/login" className="get-started-nav-item">Login</Link>
          <Link to="/signup" className="get-started-nav-item">Sign Up</Link>
          <Link to="/about" className="get-started-nav-item">About Us</Link>
        </div>
      </nav>

      {/* BLTS Logo & Description */}
      <div className="get-started-description">
        <img src="/images/blts_logo.png" alt="BLTS Logo" className="get-started-blts-logo" />
        <p>
          Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions, and others.
        </p>
      </div>

      {/* Map Section */}
      <div className="get-started-map-section">
      <iframe 
        className="get-started-map-iframe" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221569.83690051668!2d121.83084090324186!3d13.380381676842799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a318a5c1f65dbf%3A0xe9feb3ea5b6e3b7b!2sMarinduque!5e1!3m2!1sen!2sph!4v1741305863299!5m2!1sen!2sph" 
        width="500" 
        height="400" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade">
      </iframe>

      <ul className="get-started-municipality-list">
        <li>Boac</li>
        <li>Buenavista</li>
        <li>Gasan</li>
        <li>Mogpog</li>
        <li>Santa Cruz</li>
        <li>Torrijos</li>
      </ul>
    </div>


      {/* Footer */}
      <footer className="get-started-footer">
        <p className="get-started-footer-text">A project by ONE MARINDUQUE DILG - LRC</p>
      </footer>
    </div>
  );
};

export default GetStarted;
