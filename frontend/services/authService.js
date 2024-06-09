import axios from 'axios';
import env from '../environment/environment';
import { throwError } from '../utils/throwError';

const AuthService = {
  async signup(username, email, password) {
    try {
      const response = await axios.post(`${env.apiUrl}/api/auth/signup`, { username, email, password });
      return response.data;
    } catch (error) {
      throwError(error);
    }
  },

  async login(email, password) {
    try {
      const response = await axios.post(`${env.apiUrl}/api/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throwError(error);
    }
  }
};

export default AuthService;
