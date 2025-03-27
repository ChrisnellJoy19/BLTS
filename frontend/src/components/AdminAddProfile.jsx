import React, { useState } from "react";
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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-[#889FB1] to-[#587D9D]">
        <div className="flex gap-2 mb-4">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 sm:w-72 mt-4" />

        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 mx-auto mt-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/2 pr-4">
              <label className="block font-semibold">Administrative Year / Term Year</label>
              <div className="flex gap-4">
                <input type="date" name="fromDate" value={formData.fromDate} onChange={handleInputChange} className="border p-2 w-full" />
                <input type="date" name="toDate" value={formData.toDate} onChange={handleInputChange} className="border p-2 w-full" />
              </div>
              <input type="text" name="punongBarangay" placeholder="Punong Barangay" value={formData.punongBarangay} onChange={handleInputChange} className="border p-2 w-full mt-2" />
              <input type="text" name="barangaySecretary" placeholder="Barangay Secretary" value={formData.barangaySecretary} onChange={handleInputChange} className="border p-2 w-full mt-2" />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="border p-2 w-full mt-2" />
            </div>

            <div className="w-full md:w-1/2">
              <label className="block font-semibold">Sangguniang Barangay Members</label>
              <div className="overflow-y-auto h-40 border p-2 bg-gray-100">
                {formData.sbMembers.map((member, index) => (
                  <input key={index} type="text" placeholder={`SB Member No.${index + 1}`} value={member} onChange={(e) => handleInputChange(e, index)} className="border p-2 w-full mb-1" />
                ))}
              </div>
              <input type="file" className="border p-2 w-full mt-2" />
              <button className="bg-black text-white p-2 w-full mt-4 rounded hover:bg-gray-700">Save</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
