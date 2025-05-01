// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import HomePage from './components/HomePage';
// import RegisterForm from './components/RegisterForm/RegisterForm';
// import LoginForm from './components/LoginForm/LoginForm';
// import AboutPage from './Pages/AboutPage';
// import NavBar from './components/NavBar/NavBar';
// function App() {
//   return (
//     <>
//       <NavBar user={currentUser} onLogout={logoutHandler} />
//     <Routes>
//       <Route path="/" element={<HomePage />} />
//       <Route path="/register" element={<RegisterForm />} />
//       <Route path="/login" element={<LoginForm />} />
//       <Route path="/about" element={<AboutPage />} />
//     </Routes>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import AboutPage from './Pages/AboutPage';
import NavBar from './components/NavBar/NavBar';
import ProfileForm from './components/ProfileForm/ProfileForm';

function App() {
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setCurrentUser({ token });
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

      </Routes>
    </>
  );
}

export default App;
