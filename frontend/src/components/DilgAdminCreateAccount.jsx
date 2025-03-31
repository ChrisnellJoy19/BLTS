import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DilgAdmin = () => {
  const [formData, setFormData] = useState({
    municipality: "",
    barangay: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/municipalities");
        setMunicipalities(response.data);
      } catch (error) {
        console.error("Error fetching municipalities:", error);
      }
    };

    fetchMunicipalities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Left Section */}
      <div className="flex flex-col justify-between bg-gradient-to-b from-[#5a7d9a] to-[#5f7f9e] text-white min-w-[300px] w-full md:w-1/2 relative z-10">
        <div className="bg-[#1d3557] flex items-center justify-between px-5 py-4 text-sm font-bold w-full z-20">
          <span>DILG MARINDUQUE</span>
      <Link to="/DilgAdminDashboard">
            <img src="/images/home-icon.png" alt="Home" className="w-6 h-6 cursor-pointer" />
          </Link>
        </div>

        <p className="text-lg text-center px-6 py-4">
          The Barangay Legislative Tracking System (BLTS) is an online platform for archiving Barangay Legislative Records, where Barangay Secretaries can upload ordinances, resolutions, and other records.
        </p>

        <div className="bg-[#163a56] py-2 text-center text-sm z-10">
          A project by ONE MARINDUQUE DILG - LRC
        </div>

        <div className="absolute bottom-0 left-0 w-[500px] opacity-50">
          <img src="/images/accent-3.svg" alt="Decoration" className="w-full h-auto invert" />
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col items-center justify-center bg-white w-full lg:w-[60%] p-6">
        <div className="absolute top-0 right-0 w-[400px] opacity-50 z-0">
          <img src="/images/accent-1.svg" alt="Pattern" className="w-full h-auto" />
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-[#d12406e5] text-2xl font-bold mb-4">DILG-Create Account for BLTS Users</h2>
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="mx-auto max-w-[200px]" />
        </div>

        <div className="relative z-10 mt-6 w-full max-w-[350px] bg-white p-6 rounded-lg shadow-lg text-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Municipality Dropdown */}
            <select
              name="municipality"
              value={formData.municipality}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="" disabled>Select Municipality...</option>
              {municipalities.map((mun) => (
                <option key={mun._id} value={mun.name}>{mun.name}</option>
              ))}
            </select>

            {/* Barangay Dropdown */}
            <select
              name="barangay"
              value={formData.barangay}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
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
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {/* Confirm Password Input */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-[#ca1a07] to-[#e67e22] text-white font-medium py-2 rounded-full hover:from-[#c0392b] hover:to-[#d35400] transition-all"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DilgAdmin;
