import axios from 'axios';
import env from '../environment/environment';

const AuthService = {
  async signup(username, email, password) {
    try {
      const response = await axios.post(`${env.apiUrl}/api/auth/signup`, { username, email, password });
      return response.data;
    } catch (error) {
      throw error.response.data.msg || 'Une erreur s\'est produite lors de l\'inscription.';
    }
  },

  async login(email, password) {
    try {
      const response = await axios.post(`${env.apiUrl}/api/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response.data.msg || 'Une erreur s\'est produite lors de l\'inscription.';
    }
  }
};

export default AuthService;
