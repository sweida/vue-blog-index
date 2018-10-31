import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../404'

import admin from './admin'
import index from './index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
    },
    ...index,
    ...admin,
  ],
})

