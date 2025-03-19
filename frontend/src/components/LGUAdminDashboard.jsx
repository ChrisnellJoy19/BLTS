import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, LogOut, Edit, Settings, HelpCircle } from 'lucide-react';
import LguSidebar from './dashboard_components/LguSidebar';

const LguAdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [municipalities, setMunicipalities] = useState([]);
  const [municipalityName, setMunicipalityName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/LguAdminLogin');
      return;
    }

    // Fetch user information based on their token
    fetch('http://localhost:5000/api/lguadmins', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.municipality) {
          setMunicipalityName(data.municipality);
        } else {
          console.error('Failed to retrieve municipality information.');
        }
      })
      .catch(error => console.error('Error fetching user data:', error));
  }, [navigate]);

  useEffect(() => {
    fetch('http://localhost:5000/api/municipalities')
      .then(response => response.json())
      .then(data => setMunicipalities(data))
      .catch(error => console.error('Error fetching municipalities:', error));
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#889FB1] to-[#587D9D]">
      {/* Sidebar */}
      <LguSidebar />

      {/* Dashboard Content */}
      <div className="flex-grow flex flex-col p-6 overflow-auto">
        {/* Header */}
        <header className="flex items-left justify-left text-white py-1">
          <img src="/images/blts_logo.png" alt="BLTS Logo" className="h-40 mr-32" />
        </header>
        <header className="flex items-left justify-left text-black mb-4">
          <h1 className="text-xl font-bold">
            {municipalityName ? `WELCOME, ${municipalityName.toUpperCase()} LGU ADMIN!` : 'WELCOME, LGU ADMIN!'}
          </h1>
        </header>
        
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="flex justify-between items-center mb-6"></div>
          <div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default LguAdminDashboard;
