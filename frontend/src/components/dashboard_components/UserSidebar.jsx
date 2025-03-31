import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, User, LogOut, Settings } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For small screens only

  const [barangayName, setBarangayName] = useState("");
  const [municipalityName, setMunicipalityName] = useState("");
  const [barangayLogo, setBarangayLogo] = useState("");

  useEffect(() => {
    // Simulate fetching user location from localStorage or backend
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    const { barangay, municipality, barangayLogo } = userData;

    setBarangayName(barangay || "");
    setMunicipalityName(municipality || "");
    setBarangayLogo(barangayLogo || "/images/barangay_logo_placeholder.png");
  }, []);

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
    <>
      {/* Toggle Button (only on small screens) */}
      <button
        className="md:hidden fixed top-4 right-5 z-50 bg-[#183248] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#587D9D]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      {/* Sidebar (Responsive) */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#183248] text-white p-5 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:block
        `}
      >
        <div className="flex flex-col items-center text-center mt-4">
          <img
            src={barangayLogo}
            alt="barangay-logo"
            className="w-24 h-24 rounded-full border-4 border-white"
            />
          <div className="text-lg mt-2">
            {barangayName && municipalityName
              ? `Barangay ${barangayName}, Municipality ${municipalityName}, Marinduque`
              : "Loading..."}
          </div>
        </div>

        <nav className="mt-6 flex flex-col space-y-2">
          <Link
            to="/user-dashboard"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-dashboard")}
          >
            <Home className="w-5 h-5" /> <span>Dashboard</span>
          </Link>
          <Link
            to="/user-ordinances"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-ordinances")}
          >
            <FileText className="w-5 h-5" /> <span>Ordinances</span>
          </Link>
          <Link
            to="/user-resolutions"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-resolutions")}
          >
            <FileText className="w-5 h-5" /> <span>Resolutions</span>
          </Link>
          <Link
            to="/barangay-profile"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/barangay-profile")}
          >
{/* HEAD */}
            <User className="w-5 h-5" /> <span>User Profile</span>
          </Link>
          <Link
            to="/edit-credentials"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
          >
            <Settings className="w-5 h-5" /> <span>Account Settings</span>

            <Settings className="w-5 h-5" /> <span>Barangay Profile</span>
{/* 3fa79c3dac1acd56ae9811a70226435a319570d5 */}
          </Link>
          <button
            className="flex items-center gap-2 p-3 hover:bg-red-600 rounded mt-auto w-full text-left"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
