import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminLogin.css"; // Import the CSS file

const AdminLogin = () => {
  return (
    <div className="adminLogin">
      {/* Top Bar */}
      <div className="admin-topbar"></div>

      {/* Navigation */}
      <nav className="admin-navigation">
      <div className="admin-logo-container">
        <img src="/images/dilg_logo.png" alt="dilg-logo" className="admin-dilg-logo" />
        <span className="admin-site-title">DILG Marinduque</span>
      </div>  
        <div className="admin-nav-items">
          <Link to="/homepage" className="home-icon">
            <img src="/images/home-icon.png" alt="Go to Homepage" />
          </Link>
          <Link to="/about" className="admin-nav-item">About Us</Link>
        </div>
      </nav>

      {/* Title and Description */}
      <div className="admin-dilg-description">
        <p>Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others.</p>
      </div>

      <div className="admin-login-identity">
        <p>Login As:</p>
      </div>

      <div className="admin-button-container">
        <Link to="/DilgAdminLogin" className="admin-oblong-btn">DILG</Link>
        <Link to="/LguAdminLogin" className="admin-oblong-btn">LGU</Link>
      </div>

      {/* BLTS Logo */}
      <img src="/images/blts_logo.png" alt="BLTS Logo" className="admin-blts-logo" />

      {/* Footer */}
      <footer className="admin-footer">
        <p className="footer-text">A project by ONE MARINDUQUE DILG - LRC</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
