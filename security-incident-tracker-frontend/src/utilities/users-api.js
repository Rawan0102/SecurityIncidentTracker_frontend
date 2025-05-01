import sendRequest from './sendRequest';

const BASE_URL = '/api';

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
