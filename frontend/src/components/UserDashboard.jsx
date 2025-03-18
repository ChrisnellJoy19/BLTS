import React from "react";
import "../styles/UserDashboard.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Home, FileText, Settings, LogOut } from "lucide-react";

const data = [
  { name: "Category A", value: 40 },
  { name: "Category B", value: 30 },
  { name: "Category C", value: 20 },
  { name: "Category D", value: 10 },
];

const COLORS = ["#FF5733", "#33FFCE", "#FFD133", "#A133FF"];

// Function to calculate and display percentage labels
const renderLabel = ({ value, percent }) => `${(percent * 100).toFixed(1)}%`;

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidelogo">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="dilglogo" />
          <div className="barangay">Barangay, Municipality, Province</div>
        </div>

        <nav className="menu">
          <button className="menu-item"><Home size={20} /> Dashboard</button>
          <button className="menu-item"><FileText size={20} /> Ordinances</button>
          <button className="menu-item"><FileText size={20} /> Resolutions</button>
          <button className="menu-item"><Settings size={20} /> User Profile</button>
          <button className="menu-item logout"><LogOut size={20} /> Logout</button>
        </nav>
      </aside>

      <main className="content">
        <div className="logo-container">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="logo" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="logo" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="logo" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="logo" />
        </div>
        <img src="/images/blts_logo.png" alt="blts-logo" className="bltslogo" />
        <h1 className="welcome">WELCOME, USER!</h1>

        <div className="charts">
          <div>
            <h2>RESOLUTIONS</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={renderLabel} // Display percentage labels
                labelLine={false} // Remove label lines for cleaner look
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(1)}%)`, name]} />
            </PieChart>
          </div>
          <div>
            <h2>ORDINANCES</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                label={renderLabel} // Display percentage labels
                labelLine={false} // Remove label lines for cleaner look
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name, props) => [`${value} (${(props.percent * 100).toFixed(1)}%)`, name]} />
            </PieChart>
          </div>
        </div>
        <div className="dashboard-right-image">
          <img src="/images/accent-1.svg" alt="Upper Right Decoration" />
        </div>
        <div className="dashboard-left-image">
          <img src="/images/accent-3.svg" alt="Lower Left Decoration" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
