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
  
      // ✅ Check for 204 No Content BEFORE attempting to parse JSON
      if (res.status === 204) {
        return null;
      }
  
      if (!res.ok) {
        const errorData = await res.json(); // this line caused your error
        throw new Error(errorData.detail || 'Request failed');
      }
  
      return await res.json(); // only parse if response is OK and has body
    } catch (err) {
      console.error('Error in sendRequest:', err);
      throw err;
    }
  }
  
// export default async function sendRequest(url, method = 'GET', payload) {
//     const token = localStorage.getItem('access');
  
//     const headers = {
//       'Content-Type': 'application/json',
//     };
  
//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }
  
//     const options = {
//       method,
//       headers,
//     };
  
//     if (payload) {
//       options.body = JSON.stringify(payload);
//     }
  
//     try {
//       const res = await fetch(url, options);
//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.detail || 'Request failed');
//       }
//       return res.json();
//     } catch (err) {
//       console.error('Error in sendRequest:', err);
//       throw err;
//     }
//   }
  