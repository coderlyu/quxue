import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import emptyLayout from '@/views/layout/emptyLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home'
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'homePage',
        component: () => import('@/views/home'),
        meta: { title: '首页', flag: 0 }
      }
    ]
  },
  {
    path: '/productDetail',
    component: Layout,
    children: [
      {
        path: ':id',
        name: 'productDetail',
        component: () => import('@/views/home/productDetail'),
        meta: { title: '商品详情', flag: 1 }
      }
    ]
  },
  {
    path: '/article',
    component: emptyLayout,
    children: [
      {
        path: '',
        name: 'publishArticle',
        component: () => import('@/views/article/index.vue'),
        meta: { title: '发表说活', flag: 0 }
      },
      {
        path: 'articleDetail/:id',
        name: 'articleDetail',
        component: () => import('@/views/article/articleDetail'),
        meta: { title: '文章详情', flag: 1 }
      },
      {
        path: 'editArticle/:id',
        name: 'editArticle',
        component: () => import('@/views/article/editArticle'),
        meta: { title: '文章编辑', flag: 1 }
      },
      {
        path: 'createArticle',
        name: 'createArticle',
        component: () => import('@/views/article/createArticle'),
        meta: { title: '文章新增', flag: 1 }
      }
    ]
  },

  {
    path: '/user',
    component: emptyLayout,
    children: [
      {
        path: 'edit',
        name: 'editUser',
        component: () => import('@/views/profile/editUser')
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('@/views/profile/detail.vue')
      },
      {
        path: 'editAge',
        name: 'editAge',
        component: () => import('@/views/User/editAge.vue')
      },
      {
        path: 'editIntro',
        name: 'editIntro',
        component: () => import('@/views/User/editIntro.vue')
      },
      {
        path: 'editLocalAddress',
        name: 'editLocalAddress',
        component: () => import('@/views/User/editLocalAddress')
      },
      {
        path: 'editNickName',
        name: 'editNickName',
        component: () => import('@/views/User/editNickName')
      },
      {
        path: 'addressList',
        name: 'addressList',
        component: () => import('@/views/User/addressList')
      },
      {
        path: 'myOrders',
        name: 'myOrders',
        component: () => import('@/views/profile/myorders'),
        meta: { title: '我的订单' }
      }
    ]
  },

  {
    path: '/chat',
    component: Layout,
    children: [
      {
        path: '',
        name: 'chatPage',
        component: () => import('@/views/chat'),
        meta: { title: '通话', flag: 0 }
      }
    ]
  },
  {
    path: '/friend',
    component: emptyLayout,
    children: [
      {
        path: 'detail/:id',
        name: 'friendDetail',
        component: () => import('@/views/chat/friend-detail.vue'),
        meta: { title: '好友详情' }
      },
      {
        path: 'intro/:id',
        name: 'friendintro',
        component: () => import('@/views/chat/friend-intro.vue'),
        meta: { title: '好友简介' }
      },
      {
        path: 'myfriends',
        name: 'myfriends',
        component: () => import('@/views/profile/myfriends.vue'),
        meta: { title: '好友列表' }
      }
    ]
  },
  {
    path: '/chatWith/:id',
    name: 'chatView',
    component: () => import('@/views/chat/chatview'),
    meta: { title: '聊天', flag: 0 }
  },
  {
    path: '/profile',
    component: Layout,
    children: [
      {
        path: '',
        name: 'profilePage',
        component: () => import('@/views/profile'),
        meta: { title: '个人主页', flag: 0 }
      },
      {
        path: 'addAddress',
        name: 'addAddressPage',
        component: () => import('@/views/profile/addAddress.vue'),
        meta: { title: '地址添加', flag: 1 }
      },
      {
        path: 'setting',
        name: 'settingPage',
        component: () => import('@/views/profile/setting.vue'),
        meta: { title: '设置', flag: 1 }
      }
    ]
  },
  {
    path: '/shopping',
    component: Layout,
    children: [
      {
        path: '',
        name: 'shoppingPage',
        component: () => import('@/views/shopping'),
        meta: { title: '购物车', flag: 0 }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { title: '查询', flag: 0 }
  },
  {
    path: '/mybalance',
    name: 'mybalance',
    component: () => import('@/views/profile/mybalance.vue'),
    meta: { title: '我的余额' }

  },
  {
    path: '/user',
    component: emptyLayout,
    children: [
      {
        path: 'addAddress',
        name: 'addAddress',
        component: () => import('@/views/User/addAddress.vue'),
        meta: { title: '添加地址' }
      },
      {
        path: 'editAddress/:id',
        name: 'editAddress',
        component: () => import('@/views/User/editAddress.vue'),
        meta: { title: '添加地址' }
      },
      {
        path: 'myquestion',
        name: 'myquestion',
        component: () => import('@/views/profile/myquestion.vue'),
        meta: { title: '我的说说' }
      }
    ]
  },
  {
    path: '',
    component: emptyLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login')
      },
      {
        path: 'buyToAddAddress',
        name: 'buyToAddAddress',
        component: () => import('@/views/shopping/buyToAddAddress.vue'),
        meta: { title: '订单提交' }
      },
      {
        path: 'buyCheckAddressList',
        name: 'buyCheckAddressList',
        component: () => import('@/views/shopping/buyCheckAddressList.vue'),
        meta: { title: '订单选择地址' }
      },
      {
        path: 'buySingleProduct',
        name: 'buySingleProduct',
        component: () => import('@/views/shopping/buySingleProduct.vue'),
        meta: { title: '订单选择地址' }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', // 如果cordova 打包成apk，这里必须 注释掉，否则真机上路由跳转出错
  base: process.env.BASE_URL,
  routes
})

export default router
