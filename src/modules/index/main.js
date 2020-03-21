import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from 'store/index'

import http from 'utils/httpIndex'

import 'plugins/element.js'
import 'plugins/mavonEditor.js'
import 'plugins/iview.js'
import 'plugins/highlightjs'

// 自定义指令
import "utils/directive";

// 全局自定义组件
import MyLoading from 'components/MyLoading'
Vue.use(MyLoading)

import MyPage from 'components/MyPage'
Vue.use(MyPage)

import TextLoading from 'components/TextLoading'
Vue.use(TextLoading)

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
Vue.prototype.$get = http.get;
Vue.prototype.$post = http.post;
Vue.prototype.$baseApiUrl = process.env.VUE_APP_API_URL;
Vue.prototype.$staticUrl = process.env.VUE_APP_STATIC_URL;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')