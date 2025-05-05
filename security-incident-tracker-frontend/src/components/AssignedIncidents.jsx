import React, { useEffect, useState } from 'react';

function AssignedIncidents({ employeeId }) {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const token = localStorage.getItem('token'); // If using JWT auth
        const response = await fetch(`/api/incidents?assignedTo=${employeeId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // optional: remove if not using JWT
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assigned incidents');
        }

        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching assigned incidents:', error);
      }
    };

    fetchIncidents();
  }, [employeeId]);

  return (
    <div className="incident-list">
      <h2>Incidents Assigned to You</h2>
      {incidents.length === 0 ? (
        <p>No incidents assigned.</p>
      ) : (
        <ul>
          {incidents.map((incident) => (
            <li key={incident.id}>
              <strong>{incident.title}</strong> — {incident.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AssignedIncidents;
