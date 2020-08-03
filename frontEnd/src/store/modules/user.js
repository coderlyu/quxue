import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, register, getInfo, toUpdate, getInfoById, findUsers, getFriendsAllActives,
  toFollow, clearFollow, getFriends, reCharge, getUserActives, getUserFriendsActives, getUserOrders } from '@/api/user.js'
import { updateSupport } from '@/api/comment.js'
import { createAddress, updateAddress, deleteAddress, getAddressListByUserId, getAddressDetailById } from '@/api/address.js'
import { toUpDateOrderStatus } from '@/api/product.js'
import hanziToPinyin from '@/utils/hanziToPinyin.js'
const state = {
  token: getToken() || '',
  user: '',
  id: '',
  user_number: '',
  name: '',
  avatar: '',
  age: '',
  sex: '',
  address: '',
  intro: '',
  balance: 0
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_USER: (state, user) => {
    state.user = user
    state.id = user.id
    state.user_number = user.user_number
    state.name = user.name
    state.avatar = user.avatar
    state.age = user.age
    state.sex = user.sex
    state.address = user.address
    state.intro = user.intro
    state.balance = user.balance
  },
  REMOVE_TOKEN: (state) => {
    state.token = ''
    state.id = ''
    state.user_number = ''
    state.name = ''
    state.avatar = ''
    state.age = ''
    state.sex = ''
    state.address = ''
    state.intro = ''
    state.balance = 0
    removeToken()
  },
  CHANGE_BALANCE: (state, balance) => {
    state.balance = balance
    state.user.balance = balance
  }
}
const actions = {
  clearToken ({ commit }) {
    commit('REMOVE_TOKEN')
  },
  login ({ commit }, user) {
    let { username, password } = user
    return new Promise((resolve, reject) => {
      login({ user_number: username.trim(), password }).then(data => {
        if (data.code === 1) {
          commit('SET_TOKEN', data.token)
          commit('SET_USER', data.data)
          resolve()
        } else {
          reject(new Error(data.msg))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  register ({ commit }, user) {
    let { nickname, username, password } = user
    return new Promise((resolve, reject) => {
      register({ name: nickname, password, user_number: username }).then(data => {
        if (data.code === 1) {
          resolve()
        } else {
          reject(new Error(data.msg))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('REMOVE_TOKEN')
        commit('SET_INTRO', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_ID', '')
        commit('SET_USER_NUMBER', '')
        resolve()
      } catch (err) {
        reject(new Error(err))
      }
    })
  },
  getInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(data => {
        if (data.code === 1) {
          commit('SET_USER', data.data)
          resolve()
        } else if (data.code === 2) {
          commit('REMOVE_TOKEN')
          reject(new Error('token 过期'))
        } else {
          reject(new Error('拉取信息失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  update ({ commit, getters }, user) {
    let newUser = Object.assign(getters.user, user)
    return new Promise((resolve, reject) => {
      toUpdate(newUser).then(data => {
        if (data.code === 1) {
          commit('SET_USER', data.data)
          resolve()
        } else {
          reject(new Error('修改失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getInfoById ({ commit }, id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      getInfoById({ u_id: id }).then(res => {
        if (res.code === 1) {
          resolve(res.data)
        } else {
          reject(new Error(res.msg))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  findUsers ({ commit }, query) {
    return new Promise((resolve, reject) => {
      findUsers(query).then(res => {
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
  updateSupport ({ commit }, comment) {
    return new Promise((resolve, reject) => {
      updateSupport(comment).then(res => {
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
  toFollow ({ commit }, follow) {
    return new Promise((resolve, reject) => {
      toFollow(follow).then(res => {
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
  clearFollow ({ commit }, follow) {
    return new Promise((resolve, reject) => {
      clearFollow(follow).then(res => {
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
  getFriends ({ commit }) {
    return new Promise((resolve, reject) => {
      getFriends().then(res => {
        if (res.code === 1) {
          let data = []
          res.data.forEach(item => {
            let zimu = hanziToPinyin.initialTreatment(item.name).toUpperCase()
            let bt = false
            data.forEach((e, i) => {
              if (e.type === zimu) {
                bt = true
                data[i].data.push(item)
              }
            })
            if (!bt) {
              let tmp = {
                type: zimu,
                data: []
              }
              tmp.data.push(item)
              data.push(tmp)
            }
          })
          resolve(data)
        } else {
          reject(new Error('获取好友列表失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  reCharge ({ commit }, balance) {
    return new Promise((resolve, reject) => {
      reCharge({ balance }).then(res => {
        if (res.code === 1) {
          commit('CHANGE_BALANCE', res.data.balance)
          resolve(res)
        } else {
          reject(new Error('充值失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  createAddress ({ commit }, address) {
    return new Promise((resolve, reject) => {
      createAddress(address).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('创建失败'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  updateAddress ({ commit }, address) {
    return new Promise((resolve, reject) => {
      updateAddress(address).then(res => {
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
  deleteAddress ({ commit }, id) {
    return new Promise((resolve, reject) => {
      deleteAddress({ a_id: id }).then(res => {
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
  getAddressListByUserId ({ commit }) {
    return new Promise((resolve, reject) => {
      getAddressListByUserId().then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getAddressDetailById ({ commit }, address) {
    return new Promise((resolve, reject) => {
      getAddressDetailById({ a_id: address.id }).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getUserActives ({ commit }) { // 获取用户最近的20条动态
    return new Promise((resolve, reject) => {
      getUserActives().then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getUserFriendsActives ({ commit }) { // 获取用户最近的20条动态
    return new Promise((resolve, reject) => {
      getUserFriendsActives().then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getFriendsAllActives ({ commit }, query) { // 获取用户最近的20条动态
    return new Promise((resolve, reject) => {
      getFriendsAllActives(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  getUserOrders ({ commit }, query) { // 获取用户的订单
    return new Promise((resolve, reject) => {
      getUserOrders(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  },
  toUpDateOrderStatus ({ commit }, query) { // 修改用户的订单状态
    return new Promise((resolve, reject) => {
      toUpDateOrderStatus(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error('获取出错'))
        }
      }).catch(err => {
        reject(new Error(err))
      })
    })
  }
}
const getters = {
  user: state => state.user,
  id: state => state.id
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
