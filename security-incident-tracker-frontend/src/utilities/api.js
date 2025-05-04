const BASE_URL = 'http://localhost:8000/api/';

export async function registerUser(userData) {
  const res = await fetch(`${BASE_URL}register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res.json();
}

export async function createProfile(profileData) {
  const res = await fetch(`${BASE_URL}profiles/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  return res.json();
}

export async function getProfiles() {
  const res = await fetch(`${BASE_URL}profiles/`);
  return res.json();
}

export async function getProfile(id) {
  const res = await fetch(`${BASE_URL}profiles/${id}/`);
  return res.json();
}

export async function reportIncident(incidentData) {
    const token = localStorage.getItem('access');
  
    const response = await fetch('http://localhost:8000/api/incidents/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(incidentData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to report incident');
    }
  
    return await response.json();
  }
  