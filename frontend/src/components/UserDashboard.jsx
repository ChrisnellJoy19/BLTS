import React, { useEffect, useState } from "react";
import Sidebar from "./dashboard_components/UserSidebar";
import { PieChart, Pie, Cell, Tooltip, Sector } from "recharts";

// Group documents by governance area
const groupByGovernanceArea = (documents) => {
  const areaCount = {};

  documents.forEach((doc) => {
    if (!doc.isDeleted) {
      const area = doc.governanceArea;
      areaCount[area] = (areaCount[area] || 0) + 1;
    }
  });

  return Object.entries(areaCount).map(([name, value]) => ({ name, value }));
};

const COLORS = ["#005C6C", "#007B7F", "#00A8A9", "#66B2B3", "#99CCCC","#003F5C"];

// Label formatter for pie slices
const renderCustomLabel = ({ percent }) => `${(percent * 100).toFixed(0)}%`;

// Active (hovered) slice
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent
  } = props;
  
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {/* <text x={mx} y={my} textAnchor="middle" fill="#333">
        {`${payload.name} (${(percent * 100).toFixed(0)}%)`}
      </text> */}
    </g>
  );
};

const Dashboard = () => {
  const [barangayName, setBarangayName] = useState("User");
  const [ordinancesData, setOrdinancesData] = useState([]);
  const [resolutionsData, setResolutionsData] = useState([]);
  const [activeOrdIndex, setActiveOrdIndex] = useState(null);
  const [activeResIndex, setActiveResIndex] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.error("No token found.");
          return;
        }

        const user = JSON.parse(atob(token.split(".")[1]));
        const barangayId = user.barangayId;

        if (!barangayId) {
          console.error("No barangay ID in token.");
          return;
        }

        const barangayRes = await fetch(`http://localhost:5000/api/barangays/${barangayId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!barangayRes.ok) throw new Error("Failed to fetch barangay");
        const barangayData = await barangayRes.json();
        setBarangayName(barangayData.name);

        const [ordRes, resRes] = await Promise.all([
          fetch(`http://localhost:5000/api/ordinances/barangay/${barangayId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`http://localhost:5000/api/resolutions/barangay/${barangayId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const ordinances = await ordRes.json();
        const resolutions = await resRes.json();

        setOrdinancesData(groupByGovernanceArea(ordinances));
        setResolutionsData(groupByGovernanceArea(resolutions));
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row f-screen bg-gray-100 overflow-auto">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white relative">
        
        {/* Logo Section */}
        <div className="flex flex-wrap items-center gap-2 mb-6 ml-2 justify-center md:justify-start">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-10" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="w-60 md:w-72 mb-4 mx-auto md:mx-0" />
        <h1 className="text-xl md:text-2xl font-bold text-center md:text-left text-black">
          WELCOME, BARANGAY {barangayName.toUpperCase()}!
        </h1>

        {/* Charts Section */}
        <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 mt-6">
          
          {/* Ordinances Chart */}
          <div className="text-center w-full md:w-auto text-black">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">ORDINANCES</h2>
            <div className="flex flex-col items-center">
              {ordinancesData.length > 0 ? (
                <PieChart width={350} height={300}>
                  <Pie
                    data={ordinancesData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    label={renderCustomLabel}
                    labelLine={false}
                    isAnimationActive={true}
                    animationDuration={1500}
                    activeIndex={activeOrdIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveOrdIndex(index)}
                    onMouseLeave={() => setActiveOrdIndex(null)}
                  >
                    {ordinancesData.map((entry, i) => (
                      <Cell key={`ord-cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(1)}%)`, name]} />
                </PieChart>
              ) : (
                <div className="w-36 h-36 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold opacity-75">
                  No Ordinance Data
                </div>
              )}
              <div className="mt-4 text-gray-200 text-sm font-medium">
                {ordinancesData.map((entry, i) => (
                  <div key={i} className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resolutions Chart */}
          <div className="text-center w-full md:w-auto text-black relative">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">RESOLUTIONS</h2>
            <div className="flex flex-col items-center">
              {resolutionsData.length > 0 ? (
                <PieChart width={350} height={300}>
                  <Pie
                    data={resolutionsData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    label={renderCustomLabel}
                    labelLine={false}
                    isAnimationActive={true}
                    animationDuration={1500}
                    activeIndex={activeResIndex}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, index) => setActiveResIndex(index)}
                    onMouseLeave={() => setActiveResIndex(null)}
                  >
                    {resolutionsData.map((entry, i) => (
                      <Cell key={`res-cell-${i}`} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(1)}%)`, name]} />
                </PieChart>
              ) : (
                <div className="w-36 h-36 flex items-center justify-center rounded-full bg-gray-300 text-black font-semibold opacity-50 absolute translate-y-4">
                  No Resolution Data
                </div>
              )}
              <div className="mt-4 text-gray-200 text-sm font-medium">
                {resolutionsData.map((entry, i) => (
                  <div key={i} className="flex items-center space-x-2 mb-2">
                    <div className="w-4 h-4" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Decorative Images */}
        <img src="/images/accent-1.svg" alt="Upper Right Decoration" className="absolute top-0 right-0 w-32 md:w-64 opacity-30" />
        <img src="/images/accent-3.svg" alt="Lower Left Decoration" className="absolute bottom-0 left-0 w-40 md:w-72 opacity-30" />
      </main>
    </div>
  );
};

export default Dashboard;
