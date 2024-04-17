import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from 'store/index'

import http from 'utils/httpIndex'
import * as API from './api/index'

import 'plugins/mavonEditor.js'
import 'plugins/iview.js'
import 'plugins/highlightjs'

// 自定义指令
import '@/directive/index'

// 全局自定义组件
import MyLoading from 'components/MyLoading'
Vue.use(MyLoading)

import SpinLoading from 'components/SpinLoading'
Vue.use(SpinLoading)

import MyPage from 'components/MyPage'
Vue.use(MyPage)

import NewPage from 'components/NewPage'
Vue.use(NewPage)

import TextLoading from 'components/TextLoading'
Vue.use(TextLoading)

import { Plugin } from 'vue-fragment'
Vue.use(Plugin)
// import Fragment from 'vue-fragment'
// Vue.use(Fragment.Plugin)

// // 引入ivew,
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'
// Vue.use(iView)
// // 路由跳转开启进度条
// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start();
//   next();
// });
// router.afterEach(route => {
//   iView.LoadingBar.finish();
// });

Vue.prototype.$get = http.get
Vue.prototype.$post = http.post
Vue.prototype.$baseApiUrl = process.env.VUE_APP_API_URL
Vue.prototype.$staticUrl = process.env.VUE_APP_STATIC_URL
Vue.prototype.$avatarUrl = process.env.VUE_APP_AVATAR_URL
Vue.prototype.$api = API

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
