
const state = {
  leftOpen: false,
  isMobile: false,
  isLoading: false
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.leftOpen = !state.leftOpen
  },
  CLOSE_SIDEBAR: (state) => {
    state.leftOpen = false
  },
  CHANGE_SIDEBAR: (state, leftOpen) => {
    state.leftOpen = leftOpen
  },
  CHANGE_IS_MOBILE: (state, isMobile) => {
    state.isMobile = isMobile
  },
  CHANGE_IS_LOADING: (state, isLoading) => {
    state.isLoading = isLoading
  }
}

const actions = {
  toggleSideBar ({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar ({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  changeSideBar ({ commit }, { leftOpen }) {
    commit('CHANGE_SIDEBAR', leftOpen)
  },
  changeIsMobile ({ commit }, { isMobile }) {
    commit('CHANGE_IS_MOBILE', isMobile)
  },
  changeIsLoading ({ commit }, { isLoading }) {
    commit('CHANGE_IS_LOADING', isLoading)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
