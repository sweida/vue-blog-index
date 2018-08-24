import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import whmm from '@/views/whmm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/whmm',
      name: 'whmm',
      component: whmm
    }
  ]
})
