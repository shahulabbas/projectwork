import React, { useEffect, useState } from 'react';
import Header from './Headerpage';
import Leftnavigation from './Leftnavigation';
import './homepage.css';
import { Navigate } from 'react-router-dom';

const Homepage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    console.log('Retrieved Username from sessionStorage:', storedUsername); // Debugging log
    setUsername(storedUsername);

    if (!storedUsername) {
      console.error('No username found in sessionStorage');
      Navigate('/');
      return;
    }
    }, []);

  return (
    <div className="container">
      <div className="top">
        <Header />
      </div>
      <div className="bottom">
        <div>
          <Leftnavigation />
        </div>
        <div className="dashboard">
          <div className="name">
          <h2>Welcome to the Dashboard</h2>
          {username ? (
            <p>Hello, {username}! You are logged in.</p>
          ) : (
            <p>Please log in to access this page.</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
