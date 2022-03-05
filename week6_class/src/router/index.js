import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/FrontEnd/FrontView.vue'),
    children: [
      { // children屬性下的path都不需加入斜線 /
        path: '',
        name: 'Home',
        // eslint-disable-next-line no-undef
        component: HomeView
      },
      { // children屬性下的path都不需加入斜線 /
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/FrontEnd/ProductsViw.vue')
      },
      { // children屬性下的path都不需加入斜線 /
        // 與Node.js的寫法一樣
        path: 'product/:id',
        component: () => import(/* webpackChunkName: "about" */ '../views/FrontEnd/ProductViw.vue')
      },
      { // children屬性下的path都不需加入斜線 /
        path: 'cart',
        component: () => import(/* webpackChunkName: "about" */ '../views/FrontEnd/CartView.vue')
      }
    ]
  },
  { // 重定向至登入驗證頁面
    // 參考網頁 https://router.vuejs.org/zh/guide/essentials/redirect-and-alias.html
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'Login' }
  },
  { // 登入驗證頁面
    path: '/login',
    name: 'Login',
    component: () => import('../views/FrontEnd/LoginView.vue')
  },
  { // children屬性下的path都不需加入斜線 /
    path: '/admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/BackEnd/DashboardView.vue'),
    children: [
      { // 產品頁面，children屬性下的path都不需加入斜線 /
        path: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/BackEnd/AdminProducts.vue')
      },
      { // 訂單頁面，children屬性下的path都不需加入斜線 /
        path: 'order',
        component: () => import(/* webpackChunkName: "about" */ '../views/BackEnd/AdminOrder.vue')
      },
      { // 優惠券頁面，children屬性下的path都不需加入斜線 /
        path: 'coupon',
        component: () => import(/* webpackChunkName: "about" */ '../views/BackEnd/AdminCoupon.vue')
      },
      { // 貼文頁面，children屬性下的path都不需加入斜線 /
        path: 'article',
        component: () => import(/* webpackChunkName: "about" */ '../views/BackEnd/AdminArticle.vue')
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
