import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BarangayView = () => {
  const { municipalityId, barangayId } = useParams();
  const [barangay, setBarangay] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ordinances");
  const [filter, setFilter] = useState("all");
  const [adminYearFilter, setAdminYearFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Track which item is being viewed
  const [viewedItem, setViewedItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/municipalities/${municipalityId}/barangays/${barangayId}`)
      .then((res) => res.json())
      .then((data) => {
        setBarangay(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching barangay:", error);
        setLoading(false);
      });
  }, [municipalityId, barangayId]);

  const getAvailableAdminYears = (items) => {
    const years = new Set();
    items.forEach((item) => {
      if (item.administrativeYear) years.add(item.administrativeYear);
    });
    return Array.from(years).sort().reverse();
  };

  const filterItems = (items) => {
    if (!Array.isArray(items)) return [];

    let result = items.filter(
      (item) =>
        item.status !== "Draft" &&
        item.isDeleted !== true &&
        (item.documentTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         item.documentNumber?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (filter !== "all") {
      result = result.filter((item) => item.status === filter);
    }

    if (adminYearFilter !== "all") {
      result = result.filter((item) => item.administrativeYear === adminYearFilter);
    }

    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.dateEnacted) - new Date(a.dateEnacted));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.dateEnacted) - new Date(b.dateEnacted));
        break;
      case "az":
        result.sort((a, b) => a.documentNumber.localeCompare(b.documentNumber));
        break;
      case "za":
        result.sort((a, b) => b.documentNumber.localeCompare(a.documentNumber));
        break;
      default:
        break;
    }

    return result;
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

  if (loading) return <p className="text-white p-6">Loading...</p>;
  if (!barangay) return <p className="text-white p-6">Barangay not found.</p>;

  const items = activeTab === "ordinances" ? barangay.ordinances : barangay.resolutions;
  const filteredItems = filterItems(items);
  const adminYears = getAvailableAdminYears(items);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
      {/* Navbar */}
      <nav className="w-full flex flex-col md:flex-row justify-between items-start md:items-center px-4 py-3 bg-[#183248] gap-2 md:gap-0">
        <div className="flex items-center gap-1">
          <img src="/images/dilg_logo.png" alt="DILG Logo" className="h-10 ml-1" />
          <span className="text-white font-bold text-lg">DILG Marinduque</span>
        </div>
        <div className="flex gap-4">
          <Link to="/userlogin" className="text-white font-bold text-base px-3 py-2 rounded hover:bg-[#2a4c68] transition">User</Link>
          <Link to="/dilgAdminLogin" className="text-white font-bold text-base px-3 py-2 rounded hover:bg-[#2a4c68] transition">Admin</Link>
          <Link to="/about" className="text-white font-bold text-base px-3 py-2 rounded hover:bg-[#2a4c68] transition">About Us</Link>
        </div>
      </nav>

      {/* Home + Back */}
      <div className="w-full flex flex-wrap gap-2 px-4 mt-2">
        <Link to="/" className="flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition">
          <img src="/images/home-icon.png" alt="Home" className="h-4 w-4" />
          <span>Home</span>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex items-center space-x-4 mb-2">
          <h2 className="text-black text-3xl font-bold uppercase">BARANGAY {barangay.name}</h2>
        </div>

        {/* Tabs & Filters */}
        <div className="flex flex-wrap gap-4 mt-4 items-center">
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded font-semibold ${activeTab === "ordinances" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => setActiveTab("ordinances")}
            >
              Ordinances
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold ${activeTab === "resolutions" ? "bg-blue-600 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => setActiveTab("resolutions")}
            >
              Resolutions
            </button>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 py-1 rounded bg-white text-black border border-gray-300"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Repealed">Repealed</option>
          </select>

          <select
            value={adminYearFilter}
            onChange={(e) => setAdminYearFilter(e.target.value)}
            className="px-2 py-1 rounded bg-white text-black border border-gray-300"
          >
            <option value="all">All Years</option>
            {adminYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-2 py-1 rounded bg-white text-black border border-gray-300"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Search */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search by title or document number..."
            className="w-full sm:w-1/2 px-3 py-2 rounded border border-gray-300 text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="mt-6 grid gap-4">
          <AnimatePresence>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => {
                const isExpanded = viewedItem === item;
                return (
                  <motion.div
                    key={item._id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white text-black p-5 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div
                      onClick={() => setViewedItem(isExpanded ? null : item)}
                      className="cursor-pointer flex justify-between items-start gap-4 flex-wrap sm:flex-nowrap"
                    >
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#1F2937] mb-1">
                          {item.documentTitle}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.documentNumber} •{" "}
                          {new Date(item.dateEnacted).toLocaleDateString()}
                        </p>
                        <div className="text-sm text-gray-600 mt-1 space-y-1">
                          <p><span className="font-medium">Status:</span> {item.status}</p>
                          <p><span className="font-medium">Admin Year:</span> {item.administrativeYear}</p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 mt-4 sm:mt-0 sm:ml-4">
                        {item.fileUrl && (
                          <>
                            <a
                              href={`http://localhost:5000${item.fileUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 transition"
                            >
                              View PDF
                            </a>
                            <a
                              href="#"
                              onClick={() => handleDownload(item.fileUrl, item.documentTitle)} // Use handleDownload for downloading
                              className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
                            >
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </a>
                          </>
                        )}
                        <motion.span
                          className="text-gray-500 text-sm mt-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          {isExpanded ? "▲ Hide" : "▼ View Details"}
                        </motion.span>
                      </div>
                    </div>

                    {/* Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden mt-4 border-t pt-4 border-gray-200 text-sm text-gray-700"
                        >
                          <p><span className="font-semibold">Authors:</span> {item.authors.join(", ")}</p>
                          <p><span className="font-semibold">Description:</span> {item.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <p>No items found.</p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BarangayView;
