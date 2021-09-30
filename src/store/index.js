import Vue from 'vue';
import Vuex from 'vuex';
import Loading from './modules/loading';
import Products from './modules/products';
import ProductDetails from './modules/productsDetails';
import Cart from './modules/cart';
import AdminProducts from './modules/adminProducts';
import Orders from './modules/orders';
import Coupons from './modules/coupons';

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
    AdminProducts,
    Orders,
    Coupons,
  },
});
