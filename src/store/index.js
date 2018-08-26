import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	user:{
	  id:'admin',
	  name: '拯救前端一号',
	  region: '超级管理员',
	  img:'https://avatars2.githubusercontent.com/u/23181508?s=460&v=4',
	  password:123456,
	  resource: ''
  },
  line: [],
  normline: ''
}
export default new Vuex.Store({
	state
})