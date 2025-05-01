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
