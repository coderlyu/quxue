import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import {
  setTitle
} from '@/utils/get-title-and-set' // 设置浏览器头部标题

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  // 获取token，未登录跳转登陆界面，否则对用户权限进行验证
  // 页面载入动画
  // store.dispatch('app/changeIsLoading', { isLoading: true })
  const hasToken = getToken()
  if (hasToken) {
    if (!store.getters.user) {
      await store.dispatch('user/getInfo')
    }
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/login' })
      NProgress.done()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done() // 结束Progress
  // setTimeout(() => {
  //   store.dispatch('app/changeIsLoading', { isLoading: false })
  // }, 1000)
  store.dispatch('app/changeSideBar', { leftOpen: false })
  const title = to.meta.title
  setTimeout(() => {
    window.scrollTo(0, 0)
    setTitle(title)
  }, 0)
})
