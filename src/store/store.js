import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || ''
  },
  mutations: {
    increment (state, data) {
      state.user = data
    }
  },
  actions: {
  }
})
