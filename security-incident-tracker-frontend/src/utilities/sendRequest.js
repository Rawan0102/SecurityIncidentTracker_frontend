export default async function sendRequest(url, method = 'GET', payload) {
    const token = localStorage.getItem('access'); 
    const options = { method };
  
    if (payload) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  
    if (token) {
      options.headers = options.headers || {};
      options.headers.Authorization = `Bearer ${token}`;
    }
  
    try {
      const res = await fetch(url, options);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Request failed');
      }
      return res.json();
    } catch (err) {
      console.error('Error in sendRequest:', err);
      throw err;
    }
  }
//   const response = await fetch('http://localhost:8000/api/incidents/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(formData), 
//   });
  
  
// export default async function sendRequest(url, method = 'GET', body = null) {
//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('access')}`, 
//         },
//         body: body ? JSON.stringify(body) : null,
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       console.log(response)
//       return response.json();
//     } catch (error) {
//       console.error('Error in sendRequest:', error);
//       throw error;  
//     }
//   }
  