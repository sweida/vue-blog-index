import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import whmm from '@/views/whmm'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // 后退滚动条回到之前位置
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/whmm/:id',
      name: 'whmm',
      component: whmm
    }
  ]
})
