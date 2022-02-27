import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/FrontView.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        // eslint-disable-next-line no-undef
        component: HomeView
      },
      // 第 2層 不需要加斜線
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductsViw.vue')
      },
      {
        path: 'cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProducts.vue')
      },
      {
        path: 'coupon',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminCoupon.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // Bootstrap 樣式，加上後，啟用連結就會變黑色，包含巢狀都會加上這個效果
  // linkActiveClass 參考網頁 https://router.vuejs.org/zh/api/#linkactiveclass
  linkActiveClass: 'active'
})

export default router
