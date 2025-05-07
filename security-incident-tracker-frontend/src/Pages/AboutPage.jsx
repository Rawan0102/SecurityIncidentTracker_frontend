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
        <h1> <strong> 🛠️ For Employees: </strong>Report incidents with just a few clicks. Whether it's a system glitch, a facility issue, or something that needs attention — we’ve got your back.</h1>
        <h1> <strong> 🧑‍💼 For Admins:  </strong>Get the full picture. Track all reports, manage responses, and keep things running like a well-oiled machine.</h1>
        <ul>
          <li>💬 Add comments, update details, and stay in the loop — collaboration made simple.</li>
          <li>🔐 Role-based access means your data stays secure, and the right people always see the right information.</li>
          <li>We’re all about making workflows smoother, communication clearer, and problem-solving faster.</li>
          <li> 
            <strong> Thanks for being part of a smarter, safer workspace. 💼✨ </strong> </li>
        </ul>
      </div>

      <p className="final-line">
        Start securing smarter. One report at a time. 🔐
      </p>
    </div>
  );
}

export default AboutPage;
