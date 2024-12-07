import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./navigation.css";
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight, faBuilding, faCalendar, faGraduationCap, faBed, faHome, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Admin from '../images/admin.png';
import Home from './Homemenu';

const Leftnavigation = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // jQuery logic
  useEffect(() => {
    $(".other-container").hide();

    $(".dept").hide();
    $(".event").hide();
    $("#down").hide();
    $("#down1").hide();

    $(".toggleButton").on("click", () => {
      $(".dept").toggle();
      $("#down").toggle();
      $("#right").toggle();
    });

    $(".events").on("click", () => {
      $(".event").toggle();
      $("#down1").toggle();
      $("#right1").toggle();
    });

    return () => {
      $(".toggleButton").off("click");
      $(".events").off("click");
    };
  }, []);

 

  const handleLogout = () => {
    sessionStorage.removeItem("username"); // Clear session
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="main">
      <div className="left">
        <div className="image">
          <img src={Admin} alt="Admin" />
        </div>
        <div className="dropdown-container">
          <div className="departments">
            <button className="home" onClick={() => navigate("/Home") }>
              HOME
              <FontAwesomeIcon icon={faHome} id="home" />
            </button>
          </div>

          <div className="departments department">
            <button className="toggleButton">
              <FontAwesomeIcon icon={faArrowDown} id="down" />
              <FontAwesomeIcon icon={faArrowRight} id="right" />
              DEPARTMENTS
              <FontAwesomeIcon icon={faBuilding} id="build" />
            </button>
            <div className="dept">
              <button>General Department</button>
              <button>CME Department</button>
              <button>ECE Department</button>
              <button>EEE Department</button>
              <button>MECH Department</button>
            </div>
          </div>

          <div className="departments">
            <button className="events">
              <FontAwesomeIcon icon={faArrowDown} id="down1" />
              <FontAwesomeIcon icon={faArrowRight} id="right1" />
              EVENTS
              <FontAwesomeIcon icon={faCalendar} id="event" />
            </button>
            <div className="event">
              <button>General Department</button>
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
