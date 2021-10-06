import {
  SET_PRODUCT_DETAILS,
  SET_PRODUCT_DETAILS_MSG,
  SET_LOADING,
} from './mutation-types';

export default {
  state: () => ({
    productDetails: {},
    productDetailsMsg: '',
  }),

  getters: {
    productDetails(state) {
      return state.productDetails;
    },
    productDetailsMsg(state) {
      return state.productDetailsMsg;
    },
  },

  mutations: {
    [SET_PRODUCT_DETAILS](state, value) {
      state.productDetails = value;
    },

    [SET_PRODUCT_DETAILS_MSG](state, value) {
      state.productDetailsMsg = value;
    },
  },

  actions: {
    async fetchProductDetails({ commit }, id) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/product/${id}`;

      try {
        commit(SET_PRODUCT_DETAILS_MSG, '');
        commit(SET_LOADING, true);
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_PRODUCT_DETAILS, res.data.product);
          commit(SET_LOADING, false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        commit(SET_PRODUCT_DETAILS_MSG, error.message);
        commit(SET_LOADING, false);
      }
    },
  },
};
