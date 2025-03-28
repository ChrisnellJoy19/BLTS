import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import User from "./components/User";
import AdminLogin from "./components/AdminLogin";
import About_Us from "./components/AboutUs";
import GetStarted from "./components/GetStarted";
import DilgAdminLogin from "./components/DilgAdminLogin";
import LGUAdminLogin from "./components/LGUAdminLogin";
import LGUAdminDashboard from "./components/LGUAdminDashboard";
import DilgAdminDashboard from "./components/DilgAdminDashboard";
import UserDashboard from "./components/UserDashboard";
import PrivateRoute from "./components/PrivateRoute";
import DilgMunicipalityView from "./components/DilgMunicipalityView"; // ✅ Added missing import
import DilgAdminCreateAccount from "./components/DilgAdminCreateAccount";

import "./index.css"; // ✅ Ensure Tailwind styles are applied

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
        <Route path="/dilgAdminLogin" element={<DilgAdminLogin />} />
        <Route path="/lguAdminLogin" element={<LGUAdminLogin />} />

        {/* Protecting the LGU Admin Dashboard Route */}
        <Route
          path="/lguAdminDashboard"
          element={
            <PrivateRoute>
              <LGUAdminDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/dilgAdminDashboard" element={<DilgAdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/municipality/:id" element={<DilgMunicipalityView />} />
        <Route path="/CreateAccount" element={<DilgAdminCreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
