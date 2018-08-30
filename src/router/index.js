import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import detail from '@/views/detail'
import guochan from '@/views/guochan'
import weipai from '@/views/weipai'
import whmm from '@/views/whmm'
import porn91 from '@/views/porn91'
import hanguo from '@/views/hanguo'
import riji from '@/views/riji'
import sanjipian from '@/views/sanjipian'

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
      path: '/detail/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/whmm',
      name: 'whmm',
      component: whmm
    },
    {
      path: '/porn91',
      name: 'porn91',
      component: porn91
    },
    {
      path: '/guochan',
      name: 'guochan',
      component: guochan
    },

    {
      path: '/weipai',
      name: 'weipai',
      component: weipai
    },

    {
      path: '/hanguo',
      name: 'hanguo',
      component: hanguo
    },
    {
      path: '/riji',
      name: 'riji',
      component: riji
    },
    {
      path: '/sanjipian',
      name: 'sanjipian',
      component: sanjipian
    }
  ]
})
