import React, { useState, useEffect } from 'react';
import Sidebar from './dashboard_components/Sidebar';
import Navbar from './dashboard_components/Navbar';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex h-screen bg-blue-50 transition-all">
      <Sidebar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <div className={`flex-grow flex flex-col ${menuOpen ? 'pl-64' : 'pl-20'} transition-all duration-500`}>
        <Navbar toggleDarkMode={toggleDarkMode} toggleMenu={toggleMenu} />
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 space-y-6"
        >
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Dashboard Content</h1>
            <p className="text-gray-700">
              This is where you can manage your ordinances and resolutions.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
