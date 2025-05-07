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
import { jwtDecode } from "jwt-decode";
import IncidentDetail from './components/IncidentDetail';
import ReportList from './components/ReportList';
import ProfileForm from './components/ProfileForm/ProfileForm';
import CommentList from './components/CommentList';
import ReportDetails from './components/ReportDetails'; 

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser({ ...decoded, token });  // includes user info + token
        // console.log("Decoded user:", decoded);
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
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
        <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage user={currentUser} />} />
        <Route path="/new-incident" element={<IncidentForm />} />
        <Route path="/incidents" element={<IncidentList user={currentUser} />} />
        <Route path="/incidents/:id" element={<IncidentDetail user={currentUser?.username} role={currentUser?.role} />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
        <Route path="/report" element={<ReportIncidentForm />} />
        <Route path="/incidents/:incidentId/reports/" element={<ReportList user={currentUser}/>} />
        <Route path="/profile/new" element={<ProfileForm user={currentUser} />} />
        <Route path='/report/:reportId/comments' element={<CommentList />} />
        <Route path="/reports/:id" element={<ReportDetails user={currentUser} />} />
      </Routes>
    </>
  );
}

export default App;
