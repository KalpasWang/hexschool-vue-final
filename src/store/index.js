import Vue from 'vue';
import Vuex from 'vuex';
import Loading from './modules/loading';
import Products from './modules/products';
import ProductDetails from './modules/productsDetails';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Loading,
    Products,
    ProductDetails,
  },
});
