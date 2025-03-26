import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DilgSidebar from "./dashboard_components/DilgSidebar"; 

const DilgAdminDashboard = () => {
  const [municipalities, setMunicipalities] = useState([]);
  const [barangays, setBarangays] = useState([]); // Store barangays
  const [selectedBarangay, setSelectedBarangay] = useState(""); // To hold the selected barangay
  const [announcement, setAnnouncement] = useState(""); // To hold the announcement text

  useEffect(() => {
    fetch("http://localhost:5000/api/municipalities") 
      .then((response) => response.json())
      .then((data) => setMunicipalities(data))
      .catch((error) => console.error("Error fetching municipalities:", error));

    fetch("http://localhost:5000/api/barangays") // Fetch barangays
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
    fetch("http://localhost:5000/api/announcements", {
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
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="h-40 mr-32" />
        </header>
        <header className="flex items-left justify-left text-black">
          <h1 className="text-xl font-bold">WELCOME, DILG ADMIN!</h1>
        </header>

        {/* Announcement Section */}
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Post an Announcement</h2>

          {/* Announcement Input */}
          <textarea
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your announcement here"
            rows="4"
          ></textarea>

          {/* Select Barangay */}
          <div className="mt-4">
            <label className="block font-medium mb-1">Select Barangay:</label>
            <select
              value={selectedBarangay}
              onChange={(e) => setSelectedBarangay(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="" disabled>
                -- Select a Barangay --
              </option>
              <option value="all">All Barangays</option>
              {barangays.map((barangay) => (
                <option key={barangay._id} value={barangay._id}>
                  {barangay.name}
                </option>
              ))}
            </select>
          </div>

          {/* Post Announcement Button */}
          <button
            onClick={handlePostAnnouncement}
            className="mt-4 bg-[#587D9D] text-white py-2 px-4 rounded-md hover:bg-[#445F7A]"
          >
            Post Announcement
          </button>
        </div>
      </div>
    </div>
  );
};

export default DilgAdminDashboard;
