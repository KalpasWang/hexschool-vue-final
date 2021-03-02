import { SETLOADING } from './mutation-types';

export default {
  state: () => ({
    loading: false,
  }),

  getters: {
    isLoading(state) {
      return state.loading;
    },
  },

  mutations: {
    [SETLOADING](state, value) {
      state.loading = value;
    },
  },
};
