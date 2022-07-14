import { createStore } from 'vuex'

export default createStore({
  state: {
    token: '',
    isAuthenticated: false,
    username: '',
  },
  getters: {
    checkIfUsername(state) {
      return state.username ? state.username : 'Anonymous User'
    }
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
      } else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },
    setUsername(state, username) {
      state.username = username
    },
    removeUsername(state) {
      state.username = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
