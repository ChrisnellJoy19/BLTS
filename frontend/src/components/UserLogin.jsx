import React, { useState } from "react"; // ✅ Import useState
import { Link } from "react-router-dom";
import axios from "axios"; // ✅ Import axios
import { Eye, EyeOff } from "lucide-react";

const UserLogin = () => {
  const [identifier, setIdentifier] = useState(""); // ✅ Fix field name
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        identifier, // ✅ Match backend field
        password,
      });

      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // ✅ Store user info
        alert("Login successful!");
        window.location.href = "/user-dashboard";
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

const [showPassword, setShowPassword] = useState(false);

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
          <img src="/images/home-icon.png" alt="Home" className="w-6 h-6 cursor-pointer" />
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
          A project by ONE MARINDUQUE DILG - LGRC
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center bg-white relative w-full md:w-[60%] px-4">
        <div className="absolute top-0 right-0 w-[400px] opacity-50 z-0">
          <img src="/images/accent-1.svg" alt="Pattern" className="w-full h-auto" />
        </div>

        <div className="relative z-10 text-center mb-6">
          <h2 className="text-[25px] font-bold text-red-700 mb-1">User-Login Account</h2>
          <p className="text-sm font-semibold text-black">Login your BLTS Profile</p>
        </div>

        {/* Login Form */}
        <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg w-full max-w-[350px] text-center">
          <img
            src="/images/blts_logo.png"
            alt="BLTS Logo"
            className="w-full max-w-[200px] mx-auto mb-4"
          />
          <form className="user-login-form" onSubmit={handleSubmit}>
            {/* Username / Email Field */}
            <div className="relative w-[90%] mx-3 my-2">
              <input
                type="text"
                placeholder="Username or Email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-sm pr-10"
              />
            </div>

            {/* Password Field */}
            <div className="relative w-[90%] mx-3 my-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md text-sm pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>


            <button
              type="submit"
              className="w-[90%] bg-gradient-to-r from-[#ca1a07] to-[#e67e22] text-white py-2 text-base rounded-full mt-4 hover:from-[#c0392b] hover:to-[#d35400] transition"
            >
              Login
            </button>
          </form>

          {/* ✅ Show messages */}
          {error && <p className="error-message">{error}</p>}

          <div className="text-sm text-gray-700 mt-4">Don't have an account?</div>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=marinduque.dilg.po@gmail.com&su=BLTS%20Account%20Request&body=Hello%20DILG%20Marinduque%2C%0D%0A%0D%0AI%20would%20like%20to%20request%20an%20account%20for%20the%20Barangay%20Legislative%20Tracking%20System.%0D%0A%0D%0AMunicipality%3A%20%0D%0ABarangay%3A%20%0D%0AName%20of%20Secretary%3A%20%0D%0ABarangay%20Email%3A%20%0D%0A%0D%0AThank%20you!"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline cursor-pointer"
          >
            Click here to contact DILG Marinduque
          </a>
          <p className="text-sm text-center mt-2">
            <a href="/UserForgotPassword" className="text-black-200 hover:underline cursor-pointer">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
