import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || '',
    webinfo: ''
  },
  mutations: {
    increment (state, data) {
      state.user = data
    },
    inWebinfo (state, data) {
      state.webinfo = data
    }
  },
  actions: {
  }
})
