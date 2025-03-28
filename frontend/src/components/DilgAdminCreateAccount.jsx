import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DilgAdminCreateAccount.css";

const DilgAdmin = () => {
  const [formData, setFormData] = useState({
    municipality: "",
    barangay: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="DilgAdminSignup-page">
      {/* Left Section */}
      <div className="DilgAdminSignup-left-section">
        <div className="DilgAdminSignup-header">
          <h2>DILG MARINDUQUE</h2>
          <Link to="/DilgAdminDashboard" className="DilgAdminSignup-home-icon">
            <img src="/images/home-icon.png" alt="Go to Homepage" />
          </Link>
        </div>
        <p className="DilgAdminSignup-description">
          The Barangay Legislative Tracking System (BLTS) is an online platform
          for archiving Barangay Legislative Records, where Barangay Secretaries
          can upload ordinances, resolutions, and other records.
        </p>
        <div className="DilgAdminSignup-left-footer">A project by ONE MARINDUQUE DILG - LRC</div>
        <div className="DilgAdminSignup-left-image">
          <img src="/images/accent-3.svg" alt="Lower Left Decoration" />
        </div>
      </div>

      {/* Right Section */}
      <div className="DilgAdminSignup-right-section">
        {/* Pattern Image */}
        <div className="DilgAdminSignup-pattern">
          <img src="/images/accent-1.svg" alt="Pattern" />
        </div>

        {/* Title, Subtitle, and Logo */}
        <div className="DilgAdminSignup-right-header">
          <h2 className="DilgAdminSignup-title">DILG-Signup Account</h2>
          <p className="DilgAdminSignup-subtitle">Create your BLTS Profile</p>
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="blts-DilgAdminSignup-logo"
          />
        </div>

        {/* Signup Form */}
        <div className="DilgAdminSignup-container">
          <form className="DilgAdminSignup-form" onSubmit={handleSubmit}>
            {/* Municipality Dropdown */}
            <select
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Municipality...</option>
              <option value="Boac">Boac</option>
              <option value="Gasan">Gasan</option>
              <option value="Buenavista">Buenavista</option>
              <option value="Torijjos">Torijjos</option>
              <option value="Santa Cruz">Santa Cruz</option>
              <option value="Mogpog">Mogpog</option>
            </select>

            {/* Barangay Dropdown */}
            <select
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Barangay...</option>
              <option value="Barangay 1">Barangay 1</option>
              <option value="Barangay 2">Barangay 2</option>
            </select>

            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Enter Gmail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button type="submit" className="DilgAdminSignup-btn">Register</button>
          </form>

          {/* Footer */}
          <div className="DilgAdminSignup-footer">
            <p>Already have an account? <Link to="/userlogin">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilgAdmin;
