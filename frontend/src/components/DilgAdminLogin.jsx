import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DilgAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${window.location.hostname}:5000/api/dilgadmin/login`, {
        email,
        password,
      });
      

      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        alert("Login successful!");
        window.location.href = "/dilgAdminDashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col justify-between bg-gradient-to-b from-[#5a7d9a] to-[#5f7f9e] text-white min-w-[300px] w-full md:w-1/2 relative z-10">
      {/* Header */}
      <div className="bg-[#1d3557] flex items-center justify-between px-5 py-4 text-sm font-bold w-full z-20">
        <span>DILG MARINDUQUE</span>
        <Link
          to="/homepage"
          className="flex items-center gap-2 text-white bg-[#163a56] px-3 py-1 rounded-md shadow hover:bg-[#5f7f9e] transition">
          <img src="/images/home-icon.png" alt="Home" className="h-4 w-4" />
          <span>Home</span>
        </Link>
      </div>

        <p className="text-center text-lg px-10 py-8">
          Barangay Legislative Tracking System (BLTS) is an online repository
          platform for archiving Barangay Legislative Records. Barangay
          Secretary uploads ordinances and resolutions.
        </p>

        <div className="relative bg-[#163a56] text-center text-sm py-2 z-10">
          A project by ONE MARINDUQUE DILG - LGRC
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center bg-white relative w-full md:w-[60%] px-4">
        <div className="absolute top-0 right-0 w-[400px] opacity-50 z-0">
          <img src="/images/accent-1.svg" alt="Pattern" className="w-full h-auto" />
        </div>

        <div className="relative z-10 text-center mb-6">
          <h2 className="text-[25px] font-bold text-red-700 mb-1">DILG-Login Account</h2>
          <p className="text-sm font-semibold text-black">Login your BLTS Profile</p>
        </div>

        <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-[350px] text-center">
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="w-full max-w-[200px] mx-auto mb-4"
          />
          <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-[90%] p-2 my-2 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-[90%] p-2 my-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="submit"
              className="w-[90%] bg-gradient-to-r from-[#ca1a07] to-[#e67e22] text-white py-2 text-base rounded-full mt-4 hover:from-[#c0392b] hover:to-[#d35400] transition"
            >
              Login
            </button>
          </form>
          {error && <div className="text-red-600 text-sm mt-4">{error}</div>}
          <div className="text-sm text-gray-600 mt-4">Authorized DILG Admins only.</div>
          <div className="text-sm text-center mt-2">
              <a href="/AdminForgotPassword" className="text-black-200 hover:underline cursor-pointer">
                Forgot Password?
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminLogin;
