import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/client.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin.vue'),
    children:
        [
         {
          path:'user',
          component:()=>import('../layout/admin/user.vue'),
          name:'user'
         },
         {
          path:'bill',
          component:()=>import('../layout/admin/bill.vue'),
          name:'bill'
         },
         {
          path:'product',
          component:()=>import('../layout/admin/product.vue'),
          name:'product'
         },
         {
          path:'category',
          component:()=>import('../layout/admin/category.vue'),
          name:'category'
         },       
        ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router