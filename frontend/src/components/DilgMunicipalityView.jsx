import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const DilgMunicipalityView = () => {
  const { id } = useParams(); // Get municipality ID from route
  const [municipality, setMunicipality] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/municipalities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMunicipality(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;

  if (!municipality) return <div className="text-center text-xl">Municipality not found</div>;

  const ordinanceData = municipality.barangays.map((b) => ({
    name: b.name,
    value: b.ordinances,
  }));

  const resolutionData = municipality.barangays.map((b) => ({
    name: b.name,
    value: b.resolutions,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{municipality.name}</h1>
      <p className="text-lg text-center mb-6">{municipality.description}</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Ordinances Chart */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Ordinances</h2>
          <PieChart width={300} height={300}>
            <Pie data={ordinanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {ordinanceData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        
        {/* Resolutions Chart */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Resolutions</h2>
          <PieChart width={300} height={300}>
            <Pie data={resolutionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
              {resolutionData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Barangays List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-center">Barangays</h2>
        <ul className="border rounded-lg p-4 space-y-2">
          {municipality.barangays.map((barangay, index) => (
            <li key={index} className="bg-gray-100 p-2 rounded">
              <span className="font-semibold">{barangay.name}</span> - Ordinances: {barangay.ordinances}, Resolutions: {barangay.resolutions}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DilgMunicipalityView;
