
import { getProductList, getOrderList } from '@/api/product.js'
const state = {}

const mutations = {}

const actions = {
  getProductList ({ commit }, query) {
    return new Promise((resolve, reject) => {
      getProductList(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('查询出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getOrderList ({ commit }, query) {
    return new Promise((resolve, reject) => {
      getOrderList(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('查询出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
