import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import AboutPage from './Pages/AboutPage';
import NavBar from './components/NavBar/NavBar';
import ProfilePage from './Pages/ProfilePage';
import IncidentForm from './components/IncidentForm';
import IncidentList from './components/IncidentList';
import ReportIncidentForm from './components/ReportIncidentForm';

function App() {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setCurrentUser({ token });
      console.log(token)
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setCurrentUser(null);
  };

  return (
    <>
      <NavBar user={currentUser} onLogout={logoutHandler} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage user={currentUser} />} />
        <Route path="/report" element={<IncidentForm />} />
        <Route path="/incidents" element={<IncidentList />} />
        <Route path="/report" element={<ReportIncidentForm />} />

      </Routes>
    </>
  );
}

export default App;
