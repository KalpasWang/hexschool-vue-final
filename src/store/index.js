import Vue from 'vue';
import Vuex from 'vuex';
import Loading from './modules/loading';
import Products from './modules/products';
import ProductDetails from './modules/productsDetails';
import Cart from './modules/cart';
import Admin from './modules/admin';
import Orders from './modules/orders';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Loading,
    Products,
    ProductDetails,
    Cart,
    Admin,
    Orders,
  },
});
