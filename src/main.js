// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store/index'
import router from './router'
import MuseUI from 'muse-ui'
import {get, post} from './utils/http'
//懒加载
import VueLazyLoad from 'vue-lazyload'
import 'muse-ui/dist/muse-ui.css'
import 'typeface-roboto'
import 'muse-ui-loading/dist/muse-ui-loading.css'
import Loading from 'muse-ui-loading'
Vue.use(Loading)

Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.use(MuseUI)
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
  error:'../../static/img/error.jpg',//加载错误时的显示图片
  loading:'../../static/img/loading.gif' //加载过程中的过渡图片
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
