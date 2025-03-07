import React, { useState } from "react";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    municipality: "",
    barangay: "",
    adminYear: "",
    captain: "",
    secretary: "",
    email: "",
    password: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="signup-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="header">DILG MARINDUQUE</div>
        <p>
          Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records.
        </p>
        <div className="left-footer">A project by ONE MARINDUQUE DILG - LRC</div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="signup-container">
          {/* BLTS Logo */}
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="blts-signup-logo" />

          <h2 className="signup-title">Register Account</h2>
          <p className="signup-subtitle">Create Your BLTS Profile</p>

          <form className="signup-form" onSubmit={handleSubmit}>
            <select name="municipality" onChange={handleChange} required>
              <option value="">Select Municipality...</option>
              <option value="Municipality 1">Municipality 1</option>
              <option value="Municipality 2">Municipality 2</option>
            </select>

            <select name="barangay" onChange={handleChange} required>
              <option value="">Select Barangay...</option>
              <option value="Barangay 1">Barangay 1</option>
              <option value="Barangay 2">Barangay 2</option>
            </select>

            <input type="text" name="adminYear" placeholder="Administrative Year (Start-End)" onChange={handleChange} required />
            <input type="text" name="captain" placeholder="Punong Barangay" onChange={handleChange} required />
            <input type="text" name="secretary" placeholder="Barangay Secretary" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

            <label className="upload-logo">
              Upload SB Logo
              <input type="file" name="logo" onChange={handleFileChange} />
            </label>

            <button type="submit" className="signup-btn">Register</button>
          </form>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
