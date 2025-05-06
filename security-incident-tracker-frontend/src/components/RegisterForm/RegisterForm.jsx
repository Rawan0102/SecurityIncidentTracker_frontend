import React, { useState } from 'react';
import './RegisterForm.css';
import { useNavigate } from 'react-router-dom';
import Login from "../../assets/login2.jpg"; // same image as login
// import ProfileForm from '../ProfileForm/ProfileForm'; (optional)

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
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
    <div className="login-container">
      <div className="login-left">
        <img src={Login} alt="Register" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <h2>Create Account</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input
              type="text"
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

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

