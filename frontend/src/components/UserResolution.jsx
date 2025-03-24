import React from "react";
import "../styles/UserResolution.css";
import Sidebar from "./dashboard_components/UserSidebar";
import ordinanceData from "../components/ordinanceData";
import { Edit, Download, Eye, Trash2, Plus } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="resolution-container">
      <Sidebar />

      <main className="resolution-content">
        <div className="resolution-logo-container">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="resolution-logo" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="resolution-logo" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="resolution-logo" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="resolution-logo" />
        </div>

        <div className="resolution-blts-container">
          <img src="/images/blts_logo.png" alt="blts-logo" className="resolution-blts_logo" />
          <input type="text" className="resolution-search-bar" placeholder="Search Resolution..." />
        </div>

        {/* Add New Ordinance Button */}
        <div className="add-resolution-container">
          <Link to="/add-resolutions" className="add-resolution-btn">+ Add New Resolution</Link>
        </div>

        {/* Scrollable Ordinance Container */}
        <div className="resolution-scroll-container">
          <div className="resolution-list">
            {ordinanceData.map((ordinance) => (
              <div key={ordinance.id} className="resolution-card">
                <h3>{ordinance.letterNo}</h3>
                <p><strong>{ordinance.title}</strong></p>
                <p>{ordinance.date}</p>
                <p>{ordinance.author}</p>
                <div className="resolution-actions">
                  <Edit size={20} className="resolution-action-icon edit-icon" />
                  <Download size={20} className="resolution-action-icon download-icon" />
                  <Eye size={20} className="resolution-action-icon view-icon" />
                  <Trash2 size={20} className="resolution-action-icon delete-icon" />
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
