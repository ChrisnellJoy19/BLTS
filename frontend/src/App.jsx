// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import UserLogin from "./components/UserLogin";
import AboutUs from "./components/AboutUs";
import GetStarted from "./components/GetStarted";
import DilgAdminLogin from "./components/DilgAdminLogin";
import DilgAdminDashboard from "./components/DilgAdminDashboard";
import UserDashboard from "./components/UserDashboard";
import MunicipalityView from "./components/MunicipalityView";

import "./index.css"; 
import UserOrdinance from "./components/UserOrdinance";
import UserResolution from "./components/UserResolution";
import BarangayProfile from "./components/BarangayProfile";
import UserEditProfile from "./components/UserEditProfile";
import UserAddOrdinance from "./components/UserAddOrdinance";
import UserEditOrdinance from "./components/UserEditOrdinance";
import UserAddResolution from "./components/UserAddResolution";
import UserEditResolution from "./components/UserEditResolution";
import DilgAdminCreateAccount from "./components/DilgAdminCreateAccount"; 
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import UserEditCredentials from "./components/UserEditCredentials";
import AdminEditCredentials from "./components/AdminEditCredentials";
import UserForgotPassword from "./components/UserForgotPassword"; 
import AdminForgotPassword from "./components/AdminForgotPassword"; 
import BarangayView from "./components/BarangayView";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/DilgAdminLogin" element={<DilgAdminLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        {/* Protected Routes */}
        <Route
          path="/dilgAdminDashboard"
          element={
            <AdminRoute>
              <DilgAdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <UserRoute>
              <UserDashboard />
            </UserRoute>
          }
        />

        <Route path="/municipality/:id" element={<MunicipalityView />} />
        <Route path="/municipality/:municipalityId/barangay/:barangayId" element={<BarangayView />} />
        <Route path="/user-ordinances" element={<UserOrdinance />} />
        <Route path="/user-resolutions" element={<UserResolution />} />
        <Route path="/barangay-profile" element={<BarangayProfile/>} />
        <Route path="/edit-profile" element={<UserEditProfile/>} />
        <Route path="/add-ordinances" element={<UserAddOrdinance />} />
        <Route path="/edit-ordinance" element={<UserEditOrdinance />} />
        <Route path="/edit-resolution" element={<UserEditResolution />} />
        <Route path="/add-resolutions" element={<UserAddResolution />} />
        <Route path="/CreateAccount" element={<DilgAdminCreateAccount />} />
        <Route path="/UserEditCredentials" element={<UserEditCredentials />} />
        <Route path="/AdminEditCredentials" element={<AdminEditCredentials />} />
        <Route path="/UserForgotPassword" element={<UserForgotPassword />} />
        <Route path="/AdminForgotPassword" element={<AdminForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;