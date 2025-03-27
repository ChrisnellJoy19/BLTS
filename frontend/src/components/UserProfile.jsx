import React from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
        <div className="flex flex-wrap items-center gap-2 sm:gap-1">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8 sm:h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8 sm:h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8 sm:h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8 sm:h-10" />
        </div>
        
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 sm:w-72 mt-4" />
        
        <div className="flex flex-col items-end space-y-2 mt-4 mr-2 md:mr-20">
          <Link to="/add-new-admin" className="bg-[#0c3968] text-white text-sm px-4 py-2 rounded-md hover:bg-[#4d7fb4]">
            + Add New Administrative Profile
          </Link>
          <Link to="/add-new-profile" className="bg-[#0c3968] text-white text-sm px-4 py-2 rounded-md hover:bg-[#4d7fb4]">
            Edit Profile
          </Link>
        </div>

        <div className="bg-white text-black rounded-lg shadow-md p-4 mt-6 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center">
          <div className="flex-shrink-0">
            <img src="/images/dilg_logo.png" alt="barangay-logo" className="ml-5 w-24 h-24 rounded-full" />
          </div>
          <div className="flex-1 text-left px-6 ml-10">
            <h2 className="text-lg font-bold">🏠 BALANACAN</h2>
            <p>Mogpog, Marinduque</p>
            <h3 className="font-semibold">Hon. Baldomero L. Limpiada</h3>
            <p>Punong Barangay</p>
            <h3 className="font-semibold">A-jay F. Cacho</h3>
            <p>Barangay Secretary</p>
            <h3 className="font-semibold">Hon. Sherwin N. Narzoles</h3>
            <p>Sangguniang Kabataan Chairperson</p>
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-lg font-bold">📅 2025 - 2028</h4>
            <p className="text-sm">Administrative Year / Term Year</p>
            <ul className="list-none mt-2 text-sm">
              <li>1. Hon. Arnulfo F. Del Prado</li>
              <li>2. Hon. Zaida O. Leal</li>
              <li>3. Hon. Joylo J. Saguid</li>
              <li>4. Hon. Fernando L. Larrosa</li>
              <li>5. Hon. Anselmo P. Mabute</li>
              <li>6. Hon. Erickson C. Lauresta</li>
              <li>7. Hon. Rosalia L. Molbog</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;