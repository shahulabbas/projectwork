import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./navigation.css";
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight, faBuilding, faCalendar, faGraduationCap, faBed, faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Home from './Homemenu';
import General from './Generaldepartment';
import CMEdepartment from './Cmedepartment';
import ECEdepartment from "./Ecedepartment";
import EEEdepartment from "./Eeedepartment";
import Mechdepartment from "./Mechdepartment";
import Generaldeptevents from "./Generaldeptevents";
const Leftnavigation = () => {
const navigate = useNavigate(); // Initialize useNavigate
  const handleLogout = () => {
    sessionStorage.removeItem("username"); // Clear session
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="main">
      <div className="left">
      
        <div className="dropdown-container">
          <div className="departments">
            <button className="home" onClick={() => navigate("/Home") }>
              HOME
              <FontAwesomeIcon icon={faHome} id="home" />
            </button>
          </div>

          <div className="departments department">
            <button className="toggleButton">
              <FontAwesomeIcon icon={faArrowDown} id="down" style={{ fontSize: '20px'}}/>
               DEPARTMENTS
              <FontAwesomeIcon icon={faBuilding} id="build" />
            </button>
            <div className="dept">
              <button onClick={() => navigate("/General") }>General Department</button>
              <button onClick={() => navigate("/CMEdepartment") }>CME Department</button>
              <button onClick={() => navigate("/ECEdepartment") }>ECE Department</button>
              <button onClick={() => navigate("/EEEdepartment") }>EEE Department</button>
              <button onClick={() => navigate("/Mechdepartment") }>MECH Department</button>
            </div>
          </div>

          <div className="departments">
            <button className="events">
              <FontAwesomeIcon icon={faArrowDown} id="down1" />
               EVENTS
              <FontAwesomeIcon icon={faCalendar} id="event" />
            </button>
            <div className="event">
              <button onClick={() => navigate("/Generaldeptevents") }>General Department</button>
              <button>CME Department</button>
              <button>ECE Department</button>
              <button>EEE Department</button>
              <button>MECH Department</button>
            </div>
          </div>

          <div className="departments">
            <button className="acadamic">
              ACADEMICS
              <FontAwesomeIcon icon={faGraduationCap} id="acadamic" />
            </button>
          </div>

          <div className="departments">
            <button className="hostel">
              HOSTEL
              <FontAwesomeIcon icon={faBed} id="hostel" />
            </button>
          </div>

          <div className="departments">
            <button className="logout" onClick={handleLogout}>
              LOGOUT
              <FontAwesomeIcon icon={faRightFromBracket} id="logout" />
            </button>
          </div>
        </div>
      </div>

      <div className="right-content">
       
      </div>
    </div>
  );
};

export default Leftnavigation;
