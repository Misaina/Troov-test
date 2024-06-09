import AuthService from "../services/authService";

export const auth = {
  namespaced: true,
  state: {
    token: null,
  },
  getters: {
    token: state => state.token
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    CLEAR_AUTH(state) {
      state.token = null;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const { token } = await AuthService.login(email, password);
        if (token) {
          localStorage.setItem('apiToken', token);
          commit('SET_TOKEN', token);
          return token;
        } else {
          throw new Error('Failed to login');
        }
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
    },
  },
};

