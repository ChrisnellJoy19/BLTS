import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DilgSidebar from "./dashboard_components/DilgSidebar"; 
import "../styles/DilgBarangayView.css";
import barangays from "../data/barangays";


const DilgBarangayView = () => {
  const { municipalityId, barangayId } = useParams(); // Get IDs from URL
  const [barangay, setBarangay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ordinances");

  console.log("Municipality ID:", municipalityId);
  console.log("Barangay ID:", barangayId);

  // useEffect(() => {
  //   // Fetch barangay data from backend
  //   fetch(`http://localhost:5000/api/municipalities/${municipalityId}/barangays/${barangayId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setBarangay(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching barangay:", error);
  //       setLoading(false);
  //     });
  // }, [municipalityId, barangayId]);

  useEffect(() => {
    const foundBarangay = barangays.find(
      (b) => b._id === barangayId && b.municipalityId === municipalityId
    );
  
    if (foundBarangay) {
      setBarangay(foundBarangay);
    }
    setLoading(false);
  }, [municipalityId, barangayId]);
  

  if (loading) return <p>Loading...</p>;
  if (!barangay) return <p>Barangay not found.</p>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="h-full">
        <DilgSidebar />
      </div>
      

      <div className="flex-1 p-6 bg-gray-100">
        {/* Header */}
        <img src="/images/blts_logo.png" alt="BLTS Logo" className="h-15" />
        <div className="flex items-center space-x-4">
          <img src="/images/dilg_logo.png" alt="DILG Logo" className="w-16 h-16" />
          <h2 className="text-2xl font-bold">{barangay.name}</h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-4 mt-4">
          <button 
            className={`px-4 py-2 rounded ${activeTab === "ordinances" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveTab("ordinances")}
          >
            Ordinances
          </button>
          <button 
            className={`px-4 py-2 rounded ${activeTab === "resolutions" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveTab("resolutions")}
          >
            Resolutions
          </button>
        </div>

        {/* Ordinances or Resolutions List */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          {activeTab === "ordinances" ? (
            <ul className="space-y-2">
              {barangay.ordinances.length > 0 ? (
                barangay.ordinances.map((item, index) => (
                  <li key={index} className="p-2 border rounded flex items-center space-x-2">
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <p>No ordinances available.</p>
              )}
            </ul>
          ) : (
            <ul className="space-y-2">
              {barangay.resolutions.length > 0 ? (
                barangay.resolutions.map((item, index) => (
                  <li key={index} className="p-2 border rounded flex items-center space-x-2">
                    <span>{item}</span>
                  </li>
                ))
              ) : (
                <p>No resolutions available.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DilgBarangayView;
