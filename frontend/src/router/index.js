import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/client.vue'
import customer from '../views/customer.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin_login',
      name: 'admin_login',
      component: () => import('../views/loginadmin.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin.vue'),
      beforeEnter: (to, from, next) => {
        const adminInfo = localStorage.getItem('admin');
        if (adminInfo) {
          // Nếu thông tin admin đã tồn tại trong localStorage, cho phép truy cập vào trang admin.
          next();
        } else {
          // Nếu không tìm thấy thông tin admin, chuyển hướng đến trang đăng nhập admin.
          next('/admin_login');
        }
      },
      children: [{
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
          path: 'color',
          component: () => import('../layout/admin/color.vue'),
          name: 'color'
        },
        {
          path: 'img',
          component: () => import('../layout/admin/img.vue'),
          name: 'img'
        },
        {
          path: 'size',
          component: () => import('../layout/admin/size.vue'),
          name: 'size'
        },
      ],
    },
    {
      path: '/customer',
      name: 'customer',
      component: customer,
      children: [{
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
          path: 'productsee/',
          name: 'productsee',
          component: () => import('../layout/customer/productsee.vue')
        },
        {
          path: 'productlike/',
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
      path: '/detail/:id/:id_color/:id_cat',
      name: 'detail',
      component: () => import('../views/detail.vue')
    },
    {
      path: '/productbycat/:id',
      name: 'productbycat',
      component: () => import('../views/productbycat.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/cart.vue')
    },
    {
      path: '/search-product-list',
      name: 'search-product-list',
      component: () => import('../views/search-product-list.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/order.vue')
    },
    {
      path: '/auth/facebook',
      name: 'facebook-auth',
      beforeEnter() {
        // redirect đến trang xác thực Facebook
        window.location.href = 'http://localhost:3000/auth/facebook'
      }
    },

    {
      path: '/auth/google',
      name: 'google-auth',
      beforeEnter() {
        // redirect đến trang xác thực Google
        window.location.href = 'http://localhost:3000/auth/google'
      }
    },
  ]
})

export default router;
