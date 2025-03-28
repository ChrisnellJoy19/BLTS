import React, { useEffect, useState } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [barangay, setBarangay] = useState(null);
  const [municipalityName, setMunicipalityName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarangayData = async () => {
      try {
        const barangayId = "67e512242f9e47978a4e8564"; 
        const response = await fetch(`http://localhost:5000/api/barangays/${barangayId}`);

        if (response.ok) {
          const barangayData = await response.json();
          setBarangay(barangayData);

          // Fetch Municipality Name using municipalityId
          const municipalityResponse = await fetch(
            `http://localhost:5000/api/municipalities/${barangayData.municipalityId}`
          );

          if (municipalityResponse.ok) {
            const municipalityData = await municipalityResponse.json();
            setMunicipalityName(municipalityData.name);
          } else {
            console.error("Failed to fetch municipality data");
          }
        } else {
          console.error("Failed to fetch barangay data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarangayData();
  }, []);

  if (loading) return <p className="text-center mt-6 text-white">Loading barangay data...</p>;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
        <div className="flex flex-wrap items-center gap-2 sm:gap-5">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8 sm:h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8 sm:h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8 sm:h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8 sm:h-10" />
        </div>

        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 sm:w-72 mt-4" />

        <div className="flex flex-col items-end space-y-2 mt-4 mr-2 md:mr-20">
          <Link to="/add-new-admin" className="bg-[#0c3968] text-white text-sm px-4 py-2 rounded-md hover:bg-[#4d7fb4]">
            + Add New Administrative Profile
          </Link>
          <Link to="/add-new-profile" className="bg-[#0c3968] text-white text-sm px-4 py-2 rounded-md hover:bg-[#4d7fb4]">
            Edit Profile
          </Link>
        </div>

        {barangay && (
          <div className="bg-white text-black rounded-lg shadow-md p-4 mt-6 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center">
            <div className="flex-shrink-0">
              <img src="/images/barangay_logo.png" alt="barangay-logo" className="ml-20 w-24 h-24 rounded-full" />
            </div>
            <div className="flex-1 text-left px-6 ml-10">
              <h2 className="text-lg font-bold">🏠 {barangay.name.toUpperCase()}</h2>
              <p>{municipalityName}, Marinduque</p>
              <h3 className="font-bold">{barangay.adminProfiles[0]?.punongBarangay}</h3>
              <p>Punong Barangay</p>
              <h3 className="font-bold">{barangay.adminProfiles[0]?.barangaySecretary}</h3>
              <p>Barangay Secretary</p>
              <h3 className="font-bold">{barangay.adminProfiles[0]?.sangguniangKabataan}</h3>
              <p>Sangguniang Kabataan</p>
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-lg font-bold">📅 {barangay.adminProfiles[0]?.startYear} - {barangay.adminProfiles[0]?.endYear}</h4>
              <p className="text-sm">Administrative Year / Term Year</p>
              <ul className="list-none mt-2 text-sm">
                {barangay.adminProfiles[0]?.sangguniangBarangayMembers?.map((member, index) => (
                  <li key={index}>{index + 1}. Hon. {member}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
