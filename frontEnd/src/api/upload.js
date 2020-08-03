import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : 'http://47.106.68.248:3002',
  timeout: 5000,
  transformRequest: [function (data) {
    return data
  }]
})
// axios.defaults.headers['Content-Type'] = 'multipart/form-data'
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['authorization-token'] = getToken() || ''
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error)
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export function uploadImg (data) {
  return service({
    url: '/upload',
    method: 'post',
    data
  })
}
