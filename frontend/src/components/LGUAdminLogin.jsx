import React, { useState } from "react";
import "../styles/LGUAdminLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";

const LguAdminLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/lguadmin/login", {
        identifier,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        window.location.href = "/lguAdminDashboard"
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="LguAdminLogin-page">
      <div className="LguAdminLogin-left-section">
        <div className="LguAdminLogin-left-header">
          <div className="LguAdminLogin-header">
            <span>DILG MARINDUQUE</span>
            <Link to="/homepage" className="LguAdminLogin-home-icon">
              <img src="/images/home-icon.png" alt="Go to Homepage" />
            </Link>
          </div>
        </div>
        <p className="LguAdminLogin-description">
          Barangay Legislative Tracking System (BLTS) is an online repository
          platform for archiving Barangay Legislative Records.
        </p>
        <div className="LguAdminLogin-left-footer">
          A project by ONE MARINDUQUE DILG - LRC
        <div className="LguAdminLogin-left-image">
            <img src="/images/accent-3.svg" alt="Lower Left Decoration" />
          </div>
        </div>
      </div>

      <div className="LguAdminLogin-right-section">
        <div className="LguAdminLogin-pattern">
          <img src="/images/accent-1.svg" alt="Pattern" />
        </div>
        <div className="LguAdminLogin-right-header">
          <h2 className="LguAdminLogin-title">LGU-Admin Login</h2>
          <p className="LguAdminLogin-subtitle">Login to your BLTS Profile</p>
        </div>

        <div className="LguAdminLogin-container">
        <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="blts-DilgAdminLogin-logo"
          />
          <form className="user-login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="LguAdminLogin-btn">Login</button>
          </form>
          {error && <div className="LguAdminLogin-error">{error}</div>}
          <div className="LguAdminLogin-footer">
            Don't have an account?<br /> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default LguAdminLogin;
