import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueAxios, axios);

// axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
