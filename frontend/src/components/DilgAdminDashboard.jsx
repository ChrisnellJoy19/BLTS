import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DilgSidebar from "./dashboard_components/DilgSidebar"; 

const DilgAdminDashboard = () => {
  const [municipalities, setMunicipalities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/municipalities") 
      .then((response) => response.json())
      .then((data) => setMunicipalities(data))
      .catch((error) => console.error("Error fetching municipalities:", error));
  }, []);

  return (
    <div className="flex w-screen h-screen bg-gradient-to-r from-[#889FB1] to-[#587D9D]">
      {/* Sidebar */}
      <div className="h-full">
        <DilgSidebar />
      </div>

      {/* Dashboard Content */}
      <div className="flex-grow flex flex-col p-6 overflow-auto">
        {/* Header */}
        <header className="flex items-left justify-left text-white py-1">
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="h-40 mr-32" />
        </header>
        <header className="flex items-left justify-left text-black">
          <h1 className="text-xl font-bold">WELCOME, DILG ADMIN!</h1>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          {/* Embedded Google Map */}
          <div className="w-full md:w-1/2">
            <iframe
              className="w-full h-[400px] rounded-lg shadow-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221569.83690051668!2d121.83084090324186!3d13.380381676842799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a318a5c1f65dbf%3A0xe9feb3ea5b6e3b7b!2sMarinduque!5e1!3m2!1sen!2sph!4v1741305863299!5m2!1sen!2sph"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Municipality List */}
          <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Municipalities</h2>
            <ul className="space-y-2">
            {municipalities.map((municipality) => (
            <Link
            key={municipality._id}
            to={`/municipality/${municipality._id}`}
            className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-200 transition"
            >
            {municipality.name}
            </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminDashboard;
