import http from '@/utils/httpIndex'

const state = {
  webinfo: "",
  tag: "",
  classify: "",
}

// 获取state的数据
const getters = {
  webInfo: state => state.webinfo,
  tag: state => state.tag,
  classify: state => state.classify
}

// 更新state的数据
const mutations = {
  WEBINFO(state, data) {
    state.webinfo = data
  },
  TAG(state, data) {
    state.tag = data
    state.classify = ''
  },
  CLASSIFY(state, data) {
    state.classify = data
    state.tag = ''
  }
}

// 更新state数据的动作
const actions = {
  async WebInfo({ commit }, data) {
    const res = await http.get('/apis/webinfo/read')
    commit('WEBINFO', res.data.data)
  },
  Tag({ commit }, data) {
    commit('TAG', data)
  },
  Classify({ commit }, data) {
    commit('CLASSIFY', data)
  },
}


export default {state, getters, mutations, actions}

