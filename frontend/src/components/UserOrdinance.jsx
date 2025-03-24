import React from "react";
import "../styles/UserOrdinance.css";
import Sidebar from "./dashboard_components/UserSidebar";
import ordinanceData from "../components/ordinanceData";
import { Edit, Download, Eye, Trash2, Plus } from "lucide-react"; // Import icons
import { Link } from "react-router-dom";


const Dashboard = () => {
  return (
    <div className="ordinance-container">
      <Sidebar />

      <main className="ordinance-content">
        <div className="ordinance-logo-container">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="ordinance-logo" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="ordinance-logo" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="ordinance-logo" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="ordinance-logo" />
        </div>

        <div className="blts-container">
          <img src="/images/blts_logo.png" alt="blts-logo" className="blts_logo" />
          <input type="text" className="search-bar" placeholder="Search Ordinances..." />
        </div>

        {/* Add New Ordinance Button */}
        <div className="add-ordinance-container">
          <Link to="/add-ordinances" className="add-ordinance-btn">+ Add New Ordinance</Link>
        </div>

        {/* Scrollable Ordinance Container */}
        <div className="ordinance-scroll-container">
          <div className="ordinance-list">
            {ordinanceData.map((ordinance) => (
              <div key={ordinance.id} className="ordinance-card">
                <h3>{ordinance.letterNo}</h3>
                <p><strong>{ordinance.title}</strong></p>
                <p>{ordinance.date}</p>
                <p>{ordinance.author}</p>
                <div className="ordinance-actions">
                  <Edit size={20} className="action-icon edit-icon" />
                  <Download size={20} className="action-icon download-icon" />
                  <Eye size={20} className="action-icon view-icon" />
                  <Trash2 size={20} className="action-icon delete-icon" />
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
