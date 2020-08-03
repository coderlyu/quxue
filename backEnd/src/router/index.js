import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    redirect: '/home/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'homePage',
        component: () => import('@/views/home'),
        meta: { title: '首页' }
      }
    ]
  },
  {
    path: '/data',
    redirect: '/data/students',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'userPage',
        component: () => import('@/views/data/user.vue'),
        meta: { title: '用户列表' }
      },
      {
        path: 'question',
        name: 'questionPage',
        component: () => import('@/views/data/question.vue'),
        meta: { title: '问题列表' }
      },
      {
        path: 'order',
        name: 'orderPage',
        component: () => import('@/views/data/order.vue'),
        meta: { title: '订单列表' }
      },
      {
        path: 'product',
        name: 'productPage',
        component: () => import('@/views/data/product.vue'),
        meta: { title: '商品列表' }
      },
      {
        path: 'data',
        name: 'dataPage',
        component: () => import('@/views/data/data.vue'),
        meta: { title: '图表' }
      }
    ]
  },
  {
    path: '/profile',
    redirect: '/profile/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'profile',
        component: () => import('@/views/profile'),
        meta: { title: '我的主页' }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录注册' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
