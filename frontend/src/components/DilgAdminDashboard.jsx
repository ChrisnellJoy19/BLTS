import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DilgSidebar from "./dashboard_components/DilgSidebar"; 

const DilgAdminDashboard = () => {
  const [municipalities, setMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]); // Store barangays
  const [selectedBarangay, setSelectedBarangay] = useState(""); // To hold the selected barangay
  const [announcement, setAnnouncement] = useState(""); // To hold the announcement text

  useEffect(() => {
    fetch(`http://${window.location.hostname}:5000/api/municipalities`)
      .then((response) => response.json())
      .then((data) => setMunicipalities(data))
      .catch((error) => console.error("Error fetching municipalities:", error));
  
    fetch(`http://${window.location.hostname}:5000/api/barangays`) // Fetch barangays
      .then((response) => response.json())
      .then((data) => setBarangays(data))
      .catch((error) => console.error("Error fetching barangays:", error));
  }, []);
  

  const handlePostAnnouncement = () => {
    const payload = {
      announcement: announcement,
      barangayId: selectedBarangay === "all" ? "all" : selectedBarangay
    };

    // Post the announcement (example API request)
    fetch(`http://${window.location.hostname}:5000/api/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Announcement posted successfully:", data);
        setAnnouncement(""); // Clear the announcement field after posting
        setSelectedBarangay(""); // Reset barangay selection
      })
      .catch((error) => console.error("Error posting announcement:", error));
    
  };

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
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="max-h-32 w-auto mr-8" />
        </header>
        <header className="flex items-left justify-left text-black">
          <h1 className="text-xl font-bold">WELCOME, DILG ADMIN!</h1>
        </header>

        <div className="flex flex-wrap justify-center items-start gap-8 mt-6 px-4">
        <iframe
          className="rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221569.83690051668!2d121.83084090324186!3d13.380381676842799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a318a5c1f65dbf%3A0xe9feb3ea5b6e3b7b!2sMarinduque!5e1!3m2!1sen!2sph!4v1741305863299!5m2!1sen!2sph"
          width="1200"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminDashboard;
