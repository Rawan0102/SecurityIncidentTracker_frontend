import './HomePage.css';
import logo from '../assets/logo.png';
import React, { useEffect, useState } from 'react';

function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`home-container ${loaded ? 'fade-in' : ''}`}>
      <div className="right-side">
        <img src={logo} alt="Security Tracker Logo" className="logo" />
      </div>
      <div className="right-side">
        <h1 className="welcome">Welcome to Security Incident Tracker</h1>
        <p className="description">
          Track. Secure. Respond. A tool for managers and employees to log, track, and resolve
          security incidents. 
        </p>
      </div>
    </div>
  );
}

export default HomePage;
