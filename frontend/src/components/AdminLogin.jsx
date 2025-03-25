import React from "react";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#889FB1] to-[#587D9D] relative overflow-hidden font-sans">
      {/* Top Bar */}
      <div className="absolute top-0 w-full h-[90px] bg-[#183248]"></div>

      {/* Navigation */}
      <nav className="absolute top-[5px] w-[95%] h-[80px] flex justify-between items-center px-7">
        <div className="flex items-center gap-4">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="w-[70px] h-[70px]" />
          <span className="text-white text-lg font-medium">DILG Marinduque</span>
        </div>
        <div className="flex gap-10 items-center">
          <Link to="/homepage" className="w-[30px] h-[30px]">
            <img src="/images/home-icon.png" alt="Go to Homepage" />
          </Link>
          <Link
            to="/about"
            className="text-white text-lg font-medium hover:bg-gradient-to-br from-[#889FB1] to-[#587D9D] transition-colors px-3 py-2 rounded-md"
          >
            About Us
          </Link>
        </div>
      </nav>
     
<div className="pt-20 flex flex-col md:flex-row items-center justify-center w-full px-5 mt-10 md:mt-10">
  {/* BLTS Logo */}
  <div className="flex items-center justify-start px-4 md:px-12 lg:px-10 mt-6">
  <img
      src="/images/blts_logo.png"
      alt="BLTS Logo"
      className="w-[200px] md:w-[300px] lg:w-[400px] h-auto"
    />
  </div>

  {/* Text Section */}
  <div className="ml-4 text-white text-sm md:text-base lg:text-lg max-w-md text-center">
    <p>
      Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances, resolutions and others.
    </p>
  </div>
</div>


      {/* Login As Text */}
      <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold italic text-[25px] text-black w-[40%] max-w-[962px]">
        <p>Login As:</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-20 mt-[200px]">
        <Link
          to="/DilgAdminLogin"
          className="w-[150px] h-[50px] bg-[#183248] border border-white rounded-full flex items-center justify-center text-white font-bold text-[20px] hover:bg-gradient-to-br from-[#889FB1] to-[#587D9D] transition-colors"
        >
          DILG
        </Link>
        <Link
          to="/LguAdminLogin"
          className="w-[150px] h-[50px] bg-[#183248] border border-white rounded-full flex items-center justify-center text-white font-bold text-[20px] hover:bg-gradient-to-br from-[#889FB1] to-[#587D9D] transition-colors"
        >
          LGU
        </Link>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full h-[45px] bg-[#183248] flex items-center justify-center">
        <p className="text-white text-[18px]">A project by ONE MARINDUQUE DILG - LRC</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
