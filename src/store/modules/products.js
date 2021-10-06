import {
  SET_PRODUCTS,
  SET_PRODUCTS_MSG,
  SET_ALL_PRODUCTS,
  SET_ALL_PRODUCTS_MSG,
  SET_PAGINATION,
  SET_LOADING,
} from './mutation-types';

export default {
  state: () => ({
    products: [],
    productsMsg: '',
    allProducts: [],
    allProductsMsg: '',
    pagination: {
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    },
  }),

  getters: {
    products(state) {
      return state.products;
    },
    productsMsg(state) {
      return state.productsMsg;
    },
    allProducts(state) {
      return state.allProducts;
    },
    allProductsMsg(state) {
      return state.allProductsMsg;
    },
    pagination(state) {
      return state.pagination;
    },
  },

  mutations: {
    [SET_PRODUCTS](state, value) {
      state.products = value;
    },

    [SET_PRODUCTS_MSG](state, value) {
      state.productsMsg = value;
    },

    [SET_ALL_PRODUCTS](state, value) {
      state.allProducts = value;
    },

    [SET_ALL_PRODUCTS_MSG](state, value) {
      state.allProductsMsg = value;
    },

    [SET_PAGINATION](state, obj) {
      state.pagination.totalPages = obj.total_pages;
      state.pagination.currentPage = obj.current_page;
      state.pagination.hasPrev = obj.has_prev;
      state.pagination.hasNext = obj.has_next;
    },
  },

  actions: {
    async fetchProducts({ commit }, page = 1) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/products?page=${page}`;

      try {
        commit(SET_PRODUCTS_MSG, '');
        commit(SET_LOADING, true);
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_PRODUCTS, res.data.products);
          commit(SET_PAGINATION, res.data.pagination);
          commit(SET_LOADING, false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        commit(SET_PRODUCTS_MSG, error.message);
        commit(SET_LOADING, false);
      }
    },

    async fetchAllProducts({ commit }) {
      const apiPath = this._vm.$apiPath;
      const apiParams = this._vm.$apiParams;
      const path = `${apiPath}/api/${apiParams}/products/all`;

      try {
        commit(SET_ALL_PRODUCTS_MSG, '');
        commit(SET_LOADING, true);
        const res = await this._vm.$http.get(path);
        console.log(res.data);
        if (res.data.success) {
          commit(SET_ALL_PRODUCTS, res.data.products.reverse());
          commit(SET_LOADING, false);
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        commit(SET_ALL_PRODUCTS_MSG, error.message);
        commit(SET_LOADING, false);
      }
    },
  },
};
