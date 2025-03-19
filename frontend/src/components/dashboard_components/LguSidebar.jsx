import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const LguSidebar = () => {
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
              to="/lguAdminDashboard"
              className="flex items-center w-full px-4 py-3 text-white font-semibold bg-[#1c3b57] border border-white/20 rounded-lg hover:bg-[#365980] transition"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/logout"
              className="flex items-center w-full px-4 py-3 text-white font-semibold bg-[#1c3b57] border border-white/20 rounded-lg hover:bg-[#365980] transition"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LguSidebar;
