import React, { useState } from 'react';
import { reportIncident } from '../utilities/api';
import './ReportIncidentForm.css';


export default function ReportIncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    location: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportIncident(formData);
      setMessage('✅ Incident reported successfully!');
      setFormData({
        title: '',
        description: '',
        category: '',
        urgency: '',
        location: '',
      });
    } catch (error) {
      setMessage('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="report-incident-form">
      <h2>Report a Security Incident</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>

        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </label>

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Phishing">Phishing</option>
            <option value="Malware">Malware</option>
            <option value="Unauthorized Access">Unauthorized Access</option>
            <option value="Data Leak">Data Leak</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Urgency:
          <select name="urgency" value={formData.urgency} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <label>
          Location:
          <input name="location" value={formData.location} onChange={handleChange} />
        </label>

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}
