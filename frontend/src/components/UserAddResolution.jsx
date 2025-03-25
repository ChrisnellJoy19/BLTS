import React, { useState } from "react";
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
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gradient-to-r from-gray-500 to-gray-800 overflow-auto">
        <div className="flex flex-wrap gap-2 justify-start">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-8" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-8" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-8" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-8" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-64 mt-2" />
        
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-6" onSubmit={handleSubmit}>
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-bold">Upload a Document</h2>
            <div>
              <label className="text-sm font-semibold">Document Title</label>
              <input type="text" value={documentTitle} onChange={(e) => setDocumentTitle(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="Enter document title..." required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Type of Document</label>
                <input type="text" value={documentType} readOnly className="w-full border p-2 rounded bg-gray-200" />
              </div>
              <div>
                <label className="text-sm font-semibold">Number</label>
                <input type="text" value={documentNumber} onChange={(e) => setDocumentNumber(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="Enter document number..." />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold">Governance Area</label>
                <select value={governanceArea} onChange={(e) => setGovernanceArea(e.target.value)} className="w-full border p-2 rounded mt-1">
                  <option value="">Select area</option>
                  <option value="Local">Local</option>
                  <option value="Regional">Regional</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold">Date Enacted / Adopted</label>
                <input type="date" value={dateEnacted} onChange={(e) => setDateEnacted(e.target.value)} className="w-full border p-2 rounded mt-1" />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold">Administrative Year / Term Year</label>
              <input type="text" value={administrativeYear} onChange={(e) => setAdministrativeYear(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="Enter year..." />
            </div>
            <div>
              <label className="text-sm font-semibold">Author/s</label>
              <select value={authors} onChange={(e) => setAuthors([e.target.value])} className="w-full border p-2 rounded mt-1">
                <option value="">Select author</option>
                <option value="Author1">Author 1</option>
                <option value="Author2">Author 2</option>
                <option value="Author3">Author 3</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col justify-center border-dashed border-2 border-gray-300 p-6 text-center rounded-md">
            <label htmlFor="file-upload" className="cursor-pointer text-sm font-semibold">Click here to upload file (max 1)</label>
            <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" />
          </div>
          <div className="md:col-span-3 flex justify-end gap-4">
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-300 hover:bg-red-500 hover:text-white rounded">CANCEL</button>
            <button type="submit" onClick={handleUpload} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-400">UPLOAD</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
