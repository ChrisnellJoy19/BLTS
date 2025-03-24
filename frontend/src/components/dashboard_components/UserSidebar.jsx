import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation(); // Get current path

  // Function to handle clicks for refreshing the page
  const handleClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault(); // Prevent navigation
      window.location.reload(); // Force refresh
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidelogo">
        <img src="/images/dilg_logo.png" alt="dilg-logo" className="dilglogo" />
        <div className="barangay">Barangay, Municipality, Province</div>
      </div>

      <nav className="menu">
        <Link to="/user-dashboard" className="menu-item" onClick={(e) => handleClick(e, "/user-dashboard")}>
          <Home size={20} /> Dashboard
        </Link>
        <Link to="/user-ordinances" className="menu-item" onClick={(e) => handleClick(e, "/user-ordinances")}>
          <FileText size={20} /> Ordinances
        </Link>
        <Link to="/user-resolutions" className="menu-item" onClick={(e) => handleClick(e, "/user-resolutions")}>
          <FileText size={20} /> Resolutions
        </Link>
        <Link to="/user-profile" className="menu-item" onClick={(e) => handleClick(e, "/user-profile")}>
          <Settings size={20} /> User Profile
        </Link>
        <Link to="/" className="menu-item logout" onClick={(e) => handleClick(e, "/")}>
          <LogOut size={20} /> Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
