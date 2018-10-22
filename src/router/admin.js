import adminLogin from '@/views/admin/login.vue'
import adminHome from '@/views/admin/home.vue'

import adminSetting from '@/views/admin/page/setting'
import adminArticle from '@/views/admin/page/article'
import adminAddArticle from '@/views/admin/page/addArticle'
import adminUsers from '@/views/admin/page/users'
import adminMessage from '@/views/admin/page/message'
import adminComment from '@/views/admin/page/comment'
import resetRassword from '@/views/admin/page/password'
import adminLink from '@/views/admin/page/link'
import adminAd from '@/views/admin/page/ad'

const admin = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login,
  //   beforeEnter: (to, from, next) => {
  //     next()
  //   }
  // },
  {
    path: '/',
    component: adminLogin,
    redirect: {
      name: 'adminLogin'
    }
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
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      { path: '/admin/setting', component: adminSetting, name: 'adminSetting' },
      { path: '/admin/articlelist', component: adminArticle, name: 'adminArticle' },
      { path: '/admin/article/add', component: adminAddArticle, name: 'adminAddArticle' },
      { path: '/admin/article/edit/:id', component: adminAddArticle, name: 'adminEditArticle', },
      { path: '/admin/users', component: adminUsers, name: 'adminUsers' },
      { path: '/admin/message', component: adminMessage, name: 'adminMessage' },
      { path: '/admin/comment', component: adminComment, name: 'adminComment' },
      { path: '/admin/resetpassword', component: resetRassword, name: 'resetRassword' },
      { path: '/admin/link', component: adminLink, name: 'adminLink' },
      { path: '/admin/ad', component: adminAd, name: 'adminAd' },
      { path: '/admin/*', component: adminSetting, redirect: { name: 'adminSetting' } }
    ]
  }
]
export default admin