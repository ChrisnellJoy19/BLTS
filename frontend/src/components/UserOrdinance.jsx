import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./dashboard_components/UserSidebar";
import { Edit, Download, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const UserOrdinance = () => {
  const [ordinances, setOrdinances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleted, setShowDeleted] = useState(false); // default to false
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const barangayId = user?.barangayId;

  useEffect(() => {
    if (!barangayId) return;

    const fetchOrdinances = async () => {
      try {
        const isDeletedParam = showDeleted ? "true" : "false";
        const response = await fetch(
          `http://localhost:5000/api/ordinances?barangayId=${encodeURIComponent(barangayId)}&isDeleted=${isDeletedParam}`
        );
        if (!response.ok) throw new Error("Failed to fetch ordinances");
        const data = await response.json();
        setOrdinances(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdinances();
  }, [barangayId, showDeleted]); // Re-fetch when showDeleted changes

  const handleEdit = (ordinance) => {
    navigate("/edit-ordinance", { state: { ordinance } });
  };

  const handleDownload = async (fileUrl, documentTitle) => {
    try {
      const fullUrl = `http://localhost:5000${fileUrl}`; // Ensure absolute URL
      const response = await fetch(fullUrl, { mode: "cors" });
  
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

  const filteredOrdinances = ordinances.filter((ordinance) => {
    const query = searchQuery.toLowerCase();
    return (
      ordinance.documentTitle.toLowerCase().includes(query) ||
      ordinance.documentNumber.toString().includes(query) ||
      ordinance.governanceArea.toLowerCase().includes(query) ||
      ordinance.dateEnacted.includes(query) ||
      ordinance.administrativeYear.toString().includes(query) ||
      ordinance.authors.some((author) => author.toLowerCase().includes(query)) ||
      ordinance.status.toLowerCase().includes(query)
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ordinance?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/ordinances/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete ordinance");

      setOrdinances((prevOrdinances) => prevOrdinances.filter((ordinance) => ordinance._id !== id));
      alert("Ordinance deleted successfully");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting ordinance. Please try again.");
    }
  };

  const handleRestore = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/ordinances/restore/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to restore ordinance");
  
      setOrdinances((prev) => prev.filter((ordinance) => ordinance._id !== id));
      alert("Ordinance restored successfully");
    } catch (err) {
      console.error("Restore error:", err);
      alert("Error restoring ordinance. Please try again.");
    }
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm("Permanently delete this ordinance? This cannot be undone.")) return;
  
    try {
      const response = await fetch(`http://localhost:5000/api/ordinances/permanent-delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
  
      if (!response.ok) throw new Error("Failed to permanently delete ordinance");
  
      setOrdinances((prev) => prev.filter((ordinance) => ordinance._id !== id));
      alert("Ordinance permanently deleted.");
    } catch (err) {
      console.error("Permanent delete error:", err);
      alert("Error permanently deleting ordinance. Please try again.");
    }
  };
  
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
            placeholder="Search Ordinance..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        <div className="flex justify-between items-center mt-4">
          <Link
            to="/add-ordinances"
            className="bg-[#0c3968] text-white text-[14px] px-4 py-2 rounded-md hover:bg-[#4d7fb4] transition"
          >
            + Add New Ordinance
          </Link>
          <button
            onClick={() => setShowDeleted(!showDeleted)}
            className="bg-[#0c3968] text-white text-[14px] px-4 py-2 rounded-md hover:bg-[#4d7fb4] transition"
          >
            {showDeleted ? "Hide Deleted Ordinances" : "Show Deleted Ordinances"}
          </button>
        </div>
  
        <div className="w-full max-w-[1000px] h-[400px] overflow-y-auto bg-[#183248] p-4 rounded-lg mt-4 border border-transparent mx-auto">
          {loading ? (
            <p className="text-center text-white">Loading ordinances...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : ordinances.length === 0 ? (
            <p className="text-center text-white">
              {showDeleted ? "No deleted ordinances found." : "No ordinances found."}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredOrdinances.map((ordinance) => (
                <div key={ordinance._id} className="bg-white text-black p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">
                    Letter No. {ordinance.documentNumber}, s. {ordinance.administrativeYear}
                  </h3>
                  <p className="font-semibold">{ordinance.documentTitle}</p>
                  <p className="text-sm">Date of Enactment | {new Date(ordinance.dateEnacted).toLocaleDateString()}</p>
                  <p className="text-sm">Author(s) | {ordinance.authors.join(", ")}</p>
                  <p className="text-lg font-bold uppercase">{ordinance.status}</p>
                  <div className="flex justify-end space-x-3 mt-2">
                    {!showDeleted && (
                      <>
                        <Edit
                          title="Edit Ordinance"
                          className="cursor-pointer text-[#007bff] hover:text-[#0056b3]"
                          onClick={() => handleEdit(ordinance)}
                        />
                        <Download title="Download PDF"
                          className="cursor-pointer text-[#28a745] hover:text-[#1e7e34]"
                          onClick={() => handleDownload(ordinance.fileUrl, ordinance.documentTitle)}
                        />
                        <Eye
                          title="View Ordinance"
                          className="cursor-pointer text-[#17a2b8] hover:text-[#117a8b]"
                          onClick={() => handleView(ordinance.fileUrl)}
                        />
                        <Trash2
                          title="Delete Ordinance"
                          className="cursor-pointer text-[#dc3545] hover:text-[#c82333]"
                          onClick={() => handleDelete(ordinance._id)}
                        />
                      </>
                    )}
                    {showDeleted && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRestore(ordinance._id)}
                          className="text-green-600 hover:text-green-800 font-semibold"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(ordinance._id)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Permanently Delete
                        </button>
                      </div>
                    )}

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

export default UserOrdinance;
