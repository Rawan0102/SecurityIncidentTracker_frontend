import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../utilities/users-api';
import { Link } from 'react-router-dom';
import './ProfilePage.css';
import IncidentList from '../components/IncidentList';


export default function ProfilePage({user}) {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
console.log(user)
  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        setError('Could not load profile: ' + err.message);
      }
    }
    fetchProfile();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <h1>Welcome, {user.username}</h1>

      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Location:</strong> {profile.location}</p>

      {/* Show link only if role is manager */}
      {profile.role === 'manager' &&  (
        <div>
          <h3>Need to file something?</h3>
          <p>As a manager, you can create new incident reports.</p>
          <Link to="/report">➕ Create New Incident</Link>
        </div>
      )}

      {/* ✅ Show manager's own open incidents */}
      {profile.role === 'manager' && (
        <div className="incident-section">
          <h2>My Open Incidents</h2>
          <IncidentList user={user} role={profile.role} />
        </div>
      )}
      {profile.role === 'employee' && (
        <div className="incident-section">
          <h2>My Open Incidents</h2>
          <IncidentList user={user} role={profile.role} />
        </div>
      )}
    </div>
  );
}