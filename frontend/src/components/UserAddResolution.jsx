import React, { useState } from "react";
import "../styles/UserAddResolution.css";
import Sidebar from "./dashboard_components/UserSidebar";

const Dashboard = () => {
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentType, setDocumentType] = useState("Resolution");
  const [documentNumber, setDocumentNumber] = useState("");
  const [governanceArea, setGovernanceArea] = useState("");
  const [dateEnacted, setDateEnacted] = useState("");
  const [administrativeYear, setAdministrativeYear] = useState("");
  const [authors, setAuthors] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ documentTitle, documentType, documentNumber, governanceArea, dateEnacted, administrativeYear, authors, selectedFile });
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.");
    if (confirmCancel) {
      console.log("Canceled");
      // Add any navigation or reset logic if needed, e.g., clearing form fields.
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
  
    const confirmUpload = window.confirm("Are you sure you want to upload this document?");
    if (confirmUpload) {
      console.log({
        documentTitle,
        documentType,
        documentNumber,
        governanceArea,
        dateEnacted,
        administrativeYear,
        authors,
        selectedFile
      });
      // Add actual upload logic here if needed
    } else {
      console.log("Upload canceled");
    }
  };
  


  return (
    <div className="addresolution-container">
      <Sidebar />
      <main className="add-resolution-content">
        <div className="add-resolution-logo-container">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="add-resolution-logo" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="add-resolution-logo" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="add-resolution-logo" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="add-resolution-logo" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="add-resolution_blts_logo" />
        
        <form className="upload-resolution-form" onSubmit={handleSubmit}>
          <div className="left-resolution-column">
            <h2>Upload a Document</h2>
            <div className="bordered-resolution-section">
              <label>Document Title</label>
              <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} placeholder="Enter document title..." required />
            </div>
            
            <div className="two-resolution-column">
              <div className="bordered-resolution-section">
                <label>Type of Document</label>
                <input type="text" value={documentType} readOnly />
              </div>
              <div className="bordered-resolution-section">
                <label>Number</label>
                <input type="text" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} placeholder="Enter document number..." />
              </div>
            </div>
            
            <div className="two-resolution-column">
              <div className="bordered-resolution-section">
                <label>Governance Area</label>
                <select value={governanceArea} onChange={(e) => setGovernanceArea(e.target.value)}>
                  <option value="">Select area</option>
                  <option value="Local">Local</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
              <div className="bordered-resolution-section">
                <label>Date Enacted / Adopted</label>
                <input type="date" value={dateEnacted} onChange={(e) => setDateEnacted(e.target.value)} />
              </div>
            </div>
            
            <div className="bordered-resolution-section">
              <label>Administrative Year / Term Year</label>
              <input type="text" value={administrativeYear} onChange={(e) => setAdministrativeYear(e.target.value)} placeholder="Enter year..." />
            </div>
            
            <div className="bordered-resolution-section">
              <label>Author/s</label>
              <select 
                value={authors} 
                onChange={(e) => setAuthors([e.target.value])} // Convert to single selection
              >
                <option value="">Select author</option>
                <option value="Author1">Author 1</option>
                <option value="Author2">Author 2</option>
                <option value="Author3">Author 3</option>
              </select>
            </div>

          </div>
          
          <div className="upload-resolution-area">
            <label htmlFor="file-upload">Click here to upload file (maximum of 1 file)</label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
          </div>
          
          <div className="form-resolution-footer">
            <button type="button" onClick={() => handleCancel()}>CANCEL</button>
            <button type="submit" onClick={() => handleUpload()}>UPLOAD</button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default Dashboard;
