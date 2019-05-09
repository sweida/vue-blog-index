import Vue from 'vue'
import store from "../store/store"

import Router from 'vue-router'
import NotFound from '../404'

import admin from './admin'
import index from './index'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
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
  } else if (!role && (to.path == "/password" || to.path == "/person")) {
    next("/blog")
  } else {
    next();
  }

  // 如果是超级管理员并且已经登陆状态则直接跳转到文章列表页面
  const isadmin = store.state.user.is_admin
  if (isadmin && to.path == "/admin/login") {
    next("/admin/articlelist")
  }

  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {  
    if (isadmin) {  // 通过vuex state获取是否管理员
      next();
    }
    else {
      next({
        path: '/admin/login',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})

export default router
