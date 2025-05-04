
// import React, { useEffect, useState } from 'react'; 
// import { NavLink, useNavigate } from 'react-router-dom';
// import './NavBar.css';
// import logo from "../../assets/Logo.png";


// export default function NavBar({ user, onLogout }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     onLogout();
//     navigate('/');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         <NavLink to="/" className="logo-link">
//           <img src={logo} alt="Logo" className="navbar-logo" />
//           <span className="app-name">SIT</span>
//         </NavLink>
//       </div>

//       <ul className="navbar-right">
//         <li>
//           <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
//             About
//           </NavLink>
//         </li>
//         {!user && (
//           <>
//             <li>
//               <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
//                 Login
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
//                 Register
//               </NavLink>
//             </li>
//           </>
//         )}
//         {user && user.role === 'manager' && (
//           <>
//             <li>
//               <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
//                 Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/incidents/new" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
//                 New Incident
//               </NavLink>
//             </li>
//           </>
//         )}
//         {user && user.role === 'employee' && (
//           <li>
//             <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
//               My Incidents
//             </NavLink>
//           </li>
//         )}
//         {user && (
//           <li>
//             <button onClick={handleLogout} className="nav-item logout-btn">
//               Logout
//             </button>
//           </li>
//         )}
//       </ul>
//     </nav>
// );
// }

// export default function Navbar() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const storedMode = localStorage.getItem('darkMode') === 'true';
//     setDarkMode(storedMode);
//     document.body.classList.toggle('dark-mode', storedMode);
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem('darkMode', newMode);
//     document.body.classList.toggle('dark-mode', newMode);
//   };

//   return (
//     <nav className="navbar">
//       <h1>Security Tracker</h1>
//       <button className="dark-toggle" onClick={toggleDarkMode}>
//         {darkMode ? '☀️ Light' : '🌙 Dark'}
//       </button>
//     </nav>
//   );
// }

import React, { useEffect, useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from "../../assets/Logo.png";

export default function NavBar({ user, onLogout }) {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(storedMode);
    document.body.classList.toggle('dark-mode', storedMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode', newMode);
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <span className="app-name">SIT</span>
        </NavLink>
      </div>

      <ul className="navbar-right">
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            About
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && user.role === 'manager' && (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/incidents/new" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                New Incident
              </NavLink>
            </li>
          </>
        )}
        {user && user.role === 'employee' && (
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              My Incidents
            </NavLink>
          </li>
        )}
        {user && (
          <li>
            <button onClick={handleLogout} className="nav-item logout-btn">
              Logout
            </button>
          </li>
        )}
        <li>
          <button onClick={toggleDarkMode} className="nav-item dark-toggle">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
      </ul>
    </nav>
  );
}
