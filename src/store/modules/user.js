import { getUserInfo } from '@/modules/index/api'

import http from '@/utils/httpIndex'

const state = {
  user: '',
  token: localStorage.getItem('so_token') || '',
}

// 获取state的数据
const getters = {
  user: state => state.user,
  token: state => state.token
}

// 更新state的数据
const mutations = {
  TOKEN (state, data) {
    state.token = data
  },
  USERINFO (state, data) {
    state.user = data
  },
  LOGOUT (state) {
    state.user = '',
      state.token = ''
  }
}

// 更新state数据的动作
const actions = {
  async UserInfo ({ commit }, data) {
    const res = await getUserInfo()
    commit('USERINFO', res.data)
  },
  Token ({ commit }, data) {
    localStorage.setItem("so_token", data);
    commit('TOKEN', data)
  },
  Logout ({ commit }) {
    localStorage.removeItem("so_token");
    commit('LOGOUT')
  },
}


export default { state, getters, mutations, actions }

