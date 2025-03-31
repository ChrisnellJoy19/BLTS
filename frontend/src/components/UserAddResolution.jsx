import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UserAddResolution = () => {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType] = useState("Resolution");
  const [documentNumber, setDocumentNumber] = useState("");
  const [governanceArea, setGovernanceArea] = useState("");
  const [dateEnacted, setDateEnacted] = useState("");
  const [administrativeYear, setAdministrativeYear] = useState(""); 
  const [authors, setAuthors] = useState([]);
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [barangayId, setBarangayId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
  
        console.log("🟢 User Data from /me:", response.data);
        if (response.data.barangayId) {
          setBarangayId(response.data.barangayId);
        } else {
          console.warn("⚠️ Barangay ID is missing from response.");
        }
      } catch (error) {
        console.error("❌ Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);
  const handleCancel = () => {
    navigate("/user-resolutions");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!barangayId) {
      alert("Barangay ID is required.");
      return;
    }

    const formData = new FormData();
    formData.append("documentTitle", documentTitle);
    formData.append("documentType", documentType);
    formData.append("documentNumber", documentNumber);
    formData.append("governanceArea", governanceArea);
    formData.append("dateEnacted", dateEnacted);
    formData.append("administrativeYear", administrativeYear);
    formData.append("authors", authors.length ? JSON.stringify(authors) : "[]");
    formData.append("status", status);
    formData.append("description", description);
    formData.append("barangayId", barangayId.toString());
    if (selectedFile) formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("token");
    
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("User Data:", user); 
      console.log("Barangay ID:", user?.barangayId); // Debugging
    
      if (!user?.barangayId) {
        alert("Barangay ID is missing!");
        return;
      }
    
      console.log("FormData being sent:", Object.fromEntries(formData.entries())); // Debugging
    
      await axios.post("http://localhost:5000/api/resolutions", formData, { 
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } 
      });
      
    
      alert("Document uploaded successfully!");
      navigate("/user-resolutions"); 
    } catch (error) {
      console.error("Error uploading document:", error.response?.data || error.message);
      alert("Failed to upload document.");
    }
    
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-black relative">
      <div className="flex flex-wrap gap-2 justify-start">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 mt-2" />
        
        <div className="max-w-4xl mx-auto mt-6 h-[70vh] overflow-y-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold">Upload a Document</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Document Title</label>
              <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="w-full border p-2 rounded mt-1" required />
            </div>

            <div>
              <label className="text-sm font-semibold">Type of Document</label>
              <input type="text" value={documentType} readOnly className="w-full border p-2 rounded bg-gray-200" />
            </div>

            <div>
              <label className="text-sm font-semibold">Document Number</label>
              <input type="text" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} className="w-full border p-2 rounded mt-1" />
            </div>

            <div>
              <label className="text-sm font-semibold">Governance Area</label>
              <select value={governanceArea} onChange={(e) => setGovernanceArea(e.target.value)} className="w-full border p-2 rounded mt-1">
                <option value="">Select area</option>
                <option value="Barangay">Barangay</option>
                <option value="Municipal">Municipal</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold">Date Enacted</label>
              <input type="date" value={dateEnacted} onChange={(e) => setDateEnacted(e.target.value)} className="w-full border p-2 rounded mt-1" />
            </div>

      
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Administrative Year</label>
              <input
                type="text"
                value={administrativeYear}
                onChange={(e) => setAdministrativeYear(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                placeholder="Enter administrative year (e.g., 2023-2024)"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Authors</label>
              <input 
                type="text" 
                value={authors.join(", ")} 
                onChange={(e) => setAuthors(
                  e.target.value.split(",").map(author => author.trim()).filter(author=>author))} 
                className="w-full border p-2 rounded mt-1" 
                placeholder="Enter authors, separated by commas" />
            </div>
 
            <div>
              <label className="text-sm font-semibold">Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded mt-1" required>
                <option value="">Select status</option>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Repealed">Repealed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded mt-1" required></textarea>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="file-upload" className="cursor-pointer text-sm font-semibold">Upload File</label>
              <input id="file-upload" type="file" onChange={handleFileChange} className="w-full border p-2 rounded mt-1" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-4">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={handleCancel}>CANCEL</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">UPLOAD</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserAddResolution;
