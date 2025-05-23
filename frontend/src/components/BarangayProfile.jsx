import React, { useEffect, useState } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import { Link } from "react-router-dom";

const BarangayProfile = () => {
  const [barangay, setBarangay] = useState(null);
  const [municipalityName, setMunicipalityName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarangayAndMunicipality = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        // Decode the token to get user details
        const user = JSON.parse(atob(token.split(".")[1]));
        const barangayId = user.barangayId;

        if (!barangayId) {
          console.error("No barangay ID found in token");
          return;
        }

        // Fetch Barangay Data
        const barangayResponse = await fetch(`http://${window.location.hostname}:5000/api/barangays/${barangayId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });        

        if (barangayResponse.ok) {
          const barangayData = await barangayResponse.json();
          setBarangay(barangayData);

          // Fetch Municipality Data using municipalityId
          const municipalityResponse = await fetch(
            `http://${window.location.hostname}:5000/api/municipalities/${barangayData.municipalityId}`
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

    fetchBarangayAndMunicipality();
  }, []);

  if (loading) return <p className="text-center mt-6 text-white">Loading barangay data...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
        <div className="flex flex-wrap items-center gap-2 sm:gap-1">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8 sm:h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8 sm:h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8 sm:h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8 sm:h-10" />
        </div>

        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 sm:w-72 mt-4" />

        <div className="flex flex-col items-end space-y-2 mt-4 mr-2 md:mr-20">
          <Link to="/edit-profile" className="bg-[#0c3968] text-white text-sm px-4 py-2 rounded-md hover:bg-[#4d7fb4]">
            Edit Profile
          </Link>
        </div>

        {barangay && (
          <div className="bg-white text-black text-lg rounded-lg shadow-md p-4 mt-6 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center min-h-[300px]">
          <div className="flex-shrink-0 mb-4 sm:mb-0">
          <img
            src={barangay.file ? `http://${window.location.hostname}:5000${barangay.file}` : '/default-logo.png'}
            alt="barangay-logo"
            className="ml-10 w-40 h-40 rounded-full border"
          />

            </div>
            <div className="flex-1 px-6 ml-10 text-center sm:text-left">
              <h2 className="text-lg font-bold">🏠 BARANGAY {barangay.name.toUpperCase()}</h2>
              <p>{municipalityName}, Marinduque</p>
              <h3 className="font-bold">{barangay.adminProfiles[0]?.punongBarangay}</h3>
              <p>Punong Barangay</p>
              <h3 className="font-bold">{barangay.adminProfiles[0]?.barangaySecretary}</h3>
              <p>Barangay Secretary</p>
              <h3 className="font-bold">{barangay.adminProfiles[0]?.sangguniangKabataan}</h3>
              <p>SK Chairperson</p>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-lg font-bold">📅 {barangay.adminProfiles[0]?.startYear} - {barangay.adminProfiles[0]?.endYear}</h4>
              <p className="text-lg">Administrative Year / Term Year</p>
              <ul className="list-none mt-2 text-lg font-bold">
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

export default BarangayProfile;
