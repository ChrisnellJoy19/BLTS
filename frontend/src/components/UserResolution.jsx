import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard_components/UserSidebar";
import { Edit, Download, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const UserResolution = () => {
  const [resolutions, setResolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const barangayId = user?.barangayId;

  useEffect(() => {
      if (!barangayId) return; 
  
      const fetchResolutions = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/resolutions?barangayId=${encodeURIComponent(barangayId)}`
        );
          if (!response.ok) throw new Error("Failed to fetch resolutions");
          const data = await response.json();
          setResolutions(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
      fetchResolutions();
    }, [barangayId]);

    const handleEdit = (resolution) => {
      navigate("/edit-resolution", { state: { resolution } });
    };
    const handleDownload = async (fileUrl, documentTitle) => {
      try {
        const fullUrl = `http://localhost:5000${fileUrl}`; // Ensure absolute URL
        const response = await fetch(fullUrl, { mode: "cors" });
    
        // const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";
        // const fullUrl = `${BACKEND_URL}${fileUrl}`; //change to this if will deploy
  
        if (!response.ok) throw new Error("Failed to download file");
    
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = `${documentTitle}.pdf`;
        document.body.appendChild(link);
        link.click();
    
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download error:", err);
      }
    };
    
    const handleView = (fileUrl) => {
      const fullUrl = `http://localhost:5000${fileUrl}`; // Ensure absolute URL
      window.open(fullUrl, "_blank");
    };

    const [searchQuery, setSearchQuery] = useState("");
  
    const filteredResolutions = resolutions.filter((resolution) => {
      const query = searchQuery.toLowerCase();
      return (
        resolution.documentTitle.toLowerCase().includes(query) ||
        resolution.documentNumber.toString().includes(query) ||
        resolution.governanceArea.toLowerCase().includes(query) ||
        resolution.dateEnacted.includes(query) || // Assuming it's a string (format it if needed)
        resolution.administrativeYear.toString().includes(query) ||
        resolution.authors.some((author) => author.toLowerCase().includes(query)) // Checks if any author matches
      );
    });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-5 md:p-10 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
        <div className="flex flex-wrap justify-start items-center gap-1 ml-4">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-[30px]" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-[30px]" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-[30px]" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-[30px]" />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-2">
          <img src="/images/blts_logo.png" alt="blts-logo" className="h-auto w-60 sm:w-72" />
          <input
            type="text"
            className="px-5 py-2 text-[15px] text-black bg-[#f4f4f4] border border-black rounded-full outline-none mt-2 md:mt-0 w-full md:w-auto"
            placeholder="Search Resolution..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex justify-start mt-2">
          <Link
            to="/add-resolutions"
            className="bg-[#0c3968] text-white text-[14px] px-4 py-2 rounded-md hover:bg-[#4d7fb4] transition md:ml-[830px]"
          >
            + Add New Resolution
          </Link>
        </div>

        <div className="w-full max-w-[1000px] h-[400px] overflow-y-auto bg-[#183248] p-4 rounded-lg mt-4 border border-transparent mx-auto">
          
          {loading ? (
            <p className="text-center text-white">Loading resolutions...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : resolutions.length === 0 ? (
            <p className="text-center text-white">No resolutions found for your  barangay.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredResolutions.map((resolution) => (
                <div key={resolution._id} className="bg-white text-black p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">Letter No. {resolution.documentNumber}, s. {resolution.administrativeYear}</h3>
                  <p className="font-semibold">{resolution.documentTitle}</p>
                  <p className="text-sm">Date of Enactment | {new Date(resolution.dateEnacted).toLocaleDateString()}</p>
                  <p className="text-sm">Author(s) | {resolution.authors.join(", ")}</p>
                  <div className="flex justify-end space-x-3 mt-2">
                    <Edit className="cursor-pointer text-[#007bff] hover:text-[#0056b3]" onClick={() => handleEdit(resolution)} />
                    <Download
                      className="cursor-pointer text-[#28a745] hover:text-[#1e7e34]"
                      onClick={() => handleDownload(resolution.fileUrl, resolution.documentTitle)}
                    />
                    <Eye
                      className="cursor-pointer text-[#17a2b8] hover:text-[#117a8b]"
                      onClick={() => handleView(resolution.fileUrl)}
                    />
                    <Trash2 className="cursor-pointer text-[#dc3545] hover:text-[#c82333]" 
                    onClick={() => handleDelete(resolution._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
      
        </div>
      </main>
    </div>
  );
};

export default UserResolution;
