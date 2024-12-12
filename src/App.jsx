import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Homepage'; // Assuming you have a Dashboard component
import './App.css';
import Home from "./components/Homemenu";
import Generaldepartment from "./components/Generaldepartment";
import Cmedepartment from './components/Cmedepartment';
import ECEdepartment from './components/Ecedepartment';
import EEEdepartment from './components/Eeedepartment';
import Mechdepartment from './components/Mechdepartment';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/general" element={<Generaldepartment />} />
        <Route path="/CMEdepartment" element={<Cmedepartment />} />
        <Route path="/ECEdepartment" element={<ECEdepartment />} />
        <Route path="/EEEdepartment" element={<EEEdepartment />} />
        <Route path="/Mechdepartment" element={<Mechdepartment />} />
       </Routes>
    </Router>
  );
}

export default App;
