
import { getList } from '@/api/question.js'
const state = {}

const mutations = {}

const actions = {
  getQuestionList ({ commit }, question) {
    return new Promise((resolve, reject) => {
      getList(question).then(res => {
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
