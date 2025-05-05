// import React, { useEffect, useState } from 'react';
// import { createProfile, fetchIncidents, fetchUserProfile } from '../../utilities/api';
// import ProfileForm from './ProfileForm';

// export default function ProfilePage({ user }) {
//   const [profile, setProfile] = useState(null);
//   const [incidents, setIncidents] = useState([]);
//   const [error, setError] = useState('');


//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const data = await fetchUserProfile(user.id); // <- assumes this hits your backend `/api/profile/`
//         setProfile(data);
//       } catch (err) {
//         setProfile(null); // if not found
//       }
//     };

//     loadProfile();
//   }, [user.id]);


//   useEffect(() => {
//     const loadIncidents = async () => {
//       if (profile?.role === 'employee') {
//         try {
//           const data = await fetchIncidents(); // <- assumes /api/incidents/ returns all
//           const assigned = data.filter((i) => i.assigned === user.username);
//           setIncidents(assigned);
//         } catch (err) {
//           setError('Failed to load incidents');
//         }
//       }
//     };

//     loadIncidents();
//   }, [profile, user.username]);

//   // Handle profile creation
//   const handleProfileCreated = (newProfile) => {
//     setProfile(newProfile);
//   };

//   return (
//     <div className="profile-container">
//       {!profile ? (
//         <ProfileForm userId={user.id} onProfileCreated={handleProfileCreated} />
//       ) : (
//         <>
//           <h1>Welcome,</h1>
//           <p><strong>Role:</strong> {profile.role}</p>
//           <p><strong>Bio:</strong> {profile.bio}</p>
//           <p><strong>Location:</strong> {profile.location}</p>

//           {profile.role === 'employee' && (
//             <>
//               <h3>Your Assigned Incidents</h3>
//               {error && <p>{error}</p>}
//               {incidents.length === 0 ? (
//                 <p>No incidents assigned to you.</p>
//               ) : (
//                 <ul>
//                   {incidents.map((incident) => (
//                     <li key={incident.id}>
//                       <strong>{incident.title}</strong> – {incident.status}
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// }
