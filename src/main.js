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

// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0);
// });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
