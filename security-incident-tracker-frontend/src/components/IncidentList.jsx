import React, { useEffect, useState } from 'react';
import './IncidentList.css';
import SeverityBadge from './SeverityBadge'; 
import '../App.css'

function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchIncidents = async () => {
      const token = localStorage.getItem('access');

      try {
        const response = await fetch('http://localhost:8000/api/incidents/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIncidents(data);
        } else {
          setError('Failed to fetch incidents.');
        }
      } catch (err) {
        setError('Something went wrong while fetching incidents.');
        console.error(err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div>
      <h2>Reported Incidents</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              <strong>{incident.title}</strong> — {incident.severity}<br />
              <em>{incident.description}</em><br />
              Reported on: {new Date(incident.created_at).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function IncidentCard({ incident }) {
  return (
    <div className="incident-card">
      <h3>{incident.title}</h3>
      <p>{incident.description}</p>
      <SeverityBadge level={incident.severity} />
    </div>
  );
}




export default IncidentList;
