import {
  ADD_PRODUCT_TO_CART,
  SET_CART_MSG,
  SET_CART_MSG_TYPE,
  SET_LOADING,
} from './mutation-types';
import Axios from 'axios';

export default {
  state: () => ({
    cart: [],
    cartMsg: '',
    cartMsgType: '',
  }),

  getters: {
    cart(state) {
      return state.cart;
    },
    cartMsg(state) {
      return state.cartMsg;
    },
    cartMsgType(state) {
      return state.cartMsgType;
    },
  },

  mutations: {
    [ADD_PRODUCT_TO_CART](state, value) {
      state.cart = value;
    },

    [SET_CART_MSG](state, value) {
      state.cartMsg = value;
    },

    [SET_CART_MSG_TYPE](state, value) {
      state.cartMsgType = value;
    },
  },

  actions: {
    getCart({ commit }) {
      // commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/cart`;
      Axios.get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(ADD_PRODUCT_TO_CART, res.data.data);
          } else {
            commit(SET_CART_MSG, '取得購物車失敗！請再試試看');
            commit(SET_CART_MSG_TYPE, 'error');
          }
          // commit(SET_LOADING, false);
        })
        .catch(() => {
          commit(SET_CART_MSG, '無法取得購物車！請再試試看');
          commit(SET_CART_MSG_TYPE, 'error');
          // commit(SET_LOADING, false);
        });
    },
    postProductToCart({ commit, dispatch }, { id, qty }) {
      // if (state.cart.carts.some((item) => item.product_id === id)) {
      //   return;
      // }
      commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/cart`;
      Axios.post(path, { data: { product_id: id, qty: qty } })
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            dispatch('getCart');
            commit(SET_CART_MSG, '加入購物車成功！');
            commit(SET_CART_MSG_TYPE, 'success');
          } else {
            commit(SET_CART_MSG, '加入購物車失敗！請再試試看');
            commit(SET_CART_MSG_TYPE, 'error');
          }
          commit(SET_LOADING, false);
        })
        .catch(() => {
          commit(SET_CART_MSG, '無法加入購物車！請再試試看');
          commit(SET_CART_MSG_TYPE, 'error');
          commit(SET_LOADING, false);
        });
    },
  },
};
