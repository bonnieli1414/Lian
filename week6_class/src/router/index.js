import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/FrontView.vue'),
    children: [
      { // children屬性下的path都不需加入斜線 /
        path: '',
        name: 'Home',
        // eslint-disable-next-line no-undef
        component: HomeView
      },
      { // children屬性下的path都不需加入斜線 /
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductsViw.vue')
      },
      { // children屬性下的path都不需加入斜線 /
        // 與Node.js的寫法一樣
        path: 'product/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductViw.vue')
      },
      { // children屬性下的path都不需加入斜線 /
        path: 'cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/CartView.vue')
      }
    ]
  },
  { // children屬性下的path都不需加入斜線 /
    path: '/admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    children: [
      { // children屬性下的path都不需加入斜線 /
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/AdminProducts.vue')
      },
      { // children屬性下的path都不需加入斜線 /
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
