import React, { useState, useEffect } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserAddOrdinance = () => {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType] = useState("Ordinance");
  const [documentNumber, setDocumentNumber] = useState("");
  const [governanceArea, setGovernanceArea] = useState("");
  const [dateEnacted, setDateEnacted] = useState("");
  const [administrativeYear, setAdministrativeYear] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorInput, setAuthorInput] = useState("");
  const [documentTitleError, setDocumentTitleError] = useState("");
  const [documentNumberError, setDocumentNumberError] = useState("");
  
  
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
      setAuthorInput(""); // Clear input after adding
    }
  };
  
  const removeAuthor = (index) => {
    setAuthors(authors.filter((_, i) => i !== index));
  };
  
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [barangayId, setBarangayId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(`http://${window.location.hostname}:5000/api/user/me`, {
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

  const [selectedFileName, setSelectedFileName] = useState("No file chosen");
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setSelectedFileName(file ? file.name : "No file chosen");
  };
  
  const handleCancel = () => {
    navigate("/user-ordinances");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (documentTitleError || documentNumberError) {
      alert("Please resolve the title/number conflict before submitting.");
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
    formData.append("barangayId", barangayId);
    console.log(selectedFile);  // Debugging line
    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    

    try {
      const token = localStorage.getItem("userToken");

      await axios.post(`http://${window.location.hostname}:5000/api/ordinances`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      

      alert("Document uploaded successfully!");
      navigate("/user-ordinances");
    } catch (error) {
      console.error("❌ Error uploading document:", error.response?.data || error.message);
      alert("Failed to upload document.");
    }
  };

  const checkDocumentTitleExists = async (title) => {
    if (!title.trim() || !barangayId) return;
  
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `http://${window.location.hostname}:5000/api/ordinances/check-document-title/${encodeURIComponent(title)}?barangayId=${barangayId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
  
      setDocumentTitleError(response.data.exists ? "This title already exists in your barangay." : "");
    } catch (err) {
      console.error("Error checking title:", err);
      setDocumentTitleError("Error checking title.");
    }
  };
  
  const checkDocumentNumberExists = async (number) => {
    if (!number.trim() || !barangayId) return;
  
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        `http://${window.location.hostname}:5000/api/ordinances/check-document-number/${number}?barangayId=${barangayId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
  
      setDocumentNumberError(response.data.exists ? "This number already exists in your barangay." : "");
    } catch (err) {
      console.error("Error checking number:", err);
      setDocumentNumberError("Error checking number.");
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
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                onBlur={() => checkDocumentTitleExists(documentTitle)}
                className="w-full border p-2 rounded mt-1"
                required
              />
              {documentTitleError && (
                <p className="text-red-500 text-sm">{documentTitleError}</p>
              )}

            </div>

            <div>
              <label className="text-sm font-semibold">Type of Document</label>
              <input
                type="text"
                value={documentType}
                readOnly
                className="w-full border p-2 rounded bg-gray-200"
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Document Number</label>
              <input
                type="text"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                onBlur={() => checkDocumentNumberExists(documentNumber)}
                className="w-full border p-2 rounded mt-1"
              />
              {documentNumberError && (
                <p className="text-red-500 text-sm">{documentNumberError}</p>
              )}

            </div>

            <div>
              <label className="text-sm font-semibold">Governance Area</label>
              <select
                value={governanceArea}
                onChange={(e) => setGovernanceArea(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              >
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
              <input
                type="date"
                value={dateEnacted}
                onChange={(e) => setDateEnacted(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
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
              <label className="text-sm font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-semibold">Upload File</label>
              
              {/* Hidden File Input */}
              <input
                id="hidden-file-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              
              {/* Custom Upload Button */}
              <div className="flex items-center gap-1 w-full border p-2 rounded">
                <button
                  type="button"
                  onClick={() => document.getElementById("hidden-file-input").click()}
                  className="bg-gray-400 text-black px-3 py-1 rounded hover:bg-[#808080]"
                >
                  {selectedFile ? "Change File" : "Choose File"}
                </button>
                
                {/* Display File Name */}
                {selectedFile && (
                  <span className="text-sm text-gray-700">{selectedFileName}</span>
                )}
              </div>
            </div>


            <div className="md:col-span-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#223645] text-white px-4 py-2 rounded hover:bg-[#1a2a35]"
              >
                Upload Document
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserAddOrdinance;