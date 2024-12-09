import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Homepage'; // Assuming you have a Dashboard component
import './App.css';
import Home from "./components/Homemenu";
import Generaldepartment from "./components/Generaldepartment"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/general" element={<Generaldepartment />} />
       </Routes>
    </Router>
  );
}

export default App;
