import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#889FB1] to-[#587D9D] flex flex-col text-white font-sans">
      
      {/* Navbar */}
      <nav className="w-full h-[90px] bg-[#183248] flex items-center justify-between px-5 fixed top-0 z-50">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img
            src="/images/dilg_logo.png"
            alt="DILG Logo"
            className="h-[70px]"
          />
          <span className="text-lg font-bold">DILG Marinduque</span>
        </div>

        {/* Nav Links */}
        <div className="flex gap-6 text-white font-semibold text-lg">
          <Link
            to="/userlogin"
            className="hover:bg-gradient-to-br from-[#889FB1] to-[#587D9D] px-3 py-1 rounded transition font-bold"
          >
            User
          </Link>
          <Link
            to="/dilgAdminLogin"
            className="hover:bg-gradient-to-br from-[#889FB1] to-[#587D9D] px-3 py-1 rounded transition font-bold"
          >
            Admin
          </Link>
          <Link
            to="/about"
            className="hover:bg-gradient-to-br from-[#889FB1] to-[#587D9D] px-3 py-1 rounded transition font-bold"
          >
            About Us
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 pt-5 md:pt-20 pb-20 flex-grow">
        {/* BLTS Logo */}
        <img
          src="/images/blts_logo.png"
          alt="BLTS Logo"
          className="w-[300px] md:w-[400px] lg:w-[500px] mb-3"
        />

        {/* Description */}
        <p className="max-w-3xl text-lg md:text-xl mb-8">
          Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances and resolutions.
        </p>

        {/* Get Started Button */}
        <Link
          to="/get-started"
          className="bg-[#183248] border border-white text-white px-8 py-3 text-xl rounded-full hover:bg-[#1E4A6F] transition"
        >
          Get Started
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-[#183248] w-full text-center py-2">
        <p className="text-white text-sm md:text-base">
          A project by ONE MARINDUQUE DILG - LRC
        </p>
      </footer>

    </div>
  );
};

export default Homepage;
