import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Notifications from 'vue-notification';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';
import '@/assets/scss/icon.css';
import '@/assets/scss/global.sass';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueAxios, axios);
Vue.use(Notifications);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

// axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
