import './HomePage.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import React from 'react';

function HomePage() {
    return (
      <div className="home-container">
        <img src={logo} alt="Security Tracker Logo" className="logo" />
        <h1 className="title">Security Incident Tracker</h1>
        <p className="tagline">Track. Secure. Respond.</p>
  
        <div className="buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
  
        <p className="description">
          A simple tool for managers and employees to log, track, and resolve security incidents.
          Check breach data automatically using HaveIBeenPwned API.
        </p>
      </div>
    );
  }
  
  export default HomePage;