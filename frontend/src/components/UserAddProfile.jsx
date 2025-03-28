import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard_components/UserSidebar";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    municipalityId: "",
    municipalityName: "",
    fromDate: "",
    toDate: "",
    punongBarangay: "",
    barangaySecretary: "",
    email: "",
    sbMembers: ["", "", "", "", "", "", ""],
    sangguniangKabataan: [""],
    file: null,
  });

  useEffect(() => {
    const fetchBarangayData = async () => {
      try {
        const barangayId = "67e512242f9e47978a4e8564";
        const response = await fetch(`http://localhost:5000/api/barangays/${barangayId}`);

        if (response.ok) {
          const barangayData = await response.json();

          const municipalityResponse = await fetch(`http://localhost:5000/api/municipalities/${barangayData.municipalityId}`);
          let municipalityName = "";
          if (municipalityResponse.ok) {
            const municipalityData = await municipalityResponse.json();
            municipalityName = municipalityData.name;
          }

          setFormData({
            name: barangayData.name,
            municipalityId: barangayData.municipalityId,
            municipalityName,
            fromDate: barangayData.adminProfiles[0]?.startYear || "",
            toDate: barangayData.adminProfiles[0]?.endYear || "",
            punongBarangay: barangayData.adminProfiles[0]?.punongBarangay || "",
            barangaySecretary: barangayData.adminProfiles[0]?.barangaySecretary || "",
            email: barangayData.adminProfiles[0]?.email || "",
            sbMembers: barangayData.adminProfiles[0]?.sangguniangBarangayMembers || ["", "", "", "", "", "", ""],
            sangguniangKabataan: barangayData.adminProfiles[0]?.sangguniangKabataan || [""],
            file: barangayData.adminProfiles[0]?.file,
          });
        } else {
          console.error("Failed to fetch barangay data.");
        }
      } catch (error) {
        console.error("Error fetching barangay data:", error);
      }
    };

    fetchBarangayData();
  }, []);

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

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.punongBarangay || !formData.barangaySecretary || !formData.fromDate || !formData.toDate || !formData.name || !formData.municipalityName) {
      alert("Please fill out all required fields.");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 bg-gradient-to-br from-[#889FB1] to-[#587D9D]">
        <div className="flex gap-2 mb-4">
            <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8" />
            <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8" />
            <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8" />
            <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 sm:w-72 mt-4" />

        <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Barangay</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border p-2 w-full" readOnly/>

              <label className="block font-semibold mt-2">Municipality</label>
              <input type="text" name="municipalityName" value={formData.municipalityName} onChange={handleInputChange} className="border p-2 w-full" readOnly/>
              <label className="block font-semibold mt-2">Administrative Year</label>
              <div className="flex gap-4">
                <input type="date" name="fromDate" value={formData.fromDate} onChange={handleInputChange} className="border p-2 w-full" />
                <input type="date" name="toDate" value={formData.toDate} onChange={handleInputChange} className="border p-2 w-full" />
              </div>
              <label className="block font-semibold mt-2">Punong Barangay</label>
              <input type="text" name="punongBarangay" value={formData.punongBarangay} onChange={handleInputChange} className="border p-2 w-full" />

              <label className="block font-semibold mt-2">Barangay Secretary</label>
              <input type="text" name="barangaySecretary" value={formData.barangaySecretary} onChange={handleInputChange} className="border p-2 w-full" />

              <label className="block font-semibold mt-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border p-2 w-full" />

              <label className="block font-semibold mt-2">Sangguniang Kabataan Chairperson</label>
              <input type="text" name="sangguniangKabataan" value={formData.sangguniangKabataan} onChange={handleInputChange} className="border p-2 w-full" />
            </div>

            <div>
              <label className="block font-semibold">Sangguniang Barangay Members</label>
              <div className="overflow-y-auto h-40 border p-2">
                {formData.sbMembers.map((member, index) => (
                  <input key={index} type="text" value={member} onChange={(e) => handleInputChange(e, index)} className="border p-2 w-full mb-1" />
                ))}
              </div>
              
              <label className="block font-semibold mt-2">Upload File</label>
              <input type="file" onChange={handleFileChange} className="border p-2 w-full" />

              <button type="submit" className="bg-black text-white p-2 w-full mt-4 rounded hover:bg-gray-700">Save</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
