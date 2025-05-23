import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, User, LogOut, Settings, File } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For small screens only
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [barangayName, setBarangayName] = useState("");
  const [municipalityName, setMunicipalityName] = useState("");
  const [barangayLogo, setBarangayLogo] = useState(null);
  

  useEffect(() => {
    const fetchUserBarangay = async () => {
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

        const baseUrl = `http://${window.location.hostname}:5000`;

        const barangayResponse = await fetch(`${baseUrl}/api/barangays/${barangayId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


        if (barangayResponse.ok) {
          const barangayData = await barangayResponse.json();
          setBarangayName(barangayData.name);
          setBarangayLogo(barangayData.file); // Assuming file is a string like "/uploads/logo.png"

          const baseUrl = `http://${window.location.hostname}:5000`;

          const municipalityResponse = await fetch(
            `${baseUrl}/api/municipalities/${barangayData.municipalityId}`
          );


          if (municipalityResponse.ok) {
            const municipalityData = await municipalityResponse.json();
            setMunicipalityName(municipalityData.name);
          } else {
            console.error("Failed to fetch municipality data");
          }
        } else {
          console.error("Failed to fetch barangay data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserBarangay();
  }, []);

  const handleClick = (event, path) => {
    if (location.pathname === path) {
      event.preventDefault();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/userlogin");
    window.location.reload(); // Ensures a full reload and clears any cached state
  };  

  return (
    <>
      <button
        className="md:hidden fixed top-4 right-5 z-50 bg-[#183248] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#587D9D]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>

      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#183248] text-white p-5 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:block
        `}
      >
        <div className="flex flex-col items-center text-center mt-4">
        <img
          src={barangayLogo ? `http://${window.location.hostname}:5000${barangayLogo}` : '/default-logo.png'}
          alt="barangay-logo"
          className="w-30 h-30 rounded-full border-1 border-white"
        />


        </div>
        <div className="text-lg text-center mt-2 font-bold">
            {barangayName && municipalityName
              ? ` ${barangayName},  ${municipalityName}, Marinduque`
              : "Loading..."}
        </div>
        <nav className="mt-6 flex flex-col space-y-2">
          <Link
            to="/user-dashboard"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-dashboard")}
          >
            <Home className="w-5 h-5" /> <span>Dashboard</span>
          </Link>
          <Link
            to="/user-ordinances"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-ordinances")}
          >
            <File className="w-5 h-5" /> <span>Ordinances</span>
          </Link>
          <Link
            to="/user-resolutions"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
            onClick={(e) => handleClick(e, "/user-resolutions")}
          >
            <FileText className="w-5 h-5" /> <span>Resolutions</span>
          </Link>
          <Link
            to="/barangay-profile"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
          >
            <User className="w-5 h-5" /> <span>Barangay Profile</span>
          </Link>
          <Link
            to="/UserEditCredentials"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
          >
            <Settings className="w-5 h-5" /> <span>Account Settings</span>
          </Link>
          <button
            className="flex items-center gap-2 p-3 hover:bg-red-600 rounded mt-auto w-full text-left"
            onClick={() => setShowLogoutPopup(true)}  // Show the logout popup
          >
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Yes, Logout
              </button>
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
