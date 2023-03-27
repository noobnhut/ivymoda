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
        }
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
  ]
})

export default router;
