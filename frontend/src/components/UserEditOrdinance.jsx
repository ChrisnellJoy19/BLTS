import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const UserEditOrdinance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const ordinance = location.state?.ordinance || {};

  const [documentTitle, setDocumentTitle] = useState(ordinance.documentTitle || "");
  const [documentType] = useState("Ordinance");
  const [documentNumber, setDocumentNumber] = useState(ordinance.documentNumber || "");
  const [governanceArea, setGovernanceArea] = useState(ordinance.governanceArea || "");
  const [dateEnacted, setDateEnacted] = useState(ordinance.dateEnacted ? ordinance.dateEnacted.split("T")[0] : "");
  const [administrativeYear, setAdministrativeYear] = useState(ordinance.administrativeYear || "");
  const [authors, setAuthors] = useState(ordinance.authors || []);
  const [authorInput, setAuthorInput] = useState("");
  const [status, setStatus] = useState(ordinance.status || "");
  const [description, setDescription] = useState(ordinance.description || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(ordinance.fileUrl ? "Existing file available" : "No file chosen");
  const [barangayId, setBarangayId] = useState(ordinance.barangayId ? String(ordinance.barangayId) : "");


  const handleAuthorChange = (e) => {
    setAuthorInput(e.target.value);
  };

  const handleAuthorKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newAuthor = authorInput.trim();
      if (newAuthor && !authors.includes(newAuthor)) {
        setAuthors([...authors, newAuthor]);
      }
      setAuthorInput("");
    }
  };

  const removeAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : "No file chosen");
  };

  const handleCancel = () => {
    navigate("/user-ordinances");
  };
  
  console.log("Sending Data:", {
    documentTitle,
    documentNumber,
    governanceArea,
    dateEnacted,
    administrativeYear,
    authors,
    status,
    description,
    barangayId,  // Check if this is a string
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.data.barangayId) {
        setBarangayId(response.data.barangayId);
      } else {
        console.warn("⚠️ Barangay ID is missing from user data.");
      }
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
    }
  };
  
  fetchUserData();
  }, []);
  
  console.log("Barangay ID being sent:", barangayId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("documentTitle", documentTitle);
    formData.append("documentNumber", documentNumber);
    formData.append("governanceArea", governanceArea);
    formData.append("dateEnacted", dateEnacted);
    formData.append("administrativeYear", administrativeYear);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("barangayId", barangayId);
    
    if (Array.isArray(authors)) {
      formData.append("authors", authors); // Keep it as an array
    } else {
      formData.append("authors", JSON.parse(authors)); // Convert back to an array if needed
    }
    
    // Append the file if selected
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.put(`http://localhost:5000/api/ordinances/${ordinance._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // This is needed for FormData requests
        },
      });

      alert("Document updated successfully!");
      navigate("/user-ordinances");
    } catch (error) {
      console.error("❌ Error updating document:", error.response?.data || error.message);
      alert("Failed to update document.");
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
          <h2 className="text-lg font-bold">Edit Ordinance</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Document Title</label>
              <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="w-full border p-2 rounded mt-1" required />
            </div>

            <div>
              <label className="text-sm font-semibold">Document Number</label>
              <input type="text" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} className="w-full border p-2 rounded mt-1" />
            </div>

            <div>
              <label className="text-sm font-semibold">Governance Area</label>
              <select value={governanceArea} onChange={(e) => setGovernanceArea(e.target.value)} className="w-full border p-2 rounded mt-1">
                <option value="">Select area</option>
                <option value="Financial Administration and Sustainability">Financial Administration and Sustainability</option>
                <option value="Disaster Preparedness">Disaster Preparedness</option>
                <option value="Safety, Peace and Order">Safety, Peace and Order</option>
                <option value="Social Protection and Sensitivity">Social Protection and Sensitivity</option>
                <option value="Business-friendliness and Competitiveness">Business-friendliness and Competitiveness</option>
                <option value="Environmental Management">Environmental Management</option>
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
              <div className="flex flex-wrap gap-2 border p-2 rounded mt-1">
                {authors.map((author, index) => (
                  <span key={index} className="bg-blue-200 px-2 py-1 rounded">
                    {author}
                    <button type="button" onClick={() => removeAuthor(index)} className="ml-1 text-red-500">x</button>
                  </span>
                ))}
                <input
                  type="text"
                  value={authorInput}
                  onChange={handleAuthorChange}
                  onKeyDown={handleAuthorKeyDown}
                  className="flex-1 border-none outline-none"
                  placeholder="Enter an author and press Enter"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border p-2 rounded mt-1"
                required
              >
                <option value="">Select status</option>
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Repealed">Repealed</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Upload File</label>

              {/* Hidden File Input */}
              <input
                id="hidden-file-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Custom Upload Button & File Name Display */}
              <div className="flex items-center gap-2 w-full border p-2 rounded mt-2">
                <button
                  type="button"
                  onClick={() => document.getElementById("hidden-file-input").click()}
                  className="bg-gray-400 text-black px-3 py-1 rounded hover:bg-[#808080]"
                >
                  {selectedFile || ordinance.fileUrl ? "Change File" : "Choose File"}
                </button>

                {/* Display File Name */}
                <span className="text-sm text-gray-700 truncate">
                  {selectedFile
                    ? selectedFile.name
                    : ordinance.fileUrl
                    ? ordinance.fileUrl.split("/").pop()
                    : "No file chosen"}
                </span>
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end gap-2">
              <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
              <button type="submit" className="bg-[#223645] text-white px-4 py-2 rounded hover:bg-[#1a2a35]">Update Ordinance</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserEditOrdinance;
