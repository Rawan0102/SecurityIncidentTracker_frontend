import React, { useEffect, useState } from 'react';

function IncidentIndex() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('/api/incidents/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch incidents');
        }

        const data = await response.json();
        setIncidents(data);
      } catch (err) {
        console.error('Error fetching incidents:', err);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div className="incident-index">
      <h2>All Reported Incidents</h2>
      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Reported By</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.id}</td>
                <td>{incident.title}</td>
                <td>{incident.status}</td>
                <td>{incident.assigned_to?.username || 'Unassigned'}</td>
                <td>{incident.reported_by?.username || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IncidentIndex;
