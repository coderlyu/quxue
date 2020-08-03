import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://47.106.68.248:3002', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,
  transformRequest: [function (data) { // 统一对发送的数据进行stringify处理
    const d = qs.stringify(data)
    return d
  }]
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization-token'] = getToken() || ''
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // console.log(response)
    const res = response.data
    // console.log(res)
    if (res.code === 2 || res.code === 4) {
      // store.commit('REMOVE_TOKEN')
      store.dispatch('user/clearToken')
      router.replace({
        path: 'login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    // if (res.data)
    return res
    // if (res.code !== 20000) {
    //   Toast.fail(res.message || 'Error')
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     Dialog.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
    //       confirmButtonText: 'Re-Login',
    //       cancelButtonText: 'Cancel',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error)
    // Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export default service
