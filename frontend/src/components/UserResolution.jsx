import React from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import resolutionData from "../data/resolutionData";
import { Edit, Download, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Unchanged) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
        {/* Logos (Keep original position) */}
        <div className="flex flex-wrap justify-start items-center gap-1 ml-4">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-[30px]" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-[30px]" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-[30px]" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-[30px]" />
        </div>

        {/* BLTS Logo & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-2">
          <img src="/images/blts_logo.png" alt="blts-logo" className="h-auto w-60 sm:w-72" />
          <input
            type="text"
            className="px-5 py-2 text-[15px] text-black bg-[#f4f4f4] border border-black rounded-full outline-none mt-2 md:mt-0 w-full md:w-auto"
            placeholder="Search Resolution..."
          />
        </div>

        {/* Add Resolution Button (Position Unchanged) */}
        <div className="flex justify-start mt-2">
          <Link
            to="/add-resolutions"
            className="bg-[#0c3968] text-white text-[14px] px-4 py-2 rounded-md hover:bg-[#4d7fb4] transition md:ml-[830px]"
          >
            + Add New Resolution
          </Link>
        </div>

        {/* Resolution List (Scrollable & Stays in Place) */}
        <div className="w-full max-w-[1000px] h-[400px] overflow-y-auto bg-[#183248] p-4 rounded-lg mt-4 border border-transparent mx-auto">
          <div className="flex flex-col gap-3">
            {resolutionData.map((resolution) => (
              <div key={resolution.id} className="bg-white text-black p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">{resolution.letterNo}</h3>
                <p className="font-semibold">{resolution.title}</p>
                <p className="text-sm">{resolution.date}</p>
                <p className="text-sm">{resolution.author}</p>

                {/* Action Icons */}
                <div className="flex justify-end space-x-3 mt-2">
                  <Edit className="cursor-pointer text-[#007bff] hover:text-[#0056b3]" />
                  <Download className="cursor-pointer text-[#28a745] hover:text-[#1e7e34]" />
                  <Eye className="cursor-pointer text-[#17a2b8] hover:text-[#117a8b]" />
                  <Trash2 className="cursor-pointer text-[#dc3545] hover:text-[#c82333]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
