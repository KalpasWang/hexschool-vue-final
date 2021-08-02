import { SET_LOADING } from './mutation-types';

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
    [SET_LOADING](state, value) {
      state.loading = value;
    },
  },

  actions: {
    startLoading({ commit }) {
      commit(SET_LOADING, true);
    },

    endLoading({ commit }) {
      commit(SET_LOADING, false);
    },
  },
};
