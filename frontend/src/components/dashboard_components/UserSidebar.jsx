import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, FileText, User, LogOut, Settings } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // For small screens only

  const [barangayName, setBarangayName] = useState("");
  const [municipalityName, setMunicipalityName] = useState("");
  const [barangayLogo, setBarangayLogo] = useState("/images/barangay_logo_placeholder.png");

  useEffect(() => {
    const fetchUserBarangay = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        // Decode the token to extract user details
        const user = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const barangayId = user.barangayId;

        if (!barangayId) {
          console.error("No barangay ID found in token");
          return;
        }

        // Fetch Barangay Data
        const response = await fetch(`http://localhost:5000/api/barangays/${barangayId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const barangayData = await response.json();
          setBarangayName(barangayData.name);
          setBarangayLogo(barangayData.logo || "/images/barangay_logo_placeholder.png");

          // Fetch Municipality Name
          const municipalityResponse = await fetch(
            `http://localhost:5000/api/municipalities/${barangayData.municipalityId}`
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

  const handleLogout = (event) => {
    event.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/");
    }
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
            src={barangayLogo}
            alt="barangay-logo"
            className="w-25 h-25 rounded-full border-1 border-white"
          />
          <div className="text-lg mt-2 font-bold">
            {barangayName && municipalityName
              ? ` ${barangayName},  ${municipalityName}, Marinduque`
              : "Loading..."}
          </div>
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
            <FileText className="w-5 h-5" /> <span>Ordinances</span>
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
            onClick={(e) => handleClick(e, "/barangay-profile")}
          >
            <Settings className="w-5 h-5" /> <span>Barangay Profile</span>
          </Link>
          <Link
            to="/edit-credentials"
            className="flex items-center gap-2 p-3 hover:bg-blue-700 rounded"
          >
            <Settings className="w-5 h-5" /> <span>Account Settings</span>
          </Link>
          <button
            className="flex items-center gap-2 p-3 hover:bg-red-600 rounded mt-auto w-full text-left"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" /> <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
