import {
  SET_PRODUCTS,
  SET_PRODUCTS_ERROR_MSG,
  SET_ALL_PRODUCTS,
  SET_ALL_PRODUCTS_ERROR_MSG,
  SET_PAGINATION,
  SET_LOADING,
} from './mutation-types';
import Axios from 'axios';

export default {
  state: () => ({
    products: [],
    productsErrorMsg: '',
    allProducts: [],
    allProductsErrorMsg: '',
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
    productsErrotMsg(state) {
      return state.productsErrotMsg;
    },
    allProducts(state) {
      return state.allProducts;
    },
    allProductsErrorMsg(state) {
      return state.allProductsErrorMsg;
    },
    pagination(state) {
      return state.pagination;
    },
  },

  mutations: {
    [SET_PRODUCTS](state, value) {
      state.products = value;
    },

    [SET_PRODUCTS_ERROR_MSG](state, value) {
      state.productsErrorMsg = value;
    },

    [SET_ALL_PRODUCTS](state, value) {
      state.allProducts = value;
    },

    [SET_ALL_PRODUCTS_ERROR_MSG](state, value) {
      state.allProductsErrorMsg = value;
    },

    [SET_PAGINATION](state, obj) {
      state.pagination.totalPages = obj.total_pages;
      state.pagination.currentPage = obj.current_page;
      state.pagination.hasPrev = obj.has_prev;
      state.pagination.hasNext = obj.has_next;
    },
  },

  actions: {
    fetchProducts({ commit, state }, page = 1) {
      if (state.products.length > 0 && state.pagination.currentPage === page) {
        return;
      }
      commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/products?page=${page}`;
      Axios.get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(SET_PRODUCTS, res.data.products);
            commit(SET_PAGINATION, res.data.pagination);
            commit(SET_PRODUCTS_ERROR_MSG, '');
          } else {
            commit(SET_PRODUCTS_ERROR_MSG, '無法取得產品列表！請再試試看');
          }
          commit(SET_LOADING, false);
        })
        .catch(() => {
          commit(SET_PRODUCTS_ERROR_MSG, '無法取得產品列表！請再試試看');
          commit(SET_LOADING, false);
        });
    },

    fetchAllProducts({ commit, state }) {
      if (state.allProducts.length > 0) {
        return;
      }
      commit(SET_LOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/products/all`;
      Axios.get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(SET_ALL_PRODUCTS, res.data.products);
            commit(SET_ALL_PRODUCTS_ERROR_MSG, '');
          } else {
            commit(SET_ALL_PRODUCTS_ERROR_MSG, '無法取得產品列表！請再試試看');
          }
          commit(SET_LOADING, false);
        })
        .catch(() => {
          commit(SET_ALL_PRODUCTS_ERROR_MSG, '無法取得產品列表！請再試試看');
          commit(SET_LOADING, false);
        });
    },
  },
};
