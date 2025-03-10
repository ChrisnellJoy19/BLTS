import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import User from "./components/User";
import Admin from "./components/Admin";
import About_Us from "./components/About_Us";
<<<<<<< Updated upstream
=======
import GetStarted from "./components/GetStarted";
import DilgAdmin from "./components/DilgAdmin";
import LGUAdmin from "./components/LGUAdmin";
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userlogin" element={<User />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/adminlogin" element={<Admin />} /> 
        <Route path="/about" element={<About_Us />} /> 
<<<<<<< Updated upstream
=======
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/adminDILG" element={<DilgAdmin />} />
        <Route path="/adminLGU" element={<LGUAdmin />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
