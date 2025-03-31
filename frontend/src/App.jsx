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
import UserOrdinance from "./components/UserOrdinance";
import UserResolution from "./components/UserResolution";
import UserProfile from "./components/UserProfile";
import UserAddProfile from "./components/UserAddProfile";
import AdminAddProfile from "./components/AdminAddProfile";
import UserAddOrdinance from "./components/UserAddOrdinance";
import UserAddResolution from "./components/UserAddResolution";
import DilgAdminCreateAccount from "./components/DilgAdminCreateAccount";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";
import EditCredentials from "./components/EditCredentials";
import ForgotPassword from "./components/ForgotPassword"; // adjust path if needed

import "./index.css"; 

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
        <Route path="/user-ordinances" element={<UserOrdinance />} />
        <Route path="/user-resolutions" element={<UserResolution />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/add-new-profile" element={<UserAddProfile />} />
        <Route path="/add-new-admin" element={<AdminAddProfile />} />
        <Route path="/add-ordinances" element={<UserAddOrdinance />} />
        <Route path="/add-resolutions" element={<UserAddResolution />} />
        <Route path="/CreateAccount" element={<DilgAdminCreateAccount />} />
        <Route path="/edit-credentials" element={<EditCredentials />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
