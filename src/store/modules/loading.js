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
};
