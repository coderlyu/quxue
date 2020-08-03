import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
// import Vuex from 'vuex'
// import SocketIO from 'socket.io'
import { getChatList, setChatList } from '@/utils/auth'
import Message from '@/model/message.js'
const state = {
  chatList: getChatList() || [],
  isConnect: false
  // chatList: getChatList(store.user.id) || []
  /**
   * chatlist格式
   * [{
   *   user: User,
   *   user: {
   *          id: '',
   *          avatar: '',
   *          name: '',
   *          intro: ''
   *        },
   *   data: [
   *      { type: 1, content: '', time: ''},
   *      { type: 2, content: '', time: ''},
   *      { type: 3, content: '2019-11-23', time: ''}
   *    ]
   *  }]
   */
}
const mutations = {
  CHANGE_IS_CONNECT: (state, isConnect) => {
    state.isConnect = isConnect
  },
  SET_CHAT_LIST: (state) => {
    setChatList(state.chatList)
  },
  SET_CHAT_ITEM: (state, { item }) => {
    state.chatList.push(item)
    setChatList(state.chatList)
  },
  SET_CHAT_ITEM_DATA: (state, { index, item }) => {
    state.chatList[index].data.push(item)
    setChatList(state.chatList)
  },
  REMOVE_CHAT_ITEM: (state, { index }) => {
    state.chatList.splice(index, 1)
    setChatList(state.chatList)
  },
  REMOVE_CHAT_ITEM_DATA: (state, { iItem, jItem }) => {
    state.chatList[iItem].data.splice(jItem, 1)
    setChatList(state.chatList)
  }
}
const actions = {
  setChatListItem ({ commit, getters }, { User, type, content }) { // 建立发送的消息
    let chatItem = getters.findUserById(String(User.id))
    let msg = new Message({ type, content })
    if (chatItem.index === -1) {
      let item = {
        user: {
          id: User.id,
          avatar: User.avatar,
          name: User.name,
          intro: User.intro
        },
        data: [msg]
      }
      commit('SET_CHAT_ITEM', { item })
    } else {
      commit('SET_CHAT_ITEM_DATA', { index: chatItem.index, item: msg })
    }
  },
  createSocket ({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      // console.log(rootState)
      if (rootState.user.id) {
        let str = process.env.NODE_ENV === 'development' ? 'http://192.168.1.2:3002?Identification=' + rootState.user.id : 'http://47.106.68.248:3002?Identification=' + rootState.user.id
        // console.log(str)
        Vue.use(new VueSocketio({
          debug: process.env.NODE_ENV === 'development',
          connection: str,
          vuex: {}
        }))
        commit('CHANGE_IS_CONNECT', true)
        resolve()
      }
    })
  },
  async setReceiveItem ({ commit, getters, dispatch }, { uId, type, content }) { // 收到回复的消息
    let chatItem = getters.findUserById(String(uId))
    let msg = new Message({ type, content })
    if (chatItem.index === -1) {
      let User = await dispatch('user/getInfoById', uId, { root: true })
      let item = {
        user: {
          id: User.id,
          avatar: User.avatar,
          name: User.name,
          intro: User.intro
        },
        data: [msg]
      }
      commit('SET_CHAT_ITEM', { item })
    } else {
      commit('SET_CHAT_ITEM_DATA', { index: chatItem.index, item: msg })
    }
  },
  changeConnect ({ commit }) {
    commit('CHANGE_IS_CONNECT', true)
  }
}
const getters = {
  findUserById: state => uid => {
    let list = state.chatList
    let index = -1
    let item = null
    list.some((ele, i) => {
      if (String(ele.user.id) === String(uid)) {
        item = ele
        index = i
        return true
      }
    })
    return {
      item,
      index
    }
  },
  getChatList: state => state.chatList,
  getChatItemById: state => uid => {
    let item = []
    state.chatList.some(ele => {
      if (String(ele.user.id) === String(uid)) {
        item = ele.data
        return true
      }
    })
    return item
  },
  getIsConnect: state => state.isConnect
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
