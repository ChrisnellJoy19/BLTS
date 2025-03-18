import React, { useState, useEffect } from 'react';
// import Sidebar from './dashboard_components/Sidebar';
// import Navbar from './dashboard_components/Navbar';
// import { motion } from 'framer-motion';
// import { Search, SlidersHorizontal, LogOut, Edit, Settings, HelpCircle } from 'lucide-react';
import "../styles/LGUAdminDashboard.css";

const LGUAdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [profileMenuOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-blue-50 transition-all relative">
      <Sidebar menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <div className={`flex-grow flex flex-col transition-all duration-500 ml-${menuOpen ? '64' : '16'}`}>
        <div className="sticky top-0 left-0 w-full z-50">
          <div className="bg-[#2d456e] p-2 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button aria-label="Toggle menu" onClick={toggleMenu} className="text-white text-xl">☰</button>
              <div className="flex space-x-2 ml-2">
                <img src="/images/dilg_logo.png" alt="DILG Logo" className="w-8 h-8 rounded-full" />
                <img src="/images/dilg_marinduque.png" alt="DILG Marinduque" className="w-8 h-8 rounded-full" />
                <img src="/images/lgrc_mimaropa.png" alt="LGRC Mimaropa" className="w-8 h-8 rounded-full" />
                <img src="/images/one_duque.png" alt="One Marinduque" className="w-8 h-8 rounded-full" />
              </div>
            </div>

            <div className="relative profile-menu-container">
              <img src="/images/dilg_logo.png" alt="Profile" className="w-10 h-10 rounded-full cursor-pointer" onClick={toggleProfileMenu} />
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden"
                >
                  <div className="p-4 border-b">
                    <p className="font-bold">DILG Marinduque</p>
                    <p className="text-sm text-gray-500">dilgmarinduque@gmail.com</p>
                  </div>
                  <div className="py-2">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Edit size={16} className="mr-2" /> Edit Profile</a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><Settings size={16} className="mr-2" /> Account Settings</a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><HelpCircle size={16} className="mr-2" /> Support</a>
                    <hr className="border-gray-200" />
                    <a href="/get-started" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><LogOut size={16} className="mr-2" />Sign Out</a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 space-y-6 flex flex-col items-center"
        >
          <div className="flex flex-col items-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-700">Barangay Legislative Tracking System</h1>
          </div>

          <div className="relative w-full max-w-2xl flex items-center">
            <div className="absolute left-3">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search something..."
              aria-label="Search"
              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-3 text-gray-500" aria-label="Sort or Filter">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LGUAdminDashboard;
