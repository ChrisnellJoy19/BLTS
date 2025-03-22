import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import LguSidebar from './dashboard_components/LguSidebar';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LguAdminDashboard = () => {
  const [municipalityName, setMunicipalityName] = useState('');
  const [barangays, setBarangays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/LguAdminLogin');
      return;
    }

    const fetchMunicipalityAndBarangays = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lguadmin', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();

        if (data && data.municipality) {
          setMunicipalityName(data.municipality.name);

          const barangayResponse = await fetch(`http://localhost:5000/api/municipalities/${data.municipality._id}/barangays`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });

          const barangayData = await barangayResponse.json();
          setBarangays(barangayData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMunicipalityAndBarangays();
  }, [navigate]);

  const ordinanceData = barangays.map(barangay => ({ name: barangay.name, value: barangay.ordinancesCount || 0 }));
  const resolutionData = barangays.map(barangay => ({ name: barangay.name, value: barangay.resolutionsCount || 0 }));
  
  return (
    <div className="flex h-screen bg-gradient-to-r from-[#889FB1] to-[#587D9D]">
      <LguSidebar />

      <div className="flex-grow flex flex-col p-6 overflow-auto">
        <header className="flex items-left justify-left text-white py-1">
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="h-40 mr-32" />
        </header>

        <header className="flex items-left justify-left text-black mb-4">
          <h1 className="text-xl font-bold">
            {municipalityName ? `WELCOME, ${municipalityName.toUpperCase()} LGU ADMIN!` : 'WELCOME, LGU ADMIN!'}
          </h1>
        </header>

        <div className="flex justify-between gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-md w-1/2">
            <h2 className="text-center font-bold mb-4">Ordinances Per Barangay</h2>
            {ordinanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={ordinanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {ordinanceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No data available for ordinances.</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md w-1/2">
            <h2 className="text-center font-bold mb-4">Resolutions Per Barangay</h2>
            {resolutionData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={resolutionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                    {resolutionData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500">No data available for resolutions.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
          <h2 className="text-center font-bold mb-4">List of Barangays</h2>
          <ul className="list-disc ml-6">
            {barangays.length > 0 ? (
              barangays.map((barangay, index) => (
                <li key={index}>
                  {barangay.name} - Ordinances: {barangay.ordinancesCount || 0}, Resolutions: {barangay.resolutionsCount || 0}
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No barangays found.</p>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default LguAdminDashboard;
