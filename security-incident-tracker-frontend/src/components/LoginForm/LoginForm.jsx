import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginForm.css';
import { jwtDecode } from 'jwt-decode';
import Login from "../../assets/login2.jpg";


function LoginForm({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);

      const decoded = jwtDecode(data.access);
      setCurrentUser({ ...decoded, token: data.access });
      navigate('/profile');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
      <img src={Login} alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <h2>Welcome Back</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Sign In</button>
          </form>
          <p className="signup-link">
            Don’t have an account yet? <a href="/register">Create one</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
