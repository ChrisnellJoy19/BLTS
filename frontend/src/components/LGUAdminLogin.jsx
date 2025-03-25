import React, { useState } from "react";
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
        window.location.href = "/lguAdminDashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
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


        {/* Description */}
        <div className="text-lg text-center px-10 py-6 z-10">
          <p>
            Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records.
            Barangay Secretary uploads ordinances, resolutions, and others.
          </p>
        </div>

        {/* Footer */}
        <div className="bg-[#163a56] text-center text-sm py-2 w-full relative z-10">
          A project by ONE MARINDUQUE DILG - LRC
          
        </div>
      </div>

       {/* Right Section */}
       <div className="flex flex-col justify-center items-center bg-white relative w-full md:w-[60%] px-4">
        <div className="absolute top-0 right-0 w-[400px] opacity-50 z-0">
          <img src="/images/accent-1.svg" alt="Pattern" className="w-full h-auto" />
        </div>

        {/* Header */}
        <div className="relative text-center z-10">
          <h2 className="text-xl font-bold text-[#d12406e5]">LGU-Admin Login</h2>
          <p className="text-sm font-medium text-black mt-1">Login to your BLTS Profile</p>
        </div>

        {/* Form */}
        <div className="relative z-10 bg-white shadow-md p-6 rounded-lg w-full max-w-[350px] text-center mt-4">
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="mx-auto mb-4 w-40 h-auto"
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email or Username"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-[#ca1a07] to-[#e67e22] text-white py-2 rounded-full font-semibold hover:from-[#c0392b] hover:to-[#d35400] transition"
            >
              Login
            </button>
          </form>
          {error && (
            <div className="text-red-600 text-sm mt-3">{error}</div>
          )}
          <p className="text-sm mt-4 text-gray-700">
            Don&apos;t have an account?<br /> Contact DILG Marinduque
          </p>
        </div>
      </div>
    </div>
  );
};

export default LguAdminLogin;
