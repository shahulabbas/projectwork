import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook to handle redirection
import Logo from './Collagelogo.png';
import './navigation.css';
import Header from './Headerpage'; 
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Hook to navigate after login success

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost/admin/backend/login.php';  // URL for PHP backend

    let fData = new FormData();
    fData.append('username', username);
    fData.append('password', password);

    try {
      const response = await axios.post(url, fData);

      if (response.data.status === "success") {
        sessionStorage.setItem('username', username);
        navigate("/dashboard");  // Redirect to dashboard after login
      } else {
        // If login failed
        alert(response.data.message);
      }
    } catch (error) {
      // Handle any network or other errors
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container1">
      <Header/>
      <div className="logincontainer">
        <div className="box1">
          <img src={Logo} alt="Login" />
        </div>
        <div className="box2">
          <form onSubmit={handleSubmit}>
            <div className="text">
              <h1>Welcome</h1>
              <p>Please Login To Admin Dashboard</p>
            </div>
            <div className="input">
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                name='username'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="password">
                <div className="showpassword">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      const input = document.getElementById("password");
                      input.type = e.target.checked ? "text" : "password";
                    }}
                    style={{ marginRight: "5px" }}
                  />
                  <p>Show Password</p>
                </div>
                <a href="">Forgot Password?</a>
              </div>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
