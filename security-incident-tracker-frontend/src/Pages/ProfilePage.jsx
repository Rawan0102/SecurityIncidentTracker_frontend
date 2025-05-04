import React, { useState, useEffect } from 'react';
import { getMyProfile } from '../utilities/users-api';
// import './ProfilePage.css';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const token = localStorage.getItem('access');
//         const data = await getProfile('me'); 
//         setProfile(data);
//       } catch (err) {
//         setError('Could not load profile');
//       }
//     }
//     fetchProfile();
//   }, []);

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
      <h1>Welcome, {profile.user.username}</h1>
      <p><strong>Role:</strong> {profile.role}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Location:</strong> {profile.location}</p>
    </div>
  );
}
