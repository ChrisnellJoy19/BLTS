import React from 'react';
import { Grid, Calendar, User, FileText, Clipboard, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ menuOpen, toggleMenu }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <Grid className="text-white" />, href: '#' },
    { name: 'Calendar', icon: <Calendar className="text-white" />, href: '#' },
    { name: 'User Profile', icon: <User className="text-white" />, href: '#' },
    { name: 'Tasks', icon: <FileText className="text-white" />, href: '#' },
    { name: 'Clipboard', icon: <Clipboard className="text-white" />, href: '#' },
    { name: 'Messages', icon: <MessageSquare className="text-white" />, href: '#' },
  ];

  return (
    <motion.aside
      initial={{ width: '4rem' }}
      animate={{ width: menuOpen ? '16rem' : '4rem' }}
      transition={{ duration: 0.5 }}
      className="bg-[#2d456e] shadow-lg flex flex-col h-full py-4 fixed"
    >
      <div className="flex items-center justify-between px-4">
        <img
          src="/images/logo.png"
          alt="Municipal Logo"
          className={`w-12 h-12 ${menuOpen ? 'mb-2' : ''} transition-all`}
        />
        {menuOpen && (
          <div className="text-center transition-all text-white">
            <h1 className="text-lg font-bold">Barangay</h1>
            <p className="text-sm">District, Marinduque</p>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mt-10 space-y-4">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={toggleMenu}
            className={`flex items-center w-full px-4 py-2 transition-all 
                        ${menuOpen ? 'justify-start' : 'justify-center'} 
                        hover:bg-blue-700 rounded-lg text-white`}
          >
            <span className="mr-3">{item.icon}</span>
            {menuOpen && <span>{item.name}</span>}
          </a>
        ))}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
