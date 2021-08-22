import {
  SET_ADMIN_PRODUCTS,
  SET_ALL_ADMIN_PRODUCTS,
  SET_ADMIN_PRODUCTS_MSG,
  SET_ADMIN_PRODUCTS_MSG_TYPE,
  SET_ADMIN_PAGINATION,
  SET_LOADING,
} from './mutation-types';

export default {
  state: () => ({
    adminProducts: [],
    allAdminProducts: [],
    adminProductsMsg: '',
    adminProductsMsgType: '',
    adminPagination: {
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    },
  }),

  getters: {
    adminProducts(state) {
      return state.adminProducts;
    },
    allAdminProducts(state) {
      return state.allAdminProducts;
    },
    adminProductsMsg(state) {
      return state.adminProductsMsg;
    },
    adminProductsMsgType(state) {
      return state.adminProductsMsgType;
    },
    adminPagination(state) {
      return state.adminPagination;
    },
  },

  mutations: {
    [SET_ADMIN_PRODUCTS](state, value) {
      state.adminProducts = value;
    },

    [SET_ALL_ADMIN_PRODUCTS](state, value) {
      state.allAdminProducts = value;
    },

    [SET_ADMIN_PRODUCTS_MSG](state, value) {
      state.adminProductsMsg = value;
    },

    [SET_ADMIN_PRODUCTS_MSG_TYPE](state, value) {
      state.adminProductsMsgType = value;
    },

    [SET_ADMIN_PAGINATION](state, obj) {
      state.adminPagination.totalPages = obj.total_pages;
      state.adminPagination.currentPage = obj.current_page;
      state.adminPagination.hasPrev = obj.has_pre;
      state.adminPagination.hasNext = obj.has_next;
    },
  },

  actions: {
    async fetchAdminProducts({ commit }, page = 1) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/admin/products?page=${page}`;

      try {
        commit(SET_LOADING, true);
        commit(SET_ADMIN_PRODUCTS_MSG, '');
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, '');
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_ADMIN_PRODUCTS, res.data.products);
          commit(SET_ADMIN_PAGINATION, res.data.pagination);
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_ADMIN_PRODUCTS_MSG, error.message);
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },

    async fetchAllAdminProducts({ commit }) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/admin/products/all`;

      try {
        commit(SET_LOADING, true);
        commit(SET_ADMIN_PRODUCTS_MSG, '');
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, '');
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_ALL_ADMIN_PRODUCTS, res.data.products.reverse());
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_ADMIN_PRODUCTS_MSG, error.message);
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },

    async updateAdminProduct({ commit }, item) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const isNew = !item.id;
      let path = `${apiPath}/api/${apiParams}/admin/product/`;
      path += isNew ? '' : item.id;
      let method = isNew ? 'post' : 'put';

      try {
        commit(SET_LOADING, true);
        commit(SET_ADMIN_PRODUCTS_MSG, '');
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, '');
        const res = await this._vm.$http[method](path, { data: item });
        console.log(res.data);
        if (res.data.success) {
          commit(SET_ADMIN_PRODUCTS_MSG, res.data.message);
          commit(SET_ADMIN_PRODUCTS_MSG_TYPE, 'success');
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_ADMIN_PRODUCTS_MSG, error.message);
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },

    async deleteAdminProduct({ commit }, item) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/admin/product/${item.id}`;

      try {
        commit(SET_LOADING, true);
        commit(SET_ADMIN_PRODUCTS_MSG, '');
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, '');
        const res = await this._vm.$http.delete(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_ADMIN_PRODUCTS_MSG, res.data.message);
          commit(SET_ADMIN_PRODUCTS_MSG_TYPE, 'success');
        } else {
          throw new Error(res.data.message);
        }
        commit(SET_LOADING, false);
      } catch (error) {
        commit(SET_ADMIN_PRODUCTS_MSG, error.message);
        commit(SET_ADMIN_PRODUCTS_MSG_TYPE, 'error');
        commit(SET_LOADING, false);
      }
    },
  },
};
