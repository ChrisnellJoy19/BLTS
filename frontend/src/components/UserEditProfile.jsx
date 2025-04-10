import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard_components/UserSidebar";

const UserEditProfile = () => {
  const navigate = useNavigate();
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
    sangguniangKabataan: "",
    file: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBarangayData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const user = JSON.parse(atob(token.split(".")[1]));
        const barangayId = user.barangayId;

        if (!barangayId) {
          console.error("No barangay ID found in token");
          return;
        }

        const response = await fetch(`http://localhost:5000/api/barangays/${barangayId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const barangayData = await response.json();

          let municipalityName = "";
          const municipalityResponse = await fetch(`http://localhost:5000/api/municipalities/${barangayData.municipalityId}`);
          if (municipalityResponse.ok) {
            const municipalityData = await municipalityResponse.json();
            municipalityName = municipalityData.name;
          }

          setFormData({
            name: barangayData.name,
            municipalityId: barangayData.municipalityId || "",
            municipalityName,
            fromDate: barangayData.adminProfiles[0]?.startYear || "",
            toDate: barangayData.adminProfiles[0]?.endYear || "",
            punongBarangay: barangayData.adminProfiles[0]?.punongBarangay || "",
            barangaySecretary: barangayData.adminProfiles[0]?.barangaySecretary || "",
            email: barangayData.adminProfiles[0]?.email || "",
            sbMembers: barangayData.adminProfiles[0]?.sangguniangBarangayMembers || ["", "", "", "", "", "", ""],
            sangguniangKabataan: barangayData.adminProfiles[0]?.sangguniangKabataan || "",
            file: barangayData.adminProfiles[0]?.file,
          });
        } else {
          console.error("Failed to fetch barangay data.");
        }
      } catch (error) {
        console.error("Error fetching barangay data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarangayData();
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (index !== undefined) {
      const updatedSBMembers = [...formData.sbMembers];
      updatedSBMembers[index] = value || "";
      setFormData({ ...formData, sbMembers: updatedSBMembers });
    } else {
      setFormData({ ...formData, [name]: value || "" });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fromDate.trim() ||
      !formData.toDate.trim() ||
      !formData.punongBarangay.trim() ||
      !formData.barangaySecretary.trim() ||
      !formData.email.trim()
    ) {
      alert("Please fill out all required fields before saving.");
      return;
    }

    if (formData.sbMembers.some((member) => !member.trim())) {
      alert("Please fill out all Sangguniang Barangay Member fields before saving.");
      return;
    }

    const confirmSave = window.confirm("Are you sure you want to save the changes?");
    if (!confirmSave) return;

    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("User not authenticated.");
      return;
    }

    const user = JSON.parse(atob(token.split(".")[1]));
    const barangayId = user.barangayId;

    if (!barangayId) {
      alert("No barangay ID found.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("municipalityId", formData.municipalityId);

    const adminProfiles = [
      {
        startYear: parseInt(formData.fromDate),
        endYear: parseInt(formData.toDate),
        punongBarangay: formData.punongBarangay,
        barangaySecretary: formData.barangaySecretary,
        email: formData.email,
        sangguniangBarangayMembers: formData.sbMembers,
        sangguniangKabataan: formData.sangguniangKabataan,
      },
    ];

    form.append("adminProfiles", JSON.stringify(adminProfiles));

    if (formData.file) {
      form.append("file", formData.file);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/barangays/${barangayId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      if (response.ok) {
        alert("Barangay profile updated successfully!");
        navigate("/barangay-profile");
      } else {
        const error = await response.json();
        alert(error.message || "Error updating barangay.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (loading) return <p className="text-center mt-6 text-white">Loading barangay data...</p>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-black relative">
        <div className="flex flex-wrap items-center gap-2 sm:gap-1">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8 sm:h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8 sm:h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8 sm:h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8 sm:h-10" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 sm:w-72 mt-4" />

        <form onSubmit={handleSubmit} className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto overflow-auto max-h-[450px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">Barangay</label>
              <input type="text" name="name" value={formData.name} className="border p-2 w-full font-bold" readOnly />
              <label className="block font-semibold mt-2">Municipality</label>
              <input type="text" name="municipalityName" value={formData.municipalityName} className="border p-2 w-full font-bold" readOnly />
              <label className="block font-semibold mt-2">Administrative Year (From - To)</label>
              <div className="flex gap-4">
                <input type="date" name="fromDate" value={formData.fromDate} onChange={handleInputChange} className="border p-2 w-full" />
                <input type="date" name="toDate" value={formData.toDate} onChange={handleInputChange} className="border p-2 w-full" />
              </div>
              <label className="block font-semibold mt-2">Punong Barangay</label>
              <input type="text" name="punongBarangay" value={formData.punongBarangay} onChange={handleInputChange} className="border p-2 w-full" />
              <label className="block font-semibold mt-2">Barangay Secretary</label>
              <input type="text" name="barangaySecretary" value={formData.barangaySecretary} onChange={handleInputChange} className="border p-2 w-full" />
              <label className="block font-semibold ">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border p-2 w-full" />
            </div>

            <div>
              <label className="block font-semibold">Sangguniang Barangay Members</label>
              <div className="overflow-y-auto h-40 border p-2">
                {formData.sbMembers.map((member, index) => (
                  <input key={index} type="text" value={member} onChange={(e) => handleInputChange(e, index)} className="border p-2 w-full mb-1" />
                ))}
              </div>

              <label className="block font-semibold mt-2">SK Chairperson</label>
              <input
                type="text"
                name="sangguniangKabataan"
                value={formData.sangguniangKabataan}
                onChange={handleInputChange}
                className="border p-2 w-full"
              />
              <div className="mb-4">
                <label htmlFor="file" className="block font-medium mb-1 text-black">
                  Upload Logo
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="block w-full text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                {formData.file && (
                  <img
                    src={URL.createObjectURL(formData.file)}
                    alt="Preview"
                    className="h-32 mt-4"
                  />
                )}

              </div>

              <button type="submit" className="bg-black text-white p-2 w-full mt-4 rounded hover:bg-gray-700">Save</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default UserEditProfile;
