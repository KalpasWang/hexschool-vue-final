import {
  SET_PRODUCTS,
  SET_PAGINATION,
  SET_PRODUCTS_ERROR_MSG,
} from './mutation-types';
import Axios from 'axios';

export default {
  state: () => ({
    products: [],
    productsErrorMsg: '',
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
    pagination(state) {
      return state.pagination;
    },
    productsErrotMsg(state) {
      return state.productsErrotMsg;
    },
  },

  mutations: {
    [SET_PRODUCTS](state, value) {
      state.products = value;
    },

    [SET_PAGINATION](state, obj) {
      state.pagination.totalPages = obj.total_pages;
      state.pagination.currentPage = obj.current_page;
      state.pagination.hasPrev = obj.has_prev;
      state.pagination.hasNext = obj.has_next;
    },

    [SET_PRODUCTS_ERROR_MSG](state, value) {
      state.errorMsg = value;
    },
  },

  actions: {
    fetchProducts({ commit }, page = 1) {
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/products?page=${page}`;
      Axios.get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            commit(SET_PRODUCTS, res.data.products);
            commit(SET_PAGINATION, res.data.pagination);
          } else {
            commit(SET_PRODUCTS_ERROR_MSG, '無法取得產品列表！請再試試看');
          }
        })
        .catch(() => {
          commit(SET_PRODUCTS_ERROR_MSG, '無法取得產品列表！請再試試看');
        });
    },
  },
};
