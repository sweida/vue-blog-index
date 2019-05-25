import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import user from './modules/user'
import blog from './modules/blog'

Vue.use(Vuex)

const store = new Vuex.Store({
  // state: {
  //   // user: JSON.parse(localStorage.getItem("user")) || "",
  //   webinfo: "",
  //   tag: "",
  //   classify: "",
  //   timeline: ""
  // },
  // mutations: {
  //   // increment(state, data) {
  //   //   state.user = data;
  //   // },
  //   inWebinfo(state, data) {
  //     state.webinfo = data;
  //   },
  //   intag(state, data) {
  //     state.tag = data;
  //   },
  //   inclassify(state, data) {
  //     state.classify = data;
  //   },
  //   intimeline(state, data) {
  //     state.timeline = data;
  //   }
  // },
  modules: {
    todos,
    user,
    blog
  }
})

export default store;


