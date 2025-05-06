import sendRequest from './sendRequest';

const BASE_URL =`http://127.0.0.1:8000/api`;

export function createReport(reportData, id) {
  return sendRequest(`${BASE_URL}/incidents/${id}/reports/`, 'POST', reportData);
}

export function getProfiles() {
  return sendRequest(`${BASE_URL}/profiles/`);
}