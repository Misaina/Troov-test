import AuthService from "../services/authService";

export const state = () => ({
  token: null
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  }
};

export const actions = {
  async login({ commit }, userData) {
    try {
      const response = await AuthService.login(userData.email, userData.password);
      commit('SET_TOKEN', response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }
};

export const namespaced = true;
