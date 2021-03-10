import Vue from 'vue';
import Vuex from 'vuex';
import Loading from './modules/loading';
import Products from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Loading,
    Products,
  },
});
