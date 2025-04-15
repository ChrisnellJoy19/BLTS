import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  const [municipalities, setMunicipalities] = useState([]);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/municipalities")
      .then((response) => response.json())
      .then((data) => setMunicipalities(data))
      .catch((error) => console.error("Error fetching municipalities:", error));
  }, []);

  const handleMunicipalityClick = (municipality) => {
    setSelectedMunicipality(municipality);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
      
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-4 py-3 bg-[#183248]">
        <div className="flex items-center gap-1">
          <img src="/images/dilg_logo.png" alt="DILG Logo" className="h-10 ml-1" />
          <span className="text-white font-bold text-lg">DILG Marinduque</span>
        </div>
        <div className="flex gap-4">
          <Link to="/userlogin" className="text-white font-bold text-base px-3 py-2 rounded hover:bg-gradient-to-r from-[#889FB1] to-[#587D9D] transition">User</Link>
          <Link to="/dilgAdminLogin" className="text-white font-bold text-base px-3 py-2 rounded hover:bg-gradient-to-r from-[#889FB1] to-[#587D9D] transition">Admin</Link>
          <Link to="/about" className="text-white font-bold text-base px-3 py-2 rounded hover:bg-gradient-to-r from-[#889FB1] to-[#587D9D] transition">About Us</Link>
        </div>
      </nav>

      {/* Home Button below navbar */}
      <div className="w-full flex justify-start px-2 mt-2">
        <Link to="/" className="flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition">
          <img src="/images/home-icon.png" alt="Home" className="h-4 w-4" />
          <span>Home</span>
        </Link>
      </div>

      {/* Description */}
      <div className="text-center mt-6 px-4">
        <img src="/images/blts_logo.png" alt="BLTS Logo" className="w-40 mx-auto" />
        <p className="max-w-xl mx-auto mt-4 text-sm sm:text-base">
          Barangay Legislative Tracking System (BLTS) is an online repository platform for archiving Barangay Legislative Records. Barangay Secretary uploads ordinances and resolutions.
        </p>
      </div>

      {/* Map and Lists */}
      <div className="flex flex-wrap justify-center items-start gap-8 mt-6 px-4">
        <iframe
          className="rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221569.83690051668!2d121.83084090324186!3d13.380381676842799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a318a5c1f65dbf%3A0xe9feb3ea5b6e3b7b!2sMarinduque!5e1!3m2!1sen!2sph!4v1741305863299!5m2!1sen!2sph"
          width="500"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Municipality List */}
          <ul className="bg-white text-black rounded-lg shadow-md w-72 p-4">
            {municipalities.map((municipality) => (
              <Link
                key={municipality._id}
                to={`/municipality/${municipality._id}`}
                className="flex items-center justify-center text-center font-bold bg-[#587D9D] text-white py-2 px-4 my-1 rounded cursor-pointer transition transform hover:bg-[#445F7A] hover:scale-105"
                onClick={() => handleMunicipalityClick(municipality)}
              >
                {municipality.name}
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto bg-[#183248] text-center text-sm py-2">
        A project by ONE MARINDUQUE DILG - LRC
      </footer>
    </div>
  );
};

export default GetStarted;
