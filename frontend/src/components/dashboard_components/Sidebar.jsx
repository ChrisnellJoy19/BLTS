import React from 'react';
import { Grid, Calendar, User, FileText, Clipboard, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ menuOpen, toggleMenu }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <Grid />, href: '#' },
    { name: 'Calendar', icon: <Calendar />, href: '#' },
    { name: 'User Profile', icon: <User />, href: '#' },
    { name: 'Tasks', icon: <FileText />, href: '#' },
    { name: 'Clipboard', icon: <Clipboard />, href: '#' },
    { name: 'Messages', icon: <MessageSquare />, href: '#' },
  ];

  return (
    <motion.aside
      initial={{ width: '4rem' }}
      animate={{ width: menuOpen ? '16rem' : '4rem' }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg flex flex-col h-full py-4 fixed"
    >
      <div className="flex flex-col items-center space-y-6 mt-6">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={toggleMenu}
            className={`flex items-center w-full px-4 py-2 transition-all 
                        ${menuOpen ? 'justify-start' : 'justify-center'} 
                        hover:bg-blue-100 rounded-lg text-gray-700`}
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
