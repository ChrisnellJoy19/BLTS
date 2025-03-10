import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Sign_Up from "./components/Sign_Up";
import About_Us from "./components/About_Us";
import './index.css'; // Make sure Tailwind is imported

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/signup" element={<Sign_Up />} /> 
          <Route path="/about" element={<About_Us />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
