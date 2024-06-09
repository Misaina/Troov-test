import ObjectService from "../services/objectService";

export const objects = {
  namespaced: true,
  state: () => ({
    objects: []
  }),
  mutations: {
    SET_OBJECTS(state, objects) {
      state.objects = objects;
    },
    ADD_OBJECT(state, object) {
      state.objects.push(object);
    },
    UPDATE_OBJECT(state, updatedObject) {
      const index = state.objects.findIndex(obj => obj._id === updatedObject._id);
      if (index !== -1) {
        state.objects.splice(index, 1, updatedObject);
      }
    },
    DELETE_OBJECT(state, objectId) {
      state.objects = state.objects.filter(obj => obj._id !== objectId);
    }
  },
  actions: {
    async fetchObjects({ commit }) {
      try {
        const response = await ObjectService.findAll();
        commit('SET_OBJECTS', response.data);
      } catch (error) {
        throw error;
      }
    },
    async addObject({ commit }, objectData) {
      try {
        const response = await ObjectService.create(objectData);
        commit('ADD_OBJECT', response.data);
      } catch (error) {
        throw error;
      }
    },
    async updateObject({ commit }, objectData) {
      try {
        const response = await ObjectService.update(objectData._id, objectData)
        commit('UPDATE_OBJECT', response.data);
      } catch (error) {
        throw error;
      }
    },
    async deleteObject({ commit }, objectId) {
      try {
        await ObjectService.delete(objectId);
        commit('DELETE_OBJECT', objectId);
      } catch (error) {
        throw error;
      }
    }
  }
};
