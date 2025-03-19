import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./dashboard_components/DilgSidebar";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChevronRight, Scissors } from "lucide-react";

const COLORS = ["#FF5733", "#33FFCE", "#FFD133", "#A133FF"];

const DilgMunicipalityView = () => {
  const { id } = useParams();
  const [municipality, setMunicipality] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Municipality ID:", id);

    const fetchMunicipalityData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/municipalities/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log("Fetched Data:", data);
        setMunicipality(data);
      } catch (err) {
        console.error("Error fetching municipality data:", err);
        setError(err.message);
      }
    };

    fetchMunicipalityData();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!municipality) return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        {/* Municipality Name and Description */}
        <h1 className="text-4xl font-bold text-blue-600">{municipality.name}</h1>
        <p className="text-lg text-gray-700 mt-2">{municipality.description}</p>

        {/* Charts Section */}
        <div className="flex space-x-10 mt-6">
          {/* Resolutions Chart */}
          <div>
            <h2 className="text-xl font-semibold text-center">Resolutions</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={municipality.barangays.map(b => ({ name: b.name, value: b.resolutions }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {municipality.barangays.map((entry, index) => (
                  <Cell key={`res-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Ordinances Chart */}
          <div>
            <h2 className="text-xl font-semibold text-center">Ordinances</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={municipality.barangays.map(b => ({ name: b.name, value: b.ordinances }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {municipality.barangays.map((entry, index) => (
                  <Cell key={`ord-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Barangay List with Buttons */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Barangays</h2>
          <div className="mt-4 space-y-2">
            {municipality.barangays.map((barangay) => (
              <button
                key={barangay._id}
                className="flex items-center justify-between w-full p-4 border rounded-lg shadow-md bg-white hover:bg-gray-100 transition"
              >
                <div className="flex items-center space-x-3">
                  <Scissors className="text-gray-600" size={20} />
                  <span className="text-lg font-medium">{barangay.name}</span>
                </div>
                <ChevronRight className="text-gray-600" size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DilgMunicipalityView;