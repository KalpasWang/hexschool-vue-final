import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import Home from '@/views/Home';
import DashBoard from '@/views/DashBoard';
import Login from '@/views/Login';
import ProductsList from '@/views/ProductsList';
import OrdersList from '@/views/OrdersList';
import Coupons from '@/views/Coupons';
import OrderingSimulation from '@/views/OrderingSimulation';
import ProductsSimulation from '@/views/ProductsSimulation';
import ProductDetailsSimulation from '@/views/ProductDetailsSimulation';
import OrdersSimulation from '@/views/OrdersSimulation';
import CheckoutSimulation from '@/views/CheckoutSimulation';

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
        path: 'productsList',
        name: 'ProductsList',
        component: ProductsList,
      },
      {
        path: 'ordersList',
        name: 'OrdersList',
        component: OrdersList,
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
        redirect: { name: 'ProductsSimulation' },
        children: [
          {
            path: 'products',
            name: 'ProductsSimulation',
            component: ProductsSimulation,
          },
          {
            path: 'products/:id',
            name: 'ProductDetailsSimulation',
            component: ProductDetailsSimulation,
          },
        ],
      },
      {
        path: 'ordersSimulation',
        name: 'OrdersSimulation',
        component: OrdersSimulation,
      },
      {
        path: 'checkoutSimulation/:orderId',
        name: 'CheckoutSimulation',
        component: CheckoutSimulation,
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
