import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Sign_Up from "./components/Sign_Up";
import About_Us from "./components/About_Us";
import GetStarted from "./components/GetStarted";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/signup" element={<Sign_Up />} /> 
        <Route path="/about" element={<About_Us />} /> 
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </Router>
  );
}

export default App;
