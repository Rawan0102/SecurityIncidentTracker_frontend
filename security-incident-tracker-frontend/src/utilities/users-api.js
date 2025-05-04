import sendRequest from './sendRequest';

const BASE_URL =`http://127.0.0.1:8000/api`;

export function registerUser(userData) {
  return sendRequest(`${BASE_URL}/register/`, 'POST', userData);
}

export function loginUser(credentials) {
  return sendRequest(`${BASE_URL}/token/`, 'POST', credentials);
}

export function createProfile(profileData) {
  return sendRequest(`${BASE_URL}/profiles/`, 'POST', profileData);
}

export function getProfiles() {
  return sendRequest(`${BASE_URL}/profiles/`);
}

export function getProfile(id) {
  return sendRequest(`${BASE_URL}/profiles/${id}/`);
}

export function updateProfile(id, profileData) {
    return sendRequest(`${BASE_URL}/profiles/${id}/`, 'PUT', profileData);
  }
  
  export function deleteProfile(id) {
    return sendRequest(`${BASE_URL}/profiles/${id}/`, 'DELETE');
  }

  export function getMyProfile() {
    return sendRequest(`${BASE_URL}/profiles/me/`, 'GET');
  }

  