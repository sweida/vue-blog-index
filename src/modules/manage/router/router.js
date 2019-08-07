import Vue from 'vue'
import store from "@/store/index"

import Router from 'vue-router'
import NotFound from '@/404'

import manage from './manage'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  mode: "hash",
  routes: [
    {
      path: '*',
      component: NotFound,
    },
    ...manage,

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



// router.beforeEach((to, from, next) => {
//   // 使用钩子函数对路由进行权限跳转
//   // 如果用户已经登录，访问登录和注册时，自动跳转到首页

//   setTimeout(() => {
//     // 如果是超级管理员并且已经登陆状态则直接跳转到文章列表页面
//     const isadmin = store.state.user.user.admin
//     if (isadmin && to.path == "/login") {
//       next("/articlelist")
//     }

//     // 判断该路由是否需要登录权限
//     if (to.meta.requireAuth) {
//       if (isadmin) {  // 通过vuex state获取是否管理员
//         next();
//       }
//       else {
//         next({
//           path: '/login',
//           query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
//         })
//       }
//     }
//     else {
//       next();
//     }
//   }, 1000);
// })



export default router