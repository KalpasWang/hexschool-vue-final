import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import DashBoard from '@/views/DashBoard';
import Login from '@/views/Login';
import ProductsList from '@/views/ProductsList';
import OrdersList from '@/views/OrdersList';
import CouponsList from '@/views/CouponsList';
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
        name: 'CouponsList',
        component: CouponsList,
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
  // console.log('to', to);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    console.log('has auth');
    const path = `${router.app.$apiPath}/api/user/check`;
    // console.log('path', path);
    router.app.$http.post(path).then((res) => {
      console.log('res.data', res.data);
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
