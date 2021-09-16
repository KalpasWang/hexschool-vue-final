import {
  SET_COUPONS,
  SET_COUPONS_MSG,
  SET_COUPONS_MSG_TYPE,
  SET_COUPONS_PAGINATION,
  SET_LOADING,
} from './mutation-types';

export default {
  state: () => ({
    coupons: [],
    couponsMsg: '',
    couponsMsgType: '',
    couponsPagination: {
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    },
  }),

  getters: {
    coupons(state) {
      return state.coupons;
    },
    couponsMsg(state) {
      return state.couponsMsg;
    },
    couponsMsgType(state) {
      return state.couponsMsgType;
    },
    couponsPagination(state) {
      return state.couponsPagination;
    },
  },

  mutations: {
    [SET_COUPONS](state, value) {
      state.coupons = value;
    },

    [SET_COUPONS_MSG](state, value) {
      state.couponsMsg = value;
    },

    [SET_COUPONS_MSG_TYPE](state, value) {
      state.couponsMsgType = value;
    },

    [SET_COUPONS_PAGINATION](state, obj) {
      state.couponsPagination.totalPages = obj.total_pages;
      state.couponsPagination.currentPage = obj.current_page;
      state.couponsPagination.hasPrev = obj.has_pre;
      state.couponsPagination.hasNext = obj.has_next;
    },
  },

  actions: {
    async getCoupons({ commit }, page = 1) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/admin/coupons?page=${page}`;

      try {
        commit(SET_LOADING, true);
        commit(SET_COUPONS_MSG, '');
        commit(SET_COUPONS_MSG_TYPE, '');
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_COUPONS, res.data.coupons);
          commit(SET_COUPONS_PAGINATION, res.data.pagination);
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_COUPONS_MSG, error.message);
        commit(SET_COUPONS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },

    async updateCoupons({ commit }, item) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const isNew = !item.id;
      const method = isNew ? 'post' : 'put';
      let path = `${apiPath}/api/${apiParams}/admin/coupon/`;
      path += isNew ? '' : item.id;

      try {
        commit(SET_LOADING, true);
        commit(SET_COUPONS_MSG, '');
        commit(SET_COUPONS_MSG_TYPE, '');
        const res = await this._vm.$http[method](path, { data: item });
        console.log(res.data);
        if (res.data.success) {
          commit(SET_COUPONS_MSG, res.data.message);
          commit(SET_COUPONS_MSG_TYPE, 'success');
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_COUPONS_MSG, error.message);
        commit(SET_COUPONS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },

    async deleteCoupons({ commit }, item) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/admin/coupon/${item.id}`;

      const confirmResult = confirm(`確定要刪除 ${item.title} 這個優惠券嗎？`);
      if (!confirmResult) {
        return;
      }

      try {
        commit(SET_LOADING, true);
        commit(SET_COUPONS_MSG, '');
        commit(SET_COUPONS_MSG_TYPE, '');
        const res = await this._vm.$http.delete(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_COUPONS_MSG, res.data.message);
          commit(SET_COUPONS_MSG_TYPE, 'success');
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_COUPONS_MSG, error.message);
        commit(SET_COUPONS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },
  },
};
