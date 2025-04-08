import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUserPlus,
  faSignOutAlt,
  faUserCog, // Added icon for Edit Credentials
} from "@fortawesome/free-solid-svg-icons";

const DilgSidebar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear admin token
    localStorage.removeItem("adminToken");

    // Close the dialog
    setShowLogoutDialog(false);

    // Redirect to login page
    navigate("/dilgAdminLogin");
  };

  return (
    <div className="w-64 min-h-[16rem] h-screen bg-[#1c3b57] p-2 flex flex-col items-center">
      {/* Logos Section */}
      <div className="flex justify-center gap-2 mb-4 flex-wrap">
        <img src="/images/dilg_logo.png" className="w-12 h-12" alt="DILG Logo" />
        <img src="/images/dilg_marinduque.png" className="w-12 h-13" alt="DILG Marinduque" />
        <img src="/images/lgrc_mimaropa.png" className="w-10 h-12" alt="LGRC Mimaropa" />
        <img src="/images/one_duque.png" className="w-12 h-12" alt="One Duque" />
      </div>

      {/* Sidebar Navigation */}
      <nav className="w-full">
        <ul className="space-y-3">
          <li>
            <Link
              to="/dilgAdminDashboard"
              className="flex items-center w-full px-4 py-3 text-white font-semibold bg-[#1c3b57] border border-white/20 rounded-lg hover:bg-[#365980] transition"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/createAccount"
              className="flex items-center w-full px-4 py-3 text-white font-semibold bg-[#1c3b57] border border-white/20 rounded-lg hover:bg-[#365980] transition"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
              Create Account
            </Link>
          </li>
          <li>
            <Link
              to="/AdminEditCredentials"
              className="flex items-center w-full px-4 py-3 text-white font-semibold bg-[#1c3b57] border border-white/20 rounded-lg hover:bg-[#365980] transition"
            >
              <FontAwesomeIcon icon={faUserCog} className="mr-3" />
              Account Settings
            </Link>
          </li>
          <li>
            <button
              onClick={() => setShowLogoutDialog(true)}
              className="flex items-center w-full px-4 py-3 text-white font-semibold bg-[#1c3b57] border border-white/20 rounded-lg hover:bg-[#365980] transition"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DilgSidebar;
