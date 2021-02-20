import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    const path = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(path).then((res) => {
      console.log(res.data);
      if (res.data.success) {
        next();
      } else {
        next({ name: 'Login' });
      }
    });
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
