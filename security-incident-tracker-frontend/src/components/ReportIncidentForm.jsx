import React, { useState } from 'react';
// import { reportIncident } from '../utilities/api';
import { createReport } from '../utilities/report-api';
import './ReportIncidentForm.css';
import { useLocation } from 'react-router-dom';



export default function ReportIncidentForm() {
  const location = useLocation();
  const incidentId = location.state?.incident_id;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    location: '',
    incident: incidentId
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
      if (!incidentId) {
        setMessage("❌ No incident ID provided.");
        return;
      }
    console.log(formData)
      await createReport({
        ...formData,
        // incident: incidentId,  // 💡 This ties the report to the correct incident
      }, incidentId);
  
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
            <option value="phishing">Phishing</option>
            <option value="malware">Malware</option>
            <option value="unauthorized access">Unauthorized Access</option>
            <option value="data leak">Data Leak</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Urgency:
          <select name="urgency" value={formData.urgency} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
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
