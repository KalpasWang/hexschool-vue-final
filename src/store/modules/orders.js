import {
  SET_ORDERS,
  SET_ORDERS_MSG,
  SET_ORDERS_MSG_TYPE,
  SET_ORDERS_PAGINATION,
  SET_LOADING,
} from './mutation-types';

export default {
  state: () => ({
    orders: [],
    ordersMsg: '',
    ordersMsgType: '',
    ordersPagination: {
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    },
  }),

  getters: {
    orders(state) {
      return state.orders;
    },
    ordersMsg(state) {
      return state.ordersMsg;
    },
    ordersMsgType(state) {
      return state.ordersMsgType;
    },
    ordersPagination(state) {
      return state.ordersPagination;
    },
  },

  mutations: {
    [SET_ORDERS](state, value) {
      state.orders = value;
    },

    [SET_ORDERS_MSG](state, value) {
      state.ordersMsg = value;
    },

    [SET_ORDERS_MSG_TYPE](state, value) {
      state.ordersMsgType = value;
    },

    [SET_ORDERS_PAGINATION](state, obj) {
      state.ordersPagination.totalPages = obj.total_pages;
      state.ordersPagination.currentPage = obj.current_page;
      state.ordersPagination.hasPrev = obj.has_pre;
      state.ordersPagination.hasNext = obj.has_next;
    },
  },

  actions: {
    async fetchOrders({ commit }, page = 1) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/admin/orders?page=${page}`;

      try {
        commit(SET_LOADING, true);
        commit(SET_ORDERS_MSG, '');
        commit(SET_ORDERS_MSG_TYPE, '');
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_ORDERS, res.data.orders);
          commit(SET_ORDERS_PAGINATION, res.data.pagination);
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_ORDERS_MSG, error.message);
        commit(SET_ORDERS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },
  },
};
