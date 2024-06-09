import Vuex from 'vuex';
import { auth } from './auth';
import { objects } from './objects';

const createStore = () => {
  return new Vuex.Store({
    modules: {
      auth,
      objects
    },
  });
};

export default createStore;
