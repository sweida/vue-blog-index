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
// import qs from 'qs'
// Vue.prototype.$qs=qs

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
