import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// eslint-disable-next-line import/no-duplicates
import Vant from 'vant' // vant UI
import 'vant/lib/index.css' // vant UI css
import './icons' // 全局注册引入svg
// eslint-disable-next-line import/no-duplicates
import { Lazyload } from 'vant' // vant懒加载指令
import VueSocketio from 'vue-socket.io'
// import '@/assets/iconfont/iconfont.css' // iconfont css
import './permission' // permission control

Vue.config.productionTip = false
Vue.use(Vant)
Vue.use(Lazyload)

// let connectionStr = true // true为本地serve，false为服务器serve
Vue.use(new VueSocketio({
  debug: process.env.NODE_ENV === 'development',
  connection: process.env.NODE_ENV === 'development' ? `http://10.11.39.35:3002` : 'http://47.106.68.248:3002'
  // connection: process.env.NODE_ENV === 'development' ? `http://${getIp()}:3002` : 'http://47.106.68.248:3002'
  // debug: false,
  // connection: connectionStr ? `http://${getIp()}:3002` : 'http://47.106.68.248:3002'
}))
// document.addEventListener('deviceready', function () { // cordova 打包成apk的时候打开
// eslint-disable-next-line indent
  new Vue({
  // eslint-disable-next-line indent
    router,
  // eslint-disable-next-line indent
    store,
  // eslint-disable-next-line indent
    render: h => h(App)
  // eslint-disable-next-line indent
  }).$mount('#app')
// }, false)
