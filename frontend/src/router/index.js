import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/client.vue'
import customer from '../views/customer.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      children:
        [
          {
            path: 'user',
            component: () => import('../layout/admin/user.vue'),
            name: 'user'
          },
          {
            path: 'bill',
            component: () => import('../layout/admin/bill.vue'),
            name: 'bill'
          },
          {
            path: 'product',
            component: () => import('../layout/admin/product.vue'),
            name: 'product'
          },
          {
            path: 'category',
            component: () => import('../layout/admin/category.vue'),
            name: 'category'
          },
          {
            path: 'sexes',
            component: () => import('../layout/admin/sexes.vue'),
            name: 'sexes'
          },
          {
            path: 'catsex',
            component: () => import('../layout/admin/catsex.vue'),
            name: 'catsex'
          },
          {
            path: 'detailproduct',
            component: () => import('../layout/admin/detailproduct.vue'),
            name: 'detailproduct'
          },
        ],
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../layout/customer/login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../layout/customer/register.vue')
        },
        {
          path: 'information',
          name: 'information',
          component: () => import('../layout/customer/information.vue')
        },
        {
          path: 'productsee',
          name: 'productsee',
          component: () => import('../layout/customer/productsee.vue')
        },
        {
          path: 'productlike',
          name: 'productlike',
          component: () => import('../layout/customer/productlike.vue')
        },
        {
          path: 'control_order',
          name: 'control_order',
          component: () => import('../layout/customer/control_order.vue')
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/about.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component:() => import('../views/detail.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component:() => import('../views/cart.vue')
    },
    {
      path: '/order',
      name: 'order',
      component:() => import('../views/order.vue')
    },
  ]
})

export default router;
