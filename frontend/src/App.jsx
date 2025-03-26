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
import UserProfile from "./components/UserProfile";
import UserAddProfile from "./components/UserAddProfile";
import AdminAddProfile from "./components/AdminAddProfile";
import UserAddOrdinance from "./components/UserAddOrdinance";
import UserAddResolution from "./components/UserAddResolution";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userlogin" element={<UserLogin/>} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/dilgAdminLogin" element={<DilgAdminLogin />} />
        {/* Protecting the LGU Admin Dashboard Route
        <Route
          path="/lguAdminDashboard"
          element={
            <PrivateRoute>
              <LGUAdminDashboard />
            </PrivateRoute>
          }
        /> */}

        <Route path="/dilgAdminDashboard" element={<DilgAdminDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/municipality/:id" element={<MunicipalityView />} />
        <Route path="/user-ordinances" element={<UserOrdinance/>} />
        <Route path="/user-resolutions" element={<UserResolution/>} />
        <Route path="/user-profile" element={<UserProfile/>} />
        <Route path="/add-new-profile" element={<UserAddProfile/>} />
        <Route path="/add-new-admin" element={<AdminAddProfile/>} />        
        <Route path="/add-ordinances" element={<UserAddOrdinance/>} />
        <Route path="/add-resolutions" element={<UserAddResolution/>} />

      </Routes>
    </Router>
  );
}

export default App;