import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import adminLogin from './views/Admin/login.vue'
import adminHome from './views/Admin/home.vue'

import adminSetting from '@/views/Admin/page/setting'
import adminArticle from '@/views/Admin/page/article'
import adminAddArticle from '@/views/Admin/page/addArticle'
import adminUsers from '@/views/Admin/page/users'
import adminMessage from '@/views/Admin/page/message'
import adminComment from '@/views/Admin/page/comment'
import resetRassword from '@/views/Admin/page/password'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: adminLogin,
      redirect: {
        name: 'adminLogin'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/admin/login',
      component: adminLogin,
      name: 'adminLogin'
    },
    {
      path: '/admin/home',
      component: adminHome,
      name: 'adminHome',
      children: [
        { path: '/admin/setting', component: adminSetting, name: 'adminSetting' }, 
        { path: '/admin/articlelist', component: adminArticle, name: 'adminArticle' }, 
        { path: '/admin/article/add', component: adminAddArticle, name: 'adminAddArticle' }, 
        { path: '/admin/article/edit/:id', component: adminAddArticle, name: 'adminEditArticle',  }, 
        { path: '/admin/users', component: adminUsers, name: 'adminUsers' }, 
        { path: '/admin/message', component: adminMessage, name: 'adminMessage' }, 
        { path: '/admin/comment', component: adminComment, name: 'adminComment' }, 
        { path: '/admin/resetpassword', component: resetRassword, name: 'resetRassword' }, 
        { path: '/admin/*', component: adminSetting, redirect: { name: 'adminSetting' } }
      ] 
    }
  ]
})
