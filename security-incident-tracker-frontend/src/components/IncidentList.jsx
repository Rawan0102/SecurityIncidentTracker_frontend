import React, { useEffect, useState } from 'react';
import './IncidentList.css';
import SeverityBadge from './SeverityBadge';
import '../App.css';
import { Link } from 'react-router-dom';
import CommentList from './CommentList';

function IncidentList({ user, role }) {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState(true); // 'open' or 'closed'
  useEffect(() => {
    const token = localStorage.getItem('access');
    const fetchIncidents = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/incidents/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
        //   console.log('data', data);
          let filtered = [];
          if (role === 'manager') {
            const manager = user.user_id;
            filtered = data.filter(
              (incident) =>
                incident.reporter === manager &&
                incident.resolved === statusFilter
            );
          } else if (role === 'employee') {
            const employee = user.user_id;
            filtered = data.filter(
              (incident) =>
                incident.assigned === employee &&
                incident.resolved === statusFilter
            );
          }
          setIncidents(filtered);
          console.log('filtered incidents', filtered);
        } else {
          setError('Failed to fetch incidents.');
        }
      } catch (err) {
        setError('Something went wrong while fetching incidents.');
        console.error(err);
      }
    };
    fetchIncidents();
  }, [user, role, statusFilter]);
  if (error) return <p className="error">{error}</p>;
  return (
    <div className="incident-list-container">
      <h2>
        {role === 'manager'
          ? 'My Incidents (Manager)'
          : role === 'employee'
          ? 'Assigned Incidents (Employee)'
          : 'Incidents'}
      </h2>
      <div className="status-toggle">
        <button
          onClick={() => setStatusFilter(false)}
          className={statusFilter === false ? 'active' : ''}
        >
          Open
        </button>
        <button
          onClick={() => setStatusFilter(true)}
          className={statusFilter === true ? 'acive' : ''}
        >
          Closed
        </button>
      </div>
      {incidents.length === 0 ? (
        <p>No {statusFilter} incidents found.</p>
      ) : (
        <div className="incident-grid">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident}role={role} />
          ))}
        </div>
      )}
    </div>
  );
}
function IncidentCard({ incident, role }) {
    return (
      <div className="incident-card">
        <Link to={`/incidents/${incident.id}`} state={{ role: role }}>
          <h3>{incident.title}</h3>
          <p>{incident.description}</p>
          <div className="info-row">
            <SeverityBadge level={incident.severity} />
            <span className="timestamp">
              {new Date(incident.created_at).toLocaleString()}
            </span>
          </div>
        </Link>
        <Link to={`/incidents/${incident.id}/reports`} state={{ role: role}}>
          See All Incident Reports
        </Link>
        {role === "employee" && (
          <>
            <Link to="/report" state={{ incident_id: incident.id}} className="create-report-button">
              + Create Report
            </Link>
          </>
        )}
      {/* :rocket: Show comments here */}
      {/* <CommentList reportId={incident.id} role={role} /> */}
    </div>
    );
  }
export default IncidentList;






