import Vue from 'vue'

Vue.prototype.$get = http.get
Vue.prototype.$post = http.post
Vue.prototype.$baseApiUrl = process.env.VUE_APP_API_URL
Vue.prototype.$staticUrl = process.env.VUE_APP_STATIC_URL