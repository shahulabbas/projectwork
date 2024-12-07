import React, { useState, useEffect } from "react"; // <-- Add useState here
import "./navigation.css"; 
import $ from "jquery";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowRight, faBuilding, faCalendar, faGraduationCap, faBed, faHome } from '@fortawesome/free-solid-svg-icons';
import Admin from '../images/admin.png';
import Home from './Homemenu';

const Leftnavigation = () => {
  // Add state hooks
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Make the GET request to the PHP endpoint that retrieves the session data
        const response = await fetch("http://localhost/admin/backend/adminprofile.php");
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        if (data.username) {
          setUsername(data.username); // Set the fetched username to state
        } else {
          setError(data.error || "Failed to fetch username");
        }
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);

  // jQuery logic
  useEffect(() => {
    $(".homecontainer").show(); 
    $(".other-container").hide(); 

    $(".dept").show(); 
    $(".event").show(); 
    $("#right").hide();
    $("#right1").hide();

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

  const showHomeComponent = () => {
    $(".homecontainer").show(); 
    $(".other-container").hide(); 
  };

  return (
    <div className="main">
      <div className="left">
        <div className="image">
          <img src={Admin} alt="Admin" />
        </div>
        <div className="dropdown-container">
          <div className="departments">
            <button className="home" onClick={showHomeComponent}>
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
        </div>
      </div>

      <div className="right-content">
        <div className="adminpage">
          <div>
            {loading ? (
              <p>Loading...</p> // Show loading message while fetching
            ) : error ? (
              <p>Error: {error}</p> // Show error message if fetching fails
            ) : (
              <p>Welcome {username}</p> // Show username after successful fetch
            )}
          </div>
        </div>

        <div className="homecontainer">
          <Home />
        </div>

        <div className="other-container">
          Select an option from the menu to view its content.
        </div>
      </div>
    </div>
  );
};

export default Leftnavigation;
