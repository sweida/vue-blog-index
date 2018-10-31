import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
// import http from '@/utils/http'
// Vue.prototype.$Http = http

import Axios from 'axios'
Vue.prototype.$get = Axios.get
Vue.prototype.$post = Axios.post

import './plugins/element.js'
import './plugins/mavonEditor.js'

// 引入ivew, 路由跳转开启进度条
import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
