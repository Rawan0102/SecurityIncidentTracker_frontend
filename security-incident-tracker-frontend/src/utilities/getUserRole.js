export function getUserRole() {
    const token = localStorage.getItem('access');
    if (!token) return null;
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
  
    try {
      return JSON.parse(jsonPayload).role || null;
    } catch {
      return null;
    }
  }
  