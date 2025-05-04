import React, { useEffect, useState } from 'react';
import './IncidentList.css';
import SeverityBadge from './SeverityBadge'; 
import '../App.css';

function IncidentList({ user, role }) {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Only fetch & filter if manager
    if (role !== 'manager') {
      setIncidents([]);
      return;
    }

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
          console.log('data',data)
          // filter incidents created by this manager
          const manager = user.username;
          console.log('manager', user)
          const myIncidents = data.filter(
            (incident) => incident.reporter === manager && incident.status === 'open'
          );
          setIncidents(myIncidents);
          console.log('incidents', incidents)
        } else {
          setError('Failed to fetch incidents.');
        }
      } catch (err) {
        setError('Something went wrong while fetching incidents.');
        console.error(err);
      }
    };

    fetchIncidents();
  }, [user, role]);

  if (error) return <p className="error">{error}</p>;

  if (role !== 'manager') {
    return null; // or a message like <p>Only managers see this list.</p>
  }

  return (
    <div className="incident-list-container">
      <h2>My Open Incidents</h2>
      {incidents.length === 0 ? (
        <p>No open incidents found.</p>
      ) : (
        <div className="incident-grid">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      )}
    </div>
  );
}

function IncidentCard({ incident }) {
  return (
    <div className="incident-card">
      <h3>{incident.title}</h3>
      <p>{incident.description}</p>
      <div className="info-row">
        <SeverityBadge level={incident.severity} />
        <span className="timestamp">
          {new Date(incident.created_at).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default IncidentList;