import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './IncidentDetail.css'; 

function IncidentDetail({ user}) {
  const { id } = useParams();
  const location = useLocation()
  const {role} = location.state || {}
  const [status, setStatus] = useState(true)
  const [incident, setIncident] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('access');
  console.log(role)
  useEffect(() => {
    async function fetchIncident() {
      try {
        const res = await fetch(`http://localhost:8000/api/incidents/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIncident(data);
        setFormData(data);
      } catch (err) {
        setError('Failed to load incident.');
      }
    }
    fetchIncident();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (formData.resolved === "true" || formData.resolved == "false") {
        formData.resolved = JSON.parse(formData.resolved);
    }
    console.log(formData)
    try {
      const res = await fetch(`http://localhost:8000/api/incidents/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Incident updated successfully.');
        // navigate(-1);
      } else {
        alert('Failed to update incident.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this incident?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8000/api/incidents/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        alert('Incident deleted.');
        navigate('/');
      } else {
        alert('Failed to delete incident.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <p>{error}</p>;
  if (!incident) return <p>Loading...</p>;

  return (
    <div className="incident-detail-container">
      <h2>Incident Detail</h2>

      <div className="incident-info">
        <p><strong>Title:</strong> {incident.title}</p>
        <p><strong>Description:</strong> {incident.description}</p>
        <p><strong>Severity:</strong> {incident.severity}</p>
        <p><strong>Status:</strong> {incident.status}</p>
        <p><strong>Assigned To:</strong> {incident.assigned_username}</p>
        <p><strong>Created:</strong> {new Date(incident.created_at).toLocaleString()}</p>
      </div>

      <hr />
      <h3>Edit Incident</h3>
      <form className="incident-form" onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title || ''} onChange={handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description || ''} onChange={handleChange} />
        </label>
        <label>
          Severity:
          <select name="severity" value={formData.severity || ''} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </label>
        <label>
          Status:
          <select name="resolved" value={formData.resolved || ''} onChange={handleChange}>
            <option value="true">Open</option>
            <option value="false">Closed</option>
          </select>
        </label>
        <div style={{ marginTop: '15px' }}>
          <button type="submit">Update Incident</button>
          {role === 'manager' && (
            <button type="button" onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
              Delete Incident
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default IncidentDetail;