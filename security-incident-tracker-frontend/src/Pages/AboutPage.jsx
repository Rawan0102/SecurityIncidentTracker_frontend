import React from 'react';
import './AboutPage.css';

function AboutPage() {
  return (
    <div className="about-container">
      <h1>🛡️ About Security Incident Tracker</h1>
      <p>
        Welcome to <strong>Security Incident Tracker</strong> – your all-in-one solution for managing and tracking security issues!
      </p>

      <div className="features">
        <h2>🚀 Features:</h2>
        <ul>
          <li>📋 Log security incidents with ease</li>
          <li>🔍 Track and review reports</li>
          <li>📡 Check for data breaches via HaveIBeenPwned</li>
          <li>👨‍💼 Separate dashboards for employees & managers</li>
        </ul>
      </div>

      <p className="final-line">
        Start securing smarter. One report at a time. 🔐
      </p>
    </div>
  );
}

export default AboutPage;
