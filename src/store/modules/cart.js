import {
  SET_CART,
  SET_CUSTOMER_ORDER,
  SET_CART_MSG,
  SET_CART_MSG_TYPE,
  SET_DROPDOWN_SHOW,
  SET_LOADING,
} from './mutation-types';

export default {
  state: () => ({
    cart: [],
    cartTotal: {},
    customerOrder: {},
    isDropdownShow: false,
    cartMsg: '',
    cartMsgType: '',
  }),

  getters: {
    cart(state) {
      return state.cart;
    },
    cartTotal(state) {
      return state.cartTotal;
    },
    customerOrder(state) {
      return state.customerOrder;
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
    [SET_CART](state, data) {
      state.cart = data.carts;
      const { total, final_total } = data;
      state.cartTotal = { total, final_total };
    },

    [SET_CUSTOMER_ORDER](state, value) {
      state.customerOrder = value;
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
    async getCart({ commit }) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/cart`;

      try {
        commit(SET_CART_MSG, '');
        commit(SET_CART_MSG_TYPE, '');
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_CART, res.data.data);
        } else {
          throw new Error(res.data.messages[0]);
        }
      } catch (error) {
        commit(SET_CART_MSG, error.message);
        commit(SET_CART_MSG_TYPE, 'error');
      }
    },
    async postProductToCart({ commit }, { id, qty }) {
      // if (state.cart.carts.some((item) => item.product_id === id)) {
      //   return;
      // }
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/cart`;

      try {
        commit(SET_LOADING, true);
        commit(SET_CART_MSG, '');
        commit(SET_CART_MSG_TYPE, '');
        const res = await this._vm.$http.post(path, {
          data: { product_id: id, qty },
        });
        console.log(res.data);
        if (res.data.success) {
          commit(SET_CART_MSG, res.data.message);
          commit(SET_CART_MSG_TYPE, 'success');
          commit(SET_LOADING, false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        commit(SET_CART_MSG, error.message);
        commit(SET_CART_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },
    async deleteProductInCart({ commit }, id) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/cart/${id}`;

      try {
        commit(SET_LOADING, true);
        commit(SET_CART_MSG, '');
        commit(SET_CART_MSG_TYPE, '');
        const res = await this._vm.$http.delete(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_CART_MSG, res.data.message);
          commit(SET_CART_MSG_TYPE, 'success');
          commit(SET_LOADING, false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        commit(SET_CART_MSG, error.message);
        commit(SET_CART_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
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
        commit(SET_CUSTOMER_ORDER, {});
        const res = await this._vm.$http.get(path);
        commit(SET_CART_MSG, '訂單建立成功');
        commit(SET_CART_MSG_TYPE, 'success');
        commit(SET_CUSTOMER_ORDER, res.data.order);
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
