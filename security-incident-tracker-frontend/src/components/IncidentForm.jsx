import React, { useState, useEffect } from 'react';

function IncidentForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'low',
    assigned: '',
  });
  const [users, setUsers] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Fetch users for dropdown
  useEffect(() => {
    const token = localStorage.getItem('access');
    async function fetchUsers() {
      try {
        const res = await fetch('http://localhost:8000/api/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
          console.log('Fetched users:', data);  // ✅ moved here
        } else {
          console.error('Failed to fetch users.');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    }
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');

    try {
      const response = await fetch('http://localhost:8000/api/incidents/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Incident reported successfully!');
        setFormData({ title: '', description: '', severity: 'low', assigned: '' });
        setError('');
      } else {
        const errorData = await response.json();
        setError('Failed to report incident.');
        console.error(errorData);
      }
    } catch (err) {
      setError('Something went wrong.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Report a Security Incident</h2>

      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Title:
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Description:
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />
      </label>

      <label>
        Severity:
        <select 
          name="severity" 
          value={formData.severity} 
          onChange={handleChange}
        >
          <option value="low">🟩 Low</option>
          <option value="medium">🟨 Medium</option>
          <option value="high">🟧 High</option>
          <option value="critical">🟥 Critical</option>
        </select>
      </label>

      <label>
        Assign To:
        <select 
          name="assigned" 
          value={formData.assigned} 
          onChange={handleChange}
        >
          <option value="">-- Select a user --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default IncidentForm;
