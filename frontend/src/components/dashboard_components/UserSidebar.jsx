import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, Settings, LogOut, Menu } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div className="md:w-1/5 w-full bg-[#183248] text-white p-5 flex md:flex-col flex-row md:relative fixed top-0 left-0 right-0 z-50">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={28} />
      </button>

      {/* Sidebar Content */}
      <div className={`md:flex flex-col md:w-full w-full ${isOpen ? "flex" : "hidden"} md:flex`}>
        <div className="flex flex-col items-center text-center mt-4">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="w-24 h-24" />
          <div className="text-lg mt-2">Barangay, Municipality, Province</div>
        </div>

        <nav className="mt-6 flex md:flex-col flex-row justify-around w-full">
          <Link
            to="/user-dashboard"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-dashboard")}
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            to="/user-ordinances"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-ordinances")}
          >
            <FileText size={20} /> Ordinances
          </Link>
          <Link
            to="/user-resolutions"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-resolutions")}
          >
            <FileText size={20} /> Resolutions
          </Link>
          <Link
            to="/user-profile"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-profile")}
          >
            <Settings size={20} /> User Profile
          </Link>
          <button
            className="flex items-center gap-2 p-3 hover:bg-red-600 rounded mt-auto w-full text-left"
            onClick={handleLogout}
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
