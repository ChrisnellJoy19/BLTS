import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LGUAdmin.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Dummy credentials for authentication
  const correctEmail = "admin@lgumarinduque.com";
  const correctPassword = "password123";

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === correctEmail && password === correctPassword) {
      navigate("/admin-dashboard");
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section">
        <div className="left-header">
          <div className="header">
            <span>DILG MARINDUQUE</span>
            <Link to="/homepage" className="home-icon">
              <img src="/images/home-icon.png" alt="Go to Homepage" />
            </Link>
          </div>
        </div>
        <p>
          Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions, and others.
        </p>
        <div className="left-footer">A project by ONE MARINDUQUE DILG - LRC</div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="right-header">
          <h2 className="login-title">Login Account</h2>
          <p className="login-subtitle">Create Your BLTS Profile</p>
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="blts-login-logo" />
        </div>

        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="login-btn">Login</button>
          </form>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <div className="login-footer">
            Don't have an account?<br /> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
