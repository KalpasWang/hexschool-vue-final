import {
  ADD_PRODUCT_TO_CART,
  SET_ORDER,
  SET_CART_MSG,
  SET_CART_MSG_TYPE,
  SET_DROPDOWN_SHOW,
  SET_LOADING,
} from './mutation-types';
import Axios from 'axios';

export default {
  state: () => ({
    cart: [],
    order: {},
    isDropdownShow: false,
    cartMsg: '',
    cartMsgType: '',
  }),

  getters: {
    cart(state) {
      return state.cart;
    },
    order(state) {
      return state.order;
    },
    cartMsg(state) {
      return state.cartMsg;
    },
    cartMsgType(state) {
      return state.cartMsgType;
    },
    isDropdownShow(state) {
      return state.isDropdownShow;
    },
  },

  mutations: {
    [ADD_PRODUCT_TO_CART](state, value) {
      state.cart = value;
    },

    [SET_ORDER](state, value) {
      state.order = value;
    },

    [SET_CART_MSG](state, value) {
      state.cartMsg = value;
    },

    [SET_CART_MSG_TYPE](state, value) {
      state.cartMsgType = value;
    },

    [SET_DROPDOWN_SHOW](state, value) {
      state.isDropdownShow = value;
    },
  },

  actions: {
    showDropdown({ commit }) {
      commit(SET_DROPDOWN_SHOW, true);
    },
    closeDropdown({ commit }) {
      commit(SET_DROPDOWN_SHOW, false);
    },
    getCart({ commit }) {
      // commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/cart`;
      return Axios.get(path)
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
      commit(SET_CART_MSG, '');
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/cart`;
      return Axios.post(path, { data: { product_id: id, qty: qty } })
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(SET_CART_MSG, '加入購物車成功！');
            commit(SET_CART_MSG_TYPE, 'success');
            dispatch('getCart');
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
    deleteProductInCart({ commit }, id) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/cart/${id}`;

      commit(SET_CART_MSG, '');
      return this._vm.$http
        .delete(path)
        .then((res) => {
          console.log(res.data);
          if (!res.data.success) {
            // this.$store.dispatch("getCart");
            commit(SET_CART_MSG, '刪除失敗！請再試試看');
            commit(SET_CART_MSG_TYPE, 'error');
          }
        })
        .catch((err) => {
          commit(SET_CART_MSG, `發生錯誤：${err}`);
          commit(SET_CART_MSG_TYPE, 'error');
        });
    },
    async addCouponCode({ commit }) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };

      try {
        commit(SET_CART_MSG, '');
        const res = await this._vm.$http.post(path, { data: coupon });
        console.log(res);
      } catch (error) {
        commit(SET_CART_MSG, `發生錯誤${error}`);
        commit(SET_CART_MSG_TYPE, 'error');
      }
    },
    async createNewOrder({ commit }, form) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/order`;

      try {
        commit(SET_CART_MSG, '');
        const res = await this._vm.$http.post(path, { data: form });
        if (res.data.success) {
          commit(SET_CART_MSG, '訂單已建立');
          commit(SET_CART_MSG_TYPE, 'success');
          return res.data.orderId;
        } else {
          commit(SET_CART_MSG, '訂單無效，請在試試看');
          commit(SET_CART_MSG_TYPE, 'error');
        }
      } catch (error) {
        commit(SET_CART_MSG, `發生錯誤${error}`);
        commit(SET_CART_MSG_TYPE, 'error');
      }
      return false;
    },
    async getOrder({ commit }, id) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/order/${id}`;

      try {
        commit(SET_CART_MSG, '');
        commit(SET_ORDER, {});
        const res = await this._vm.$http.get(path);
        commit(SET_CART_MSG, '訂單建立成功');
        commit(SET_CART_MSG_TYPE, 'success');
        commit(SET_ORDER, res.data.order);
      } catch (error) {
        commit(SET_CART_MSG, `發生錯誤：${error}`);
        commit(SET_CART_MSG_TYPE, 'error');
      }
    },
    async payOrder({ commit }, id) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/pay/${id}`;

      try {
        commit(SET_CART_MSG, '');
        const res = await this._vm.$http.post(path);
        console.log(res);
        if (res.data.success) {
          commit(SET_CART_MSG, res.data.message);
          commit(SET_CART_MSG_TYPE, 'success');
        } else {
          throw new Error('付款失敗');
        }
      } catch (error) {
        commit(SET_CART_MSG, error.message);
        commit(SET_CART_MSG_TYPE, 'error');
      }
    },
  },
};
