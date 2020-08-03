const state = {
  isShowBack: false, // 是否显示header 返回按钮
  title: '首页', // 头部header 标题
  isMobilePhone: false
}
const mutations = {
  CHANGE_ISSHOWBACK (state, payload) {
    state.isShowBack = payload
  },
  CHANGE_TITLE (state, payload) {
    state.title = payload
  },
  CHANGE_IS_MOBILE_PHONE (state, isMobilePhone) {
    state.isMobilePhone = isMobilePhone
  }
}
const actions = {
  changeState ({ commit, state }, payload) {
    commit('CHANGE_ISSHOWBACK', payload)
  },
  changeTitle ({ commit }, payload) {
    commit('CHANGE_TITLE', payload)
  },
  changeIsMobilePhone ({ commit }, isMobilePhone) {
    commit('CHANGE_IS_MOBILE_PHONE', isMobilePhone)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
