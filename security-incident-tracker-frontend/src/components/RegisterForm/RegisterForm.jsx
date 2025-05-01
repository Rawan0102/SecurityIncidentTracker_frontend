import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../ProfileForm/ProfileForm'; 


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // default role
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(1)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password: password, role }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <label>Username:</label>
        <input
          type="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select> */}

        <button type="submit">Register</button>
      </form>
      {/* <ProfileForm userId={userId} /> */}
    </div>

  );
}

export default RegisterForm;



// function HomePage() {
//   const userId = 1; 

//   return (
//     <div>
//       <h1>Welcome!</h1>
//       <ProfileForm userId={userId} />
//     </div>
//   );
// }