
import { login, getInfo, getUserList } from '@/api/user.js'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  name: 'coderly',
  sex: '1',
  avatar: 'http://47.106.68.248:3002/uploads/2020041516053306999coderly.jpg.jpeg',
  age: '18',
  phone: '15777777777',
  address: '浙江绍兴',
  likes: ['读书'],
  token: getToken() || '',
  user: ''
}

const mutations = {
  CHANGE_NAME: (state, name) => {
    state.name = name
  },
  CHANGE_SEX: (state, sex) => {
    state.sex = sex
  },
  CHANGE_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  CHANGE_AGE: (state, age) => {
    state.age = age
  },
  CHANGE_PHONE: (state, phone) => {
    state.phone = phone
  },
  CHANGE_ADDRESS: (state, address) => {
    state.address = address
  },
  CHANGE_LIKES: (state, likes) => {
    state.likes = likes
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN: (state) => {
    state.token = ''
    removeToken()
  }
}

const actions = {
  changeUserInfo ({ commit }, user) {
    const { name, age, sex, likes, phone, address, avatar } = user
    commit('CHANGE_NAME', name)
    commit('CHANGE_AGE', age)
    commit('CHANGE_SEX', sex)
    commit('CHANGE_LIKES', likes)
    commit('CHANGE_PHONE', phone)
    commit('CHANGE_ADDRESS', address)
    commit('CHANGE_AVATAR', avatar)
  },
  login ({ commit }, user) {
    const { username, password } = user
    return new Promise((resolve, reject) => {
      login({ user_number: username, password: password }).then(res => {
        if (res.code === 1) {
          const { token, data } = res
          const { name, age, sex, avatar } = data
          commit('SET_USER', data)
          commit('SET_TOKEN', token)
          commit('CHANGE_NAME', name)
          commit('CHANGE_AGE', age)
          commit('CHANGE_SEX', sex)
          commit('CHANGE_AVATAR', avatar)
          resolve(res)
        } else {
          reject(new Error(res.msg))
        }
      }).catch(err => {
        reject(new Error(err))
      })
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
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TOKEN')
      commit('CHANGE_NAME', '')
      commit('CHANGE_AGE', '')
      commit('CHANGE_SEX', '')
      commit('CHANGE_PHONE', '')
      commit('CHANGE_ADDRESS', '')
      commit('CHANGE_AVATAR', '')
      resolve()
    })
  },
  getUserList ({ commit }, query) {
    return new Promise((resolve, reject) => {
      getUserList(query).then(res => {
        if (res.code === 1) {
          resolve(res)
        } else {
          reject(new Error(res.msg))
        }
      }).catch(err => reject(new Error(err)))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
