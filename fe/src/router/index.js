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
    component: () => import('../views/admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
