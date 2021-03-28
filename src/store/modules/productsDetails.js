import {
  SET_PRODUCT_DETAILS,
  SET_PRODUCT_DETAILS_ERROR_MSG,
  SET_LOADING,
} from './mutation-types';
import Axios from 'axios';

export default {
  state: () => ({
    productDetails: {},
    productDetailsErrorMsg: '',
  }),

  getters: {
    productDetails(state) {
      return state.productDetails;
    },
    productDetailsErrorMsg(state) {
      return state.productDetailsErrorMsg;
    },
  },

  mutations: {
    [SET_PRODUCT_DETAILS](state, value) {
      state.productDetails = value;
    },

    [SET_PRODUCT_DETAILS_ERROR_MSG](state, value) {
      state.productDetailsErrorMsg = value;
    },
  },

  actions: {
    fetchProductDetails({ commit, state }, id) {
      if (state.productDetails.id === id) {
        return;
      }
      commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/product/${id}`;
      Axios.get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(SET_PRODUCT_DETAILS, res.data.product);
            commit(SET_PRODUCT_DETAILS_ERROR_MSG, '');
          } else {
            commit(
              SET_PRODUCT_DETAILS_ERROR_MSG,
              '無法取得產品資訊！請再試試看'
            );
          }
          commit(SET_LOADING, false);
        })
        .catch(() => {
          commit(SET_PRODUCT_DETAILS_ERROR_MSG, '無法取得產品列表！請再試試看');
          commit(SET_LOADING, false);
        });
    },
  },
};
