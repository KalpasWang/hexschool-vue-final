import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Notifications from 'vue-notification';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueAxios, axios);
Vue.use(Notifications);

// axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
