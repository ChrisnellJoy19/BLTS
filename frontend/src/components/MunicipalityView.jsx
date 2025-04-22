import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChevronRight, Landmark, ArrowLeft} from "lucide-react";

const COLORS = ["#000B4F", "#20368F", "#829CD0", "#EBEBEB", "#6D6D6D", "#323232"];
// const COLORS = ["#005C6C", "#007B7F", "#00A8A9", "#66B2B3", "#99CCCC"];


const MunicipalityView = () => {
  const { id } = useParams();
  const [municipality, setMunicipality] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMunicipalityData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/municipalities/${id}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setMunicipality(data);
      } catch (err) {
        console.error("Error fetching municipality data:", err);
        setError(err.message);
      }
    };

    fetchMunicipalityData();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!municipality) return <p className="text-center text-lg font-semibold text-white">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-4 py-3 bg-[#183248]">
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

      {/* Home Button */}
        <div className="w-full flex justify-start px-4 mt-2">
          <Link to="/" className="flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition">
            <img src="/images/home-icon.png" alt="Home" className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="ml-1 flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col p-6 overflow-auto">
        {/* Municipality Name and Description */}
        <h1 className="text-4xl font-bold">{municipality.name}</h1>
        <p className="text-lg mt-2">{municipality.description}</p>

        {/* Charts Section */}
        <div className="flex flex-wrap justify-center gap-10 mt-6">
          {/* Resolutions Chart */}
          <div>
            <h2 className="text-xl font-semibold text-center">Resolutions</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={municipality.barangays.map(b => ({ name: b.name, value: b.resolutions }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {municipality.barangays.map((entry, index) => (
                  <Cell key={`res-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          {/* Ordinances Chart */}
          <div>
            <h2 className="text-xl font-semibold text-center">Ordinances</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={municipality.barangays.map(b => ({ name: b.name, value: b.ordinances }))}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {municipality.barangays.map((entry, index) => (
                  <Cell key={`ord-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        {/* Barangay List */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Barangays</h2>
          <div className="mt-4 space-y-2">
          {municipality.barangays.map((barangay) => (
            <Link
              key={barangay._id}
              to={`/municipality/${municipality._id}/barangay/${barangay._id}`}
              className="flex items-center justify-between w-full p-4 border rounded-lg shadow-md bg-white text-black hover:bg-gray-100 transition"
            >
              <div className="flex items-center space-x-3">
                <Landmark className="text-gray-600" size={20} />
                <span className="text-lg font-medium">{barangay.name}</span>
              </div>
              <ChevronRight className="text-gray-600" size={20} />
            </Link>
          ))}

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full mt-auto bg-[#183248] text-center text-sm py-2">
        A project by ONE MARINDUQUE DILG - LRC
      </footer>
    </div>
  );
};

export default MunicipalityView;
