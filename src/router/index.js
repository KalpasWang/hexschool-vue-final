import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Home from '@/views/Home';
import DashBoard from '@/views/DashBoard';
import Login from '@/views/Login';
import Products from '@/views/Products';
import Orders from '@/views/Orders';
import Coupons from '@/views/Coupons';
import OrderingSimulation from '@/views/OrderingSimulation';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'DashBoard',
    component: DashBoard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
      },
      {
        path: 'simulateOrdering',
        name: 'SimulateOrdering',
        component: OrderingSimulation,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    redirect: { name: 'home' },
  },
];

const router = new VueRouter({
  linkActiveClass: 'active',
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
