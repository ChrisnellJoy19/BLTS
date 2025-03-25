import React from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col justify-between bg-gradient-to-b from-[#5a7d9a] to-[#5f7f9e] text-white min-w-[300px] w-full md:w-1/2 relative z-10">
      {/* Header */}
      <div className="bg-[#1d3557] flex items-center justify-between px-5 py-4 text-sm font-bold w-full z-20">
        <span>DILG MARINDUQUE</span>
        <Link
          to="/homepage"
          className="flex items-center gap-2 text-white bg-[#163a56] px-3 py-1 rounded-md shadow hover:bg-[#5f7f9e] transition"
        >
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
      <div className="relative flex flex-col items-center justify-center bg-white w-full md:w-2/3 h-full px-6 py-10 z-10">
        {/* Pattern Image */}
        <div className="absolute top-0 right-0 w-[400px] opacity-70 z-0">
          <img src="/images/accent-1.svg" alt="Pattern" className="w-full h-auto" />
        </div>

        {/* Header Text */}
        <div className="relative z-10 text-center mb-6">
          <h2 className="text-2xl font-bold text-[#d12406e5] mb-2">User-Login Account</h2>
          <p className="text-sm font-semibold text-black">Login your BLTS Profile</p>
        </div>

        {/* Login Box */}
        <div className="relative z-10 bg-white shadow-md rounded-lg p-6 w-full max-w-[350px] flex flex-col items-center text-center">
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="w-[200px] mb-4" />

          <form className="flex flex-col items-center w-full">
            <input
              type="email"
              placeholder="Email"
              required
              className="w-11/12 p-2 mb-3 border border-gray-300 rounded-md text-sm"
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-11/12 p-2 mb-4 border border-gray-300 rounded-md text-sm"
            />
            <Link to="/user-dashboard" className="w-11/12">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ca1a07] to-[#e67e22] text-white py-2 rounded-full text-base hover:from-[#c0392b] hover:to-[#d35400] transition"
              >
                Login
              </button>
            </Link>
          </form>

          <div className="text-sm text-gray-700 mt-4">
            Don't have an account?<br /> Contact DILG Marinduque
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
