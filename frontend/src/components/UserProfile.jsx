import React from "react";
import "../styles/UserProfile.css";
import Sidebar from "./dashboard_components/UserSidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="profile-container">
      <Sidebar />
      <main className="profile-content">
        <div className="profile-logo-container">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="profile-logo" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="profile-logo" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="profile-logo" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="profile-logo" />
        </div>
        
        <img src="/images/blts_logo.png" alt="blts-logo" className="profile-blts_logo" />

        <div className="add-admin-container">
          <Link to="/add-new-admin" className="add-admin-btn">+ Add New Administrative Profile</Link>
        </div>

        <div className="add-profile-container">
          <Link to="/add-new-profile" className="add-profile-btn"> Edit Profile</Link>
        </div>

        <div className="barangay-container">
          <div className="barangay-logo">
            <img src="/images/barangay_logo.png" alt="barangay-logo" />
          </div>
          <div className="barangay-info">
            <h2>🏠 BALANACAN</h2>
            <p>Mogpog, Marinduque</p>
            <h3>Hon. Baldomero L. Limpiada</h3>
            <p>Punong Barangay</p>
            <h3>A-jay F. Cacho</h3>
            <p>Barangay Secretary</p>
            <h3>Hon. Sherwin N. Narzoles</h3>
            <p>Sangguniang Kabataan Chairperson</p>
          </div>
          <div className="barangay-officials">
            <h4>📅 2025 - 2028</h4>
            <p>Administrative Year / Term Year</p>
            <ul>
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
