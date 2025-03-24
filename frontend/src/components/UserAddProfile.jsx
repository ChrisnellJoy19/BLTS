import React, { useState } from "react";
import "../styles/UserAddProfile.css";
import Sidebar from "./dashboard_components/UserSidebar";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    punongBarangay: "",
    barangaySecretary: "",
    email: "",
    sbMembers: ["", "", "", "", ""], // Array for SB members
  });

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedSBMembers = [...formData.sbMembers];
      updatedSBMembers[index] = value;
      setFormData({ ...formData, sbMembers: updatedSBMembers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />

      <main className="add-content">
        <div className="add-logo-container">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="add-logo" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="add-logo" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="add-logo" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="add-logo" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="add_blts_logo" />

        <div className="form-container">
          {/* Two Columns */}
          <div className="form-two-columns">
            {/* Left Section */}
            <div className="form-left">
              <div className="form-group">
                <label className="form-title">Administrative Year / Term Year</label>
              </div>
              <div className="form-group-inline">
                <div className="form-group">
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                  />
                  <label>From</label>
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                  />
                  <label>To</label>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="punongBarangay"
                  value={formData.punongBarangay}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label>Punong Barangay</label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="barangaySecretary"
                  value={formData.barangaySecretary}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label>Barangay Secretary</label>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=" "
                />
                <label>Email</label>
              </div>
            </div>

            {/* Right Section */}
            <div className="form-right">
              <div className="sb-container">
                <label className="sb-label">Sangguniang Barangay Members</label>
                <div className="sb-list">
                  {formData.sbMembers.map((member, index) => (
                    <div key={index} className="form-group">
                      <input
                        type="text"
                        placeholder={`SB Member No.${index + 1}`}
                        value={member}
                        onChange={(e) => handleInputChange(e, index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-group file-upload-container">
                <input type="file" className="file-upload" />
                <label>Upload SB Logo</label>
              </div>
              <button className="save-button">Save</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
