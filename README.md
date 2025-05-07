# Security Incident Tracker - Frontend

This is the frontend client for the **Security Incident Tracker** application, built with React. It allows users to report, track, and manage security-related incidents. The app consumes a Django REST API and provides a dynamic and secure interface with user authentication, routing, and full CRUD functionality.

## ⚙️ Tech Stack

- **React 18+** – component-based SPA
- **Vite** – fast build tool
- **React Router DOM** – client-side routing
- **JWT Token Authentication**
- **Docker** – containerized deployment


## 🔗 Backend Repo

[Link to Backend Repository](https://github.com/Rawan0102/SecurityIncidentTracker_backend)

## 🌍 Live Deployment

[Live Site URL](http://localhost:5173/)

## 🐳 Docker Installation Instructions

1. Ensure **WSL2** is enabled.  
   👉 [WSL2 Installation Guide](https://learn.microsoft.com/en-us/windows/wsl/install)

2. Download **Docker Desktop for Windows**:  
   👉 [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

3. Run the installer and follow the setup prompts.

4. After installation, start Docker Desktop.

5. Confirm Docker is installed by running the following commands in PowerShell:

   ```powershell
   docker --version
   docker compose version

## ✅ Core Features

- User Authentication using JWT (Login, Signup, Logout)
- Submit, Edit, and Delete Security Incidents
- Detail page for each incident
- Admin role "manager" can view all submitted reports
- Responsive and accessible UI using CSS
- React Router for smooth client-side navigation
- Communication with Django REST API 
- Protected routes for authenticated users

---
| **Path**                          | **Component**        | **Purpose**                                       |
| --------------------------------- | -------------------- | ------------------------------------------------- |
| `/`                               | `HomePage`           | Landing page with app overview or welcome content |
| `/register`                       | `RegisterForm`       | Allows new users to create an account             |
| `/login`                          | `LoginForm`          | User login page, sets `currentUser` on success    |
| `/about`                          | `AboutPage`          | Displays information about the app                |
| `/profile`                        | `ProfilePage`        | Shows current user's profile info                 |
| `/profile/new`                    | `ProfileForm`        | Form to create or edit user profile               |
| `/new-incident`                   | `IncidentForm`       | Form to report a new incident                     |
| `/incidents`                      | `IncidentList`       | Displays a list of all incidents                  |
| `/incidents/:id`                  | `IncidentDetail`     | Shows detailed view of a selected incident        |
| `/report`                         | `ReportIncidentForm` | Form to add a new report linked to an incident    |
| `/incidents/:incidentId/reports/` | `ReportList`         | Lists reports for a specific incident             |
| `/reports/:id`                    | `ReportDetails`      | Shows and allows editing of a specific report     |
| `/report/:reportId/comments`      | `CommentList`        | Displays comments under a report                  |


## ❄️ IceBox Features (Planned/Future)

- [ ] Real-time updates with WebSockets
- [ ] Export incident reports to CSV or PDF
- [ ] Role-based access UI (Admin, Security Analyst, Viewer)
- [ ] Email notifications for critical incidents
- [ ] Incident timeline or calendar view
- [ ] Full PWA support (offline access, installable)
- [ ] WCAG-compliant accessibility
- [ ] Advanced filtering and search functionality