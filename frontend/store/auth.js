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
      localStorage.setItem('apiToken', token);
    },
    CLEAR_AUTH(state) {
      state.token = null;
      localStorage.removeItem('apiToken');
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const data = await AuthService.login(email, password);
        if (data && data.token) {
          commit('SET_TOKEN', data.token);
          return data.token;
        } else {
          throw new Error('Failed to login');
        }
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
    }
  },
};

