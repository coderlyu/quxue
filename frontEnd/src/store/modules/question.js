// import { getToken, setToken, removeToken } from '@/utils/auth'
import { publicQuestion, getList, getDetail, submitComment, findQuestion, updateQSupport, getQuestionsByUserId,
  toDeleteQuestion, updateQuestion } from '@/api/question.js'
const state = {
}
const mutations = {
}
const actions = {
  publicQuestion ({ commit, rootState }, question) {
    return new Promise((resolve, reject) => {
      let newQ = {
        user_id: rootState.user.id
      }
      newQ = Object.assign(newQ, question)
      publicQuestion(newQ).then(data => {
        if (data.code === 1) {
          resolve(data)
        } else {
          reject(new Error('创建失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
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
  },
  getDetail ({ commit }, qId) {
    return new Promise((resolve, reject) => {
      getDetail({ q_id: qId }).then(res => {
        if (res.code === 1) {
          resolve(res.data)
        } else {
          reject(new Error('获取失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  submitComment ({ commit }, comment) {
    return new Promise((resolve, reject) => {
      submitComment(comment).then(res => {
        if (res.code === 1) {
          resolve(res.data)
        } else {
          reject(new Error('评论失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  findQuestion ({ commit }, query) {
    return new Promise((resolve, reject) => {
      findQuestion(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('查询失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  updateQSupport ({ commit }, question) {
    return new Promise((resolve, reject) => {
      updateQSupport(question).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('修改失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getQuestionsByUserId ({ commit }, query) {
    return new Promise((resolve, reject) => {
      getQuestionsByUserId(query).then(res => {
        console.log(res)
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
  toDeleteQuestion ({ commit }, id) {
    return new Promise((resolve, reject) => {
      toDeleteQuestion({ q_id: id }).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('删除失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  toUpdateQuestion ({ commit }, question) {
    return new Promise((resolve, reject) => {
      updateQuestion(question).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('修改失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  }
}
const getters = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
