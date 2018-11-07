import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '../404'

import admin from './admin'
import index from './index'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound,
    },
    ...index,
    ...admin,
  ],
  // 新开页面滚动条回到顶部，后退回到之前位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})

router.beforeEach((to, from, next) => {
  // 使用钩子函数对路由进行权限跳转
  const role = localStorage.getItem('user')
  // 如果用户已经登录，访问登录和注册时，自动跳转到首页
  if (role && (to.path == '/login' || to.path == '/register')) {
    next('/blog')
  } else if (!role && to.path == '/password') {
    next('/blog')
  } else {
    next()
  }
})

export default router
