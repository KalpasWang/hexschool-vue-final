import {
  ADD_PRODUCT_TO_CART,
  SET_CART_ERROR_MSG,
  SET_LOADING,
} from './mutation-types';
import Axios from 'axios';

export default {
  state: () => ({
    cart: [],
    cartErrorMsg: '',
  }),

  getters: {
    cart(state) {
      return state.cart;
    },
    cartErrorMsg(state) {
      return state.cartErrorMsg;
    },
  },

  mutations: {
    [ADD_PRODUCT_TO_CART](state, value) {
      state.cart.push(value);
    },

    [SET_CART_ERROR_MSG](state, value) {
      state.cartErrorMsg = value;
    },
  },

  actions: {
    postProductToCart({ commit, state }, id) {
      if (state.cart.some((item) => item.id === id)) {
        return;
      }
      commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/cart`;
      Axios.post(path, { data: { product_id: id, qty: 1 } })
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(ADD_PRODUCT_TO_CART, res.data.data);
          } else {
            commit(SET_CART_ERROR_MSG, '加入購物車失敗！請再試試看');
          }
          commit(SET_LOADING, false);
        })
        .catch(() => {
          commit(SET_CART_ERROR_MSG, '無法加入購物車！請再試試看');
          commit(SET_LOADING, false);
        });
    },
  },
};
