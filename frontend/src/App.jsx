import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import User from "./components/User";
import AdminLogin from "./components/AdminLogin";
import About_Us from "./components/AboutUs";
import GetStarted from "./components/GetStarted";
import DilgAdminLogin from "./components/DilgAdminLogin";
import LGUAdminLogin from "./components/LGUAdminLogin";
import LGUAdminDashboard from "./components/LGUAdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userlogin" element={<User />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/adminlogin" element={<AdminLogin />} /> 
        <Route path="/about" element={<About_Us />} /> 
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/DilgAdminLogin" element={<DilgAdminLogin />} />
        <Route path="/LguAdminLogin" element={<LGUAdminLogin />} />
        <Route path="/lguAdminDashboard" element={<LGUAdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
