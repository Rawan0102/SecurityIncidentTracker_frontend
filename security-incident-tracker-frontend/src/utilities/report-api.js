import sendRequest from './sendRequest';

const BASE_URL =`http://127.0.0.1:8000/api`;

export function createReport(reportData, id) {
  return sendRequest(`${BASE_URL}/incidents/${id}/reports/`, 'POST', reportData);
}

export function getAllReports(incidentId) {
    return sendRequest(`${BASE_URL}/incidents/${incidentId}/reports/`);
  }

export function getReportById(reportId) {
    return sendRequest(`${BASE_URL}/reports/${reportId}/`, 'GET');
  }
  
export function updateReport(reportId, data) {
    return sendRequest(`${BASE_URL}/reports/${reportId}/`, 'PUT', data);
  }
  
export function deleteReport(reportId) {
    return sendRequest(`${BASE_URL}/reports/${reportId}/`, 'DELETE');
  }

export function createComment(commentData, reportId) {
    return sendRequest(`${BASE_URL}/reports/${reportId}/comments/`, 'POST', commentData);
  }
  
export function getComments(reportId) {
    return sendRequest(`${BASE_URL}/reports/${reportId}/comments/`);
  }


  

