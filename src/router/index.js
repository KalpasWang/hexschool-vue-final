import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Home from '@/views/Home.vue';
import Login from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('to', to);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const path = `${process.env.VUE_APP_API_PATH}/api/user/check`;
    axios.post(path).then((res) => {
      console.log(path, res.data);
      if (res.data.success) {
        next();
      } else {
        next({ name: 'Login' });
      }
    });
  } else {
    console.log('no auth');
    next();
  }
});

export default router;
