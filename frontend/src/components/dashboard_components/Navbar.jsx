import React, { useState } from 'react';
import { Sun, Moon, User, LogOut, Settings, HelpCircle, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = ({ toggleDarkMode, toggleMenu }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between p-4 bg-white text-blue-900 shadow-md"
    >
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 transition"
      >
        ☰
      </button>

      <div className="flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-blue-100 text-blue-900 hover:bg-blue-200 transition"
        >
          {document.documentElement.classList.contains('dark') ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button onClick={toggleProfileMenu} className="flex items-center space-x-2">
            <img
              src="https://i.pravatar.cc/30"
              alt="User Avatar"
              className="w-8 h-8 rounded-full"
            />
            <span>Musharof</span>
          </button>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <div className="p-4 border-b">
                <p className="font-bold">Musharof Chowdhury</p>
                <p className="text-sm text-gray-500">randomuser@pimjo.com</p>
              </div>
              <div className="py-2">
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Edit size={16} className="mr-2" /> Edit Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings size={16} className="mr-2" /> Account Settings
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <HelpCircle size={16} className="mr-2" /> Support
                </a>
                <hr className="border-gray-200" />
                <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  <LogOut size={16} className="mr-2" /> Sign Out
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
