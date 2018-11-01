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
})

router.beforeEach((to, from, next) => {   // 使用钩子函数对路由进行权限跳转
  const role = localStorage.getItem('user');
  // 如果用户已经登录，访问登录和注册时，自动跳转到首页
  if ( role && (to.path == '/login' || to.path == '/register') ) {  
　　next('/');
　} else {
    next()
  } 
})

export default router