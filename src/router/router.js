import Vue from 'vue'
import Router from 'vue-router'

import admin from './admin'
import index from './index'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: adminLogin,
    //   redirect: {
    //     name: 'adminLogin',
    //   },
    // },
    ...index,
    ...admin
  ],
})
