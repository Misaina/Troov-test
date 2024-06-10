import { jwtDecode } from 'jwt-decode';

export function isTokenExpired() {
  const token = localStorage.getItem('apiToken');
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;

    const expirationDate = new Date(exp * 1000);
    const currentDate = new Date();

    return currentDate >= expirationDate;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return true;
  }
}
