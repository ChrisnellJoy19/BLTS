import React, { useEffect, useState } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const ordinancesData = [
  { name: "Financial Administration and Sustainability", value: 6 },
  { name: "Disaster Preparedness", value: 4 },
  { name: "Environmental Management", value: 8 },
  { name: "Safety, Peace and Order", value: 6 },
];

const resolutionsData = [
  { name: "Financial Administration and Sustainability", value: 5 },
  { name: "Disaster Preparedness", value: 3 },
  { name: "Environmental Management", value: 7 },
  { name: "Safety, Peace and Order", value: 5 },
];

const COLORS = ["#FF5733", "#33FFCE", "#FFD133", "#A133FF"];

const renderLabel = ({ percent }) => `${(percent * 100).toFixed(1)}%`;

const Dashboard = () => {
  const [barangayName, setBarangayName] = useState("User");

  useEffect(() => {
    const fetchBarangayName = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const user = JSON.parse(atob(token.split(".")[1]));
        const barangayId = user.barangayId;

        if (!barangayId) {
          console.error("No barangay ID found in token");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/barangays/${barangayId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const barangayData = await response.json();
          setBarangayName(barangayData.name);
        } else {
          console.error("Failed to fetch barangay data");
        }
      } catch (error) {
        console.error("Error fetching barangay name:", error);
      }
    };

    fetchBarangayName();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-auto">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white relative">
        {/* Logo Section */}
        <div className="flex flex-wrap items-center gap-2 mb-6 ml-2 justify-center md:justify-start">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-10" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-60 md:w-72 mb-4 mx-auto md:mx-0" />
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left text-black">
          WELCOME, BARANGAY {barangayName.toUpperCase()}!
        </h1>

        {/* Charts Section */}
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-6">
          {/* Ordinances Chart (Now First) */}
          <div className="text-center w-full md:w-auto text-black">
            <h2 className="text-lg font-semibold mb-2">ORDINANCES</h2>
            <div className="flex justify-center">
              <PieChart width={300} height={250}>
                <Pie
                  data={ordinancesData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  label={renderLabel}
                  labelLine={false}
                >
                  {ordinancesData.map((entry, i) => (
                    <Cell key={`ord-cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(1)}%)`, name]} />
              </PieChart>
            </div>
          </div>

          {/* Resolutions Chart (Now Second) */}
          <div className="text-center w-full md:w-auto text-black">
            <h2 className="text-lg font-semibold mb-2">RESOLUTIONS</h2>
            <div className="flex justify-center">
              <PieChart width={300} height={250}>
                <Pie
                  data={resolutionsData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  label={renderLabel}
                  labelLine={false}
                >
                  {resolutionsData.map((entry, i) => (
                    <Cell key={`res-cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(1)}%)`, name]} />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Decorative Images */}
        <img src="/images/accent-1.svg" alt="Upper Right Decoration" className="absolute top-0 right-0 w-32 md:w-64 opacity-50" />
        <img src="/images/accent-3.svg" alt="Lower Left Decoration" className="absolute bottom-0 left-0 w-40 md:w-72 opacity-50" />
      </main>
    </div>
  );
};

export default Dashboard;
