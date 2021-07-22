import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Notifications from 'vue-notification';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.config.errorHandler = function(err, vm, info) {
  console.log(err, vm, info);
};

Vue.prototype.$apiPath = process.env.VUE_APP_API_PATH;
Vue.prototype.$apiParams = process.env.VUE_APP_API_PARAMS;

Vue.use(VueAxios, axios);
Vue.use(Notifications);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
