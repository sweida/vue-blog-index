// import adminLogin from '@/views/admin/login.vue'
// import adminHome from '@/views/admin/home.vue'
// import adminSetting from '@/views/admin/page/setting'
// import adminArticle from '@/views/admin/page/article'
// import adminAddArticle from '@/views/admin/page/addArticle'
// import adminUsers from '@/views/admin/page/users'
// import adminMessage from '@/views/admin/page/message'
// import adminComment from '@/views/admin/page/comment'
// import resetRassword from '@/views/admin/page/password'
// import adminLink from '@/views/admin/page/link'
// import adminAd from '@/views/admin/page/ad'

const adminLogin      = resolve => require(["@/views/admin/login"], resolve);
const adminHome       = resolve => require(["@/views/admin/home.vue"], resolve);
const adminSetting    = resolve => require(["@/views/admin/page/setting"], resolve);
const adminArticle    = resolve => require(["@/views/admin/page/article"], resolve);
const adminAddArticle = resolve => require(["@/views/admin/page/addArticle"], resolve);
const adminUsers      = resolve => require(["@/views/admin/page/users"], resolve);
const adminMessage    = resolve => require(["@/views/admin/page/message"], resolve);
const adminComment    = resolve => require(["@/views/admin/page/comment"], resolve);
const resetRassword   = resolve => require(["@/views/admin/page/password"], resolve);
const adminLink       = resolve => require(["@/views/admin/page/link"], resolve);
const adminAd         = resolve => require(["@/views/admin/page/ad"], resolve);


const admin = [
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
      { path: '/admin/setting', component: adminSetting, name: '基础设置' },
      { path: '/admin/articlelist', component: adminArticle, name: '博文列表' },
      { path: '/admin/article/add', component: adminAddArticle, name: '写博客' },
      { path: '/admin/article/edit/:id', component: adminAddArticle, name: '编辑博文', },
      { path: '/admin/users', component: adminUsers, name: '会员列表' },
      { path: '/admin/message', component: adminMessage, name: '留言板' },
      { path: '/admin/comment', component: adminComment, name: '评论列表' },
      { path: '/admin/resetpassword', component: resetRassword, name: '修改密码' },
      { path: '/admin/link', component: adminLink, name: '友情链接' },
      { path: '/admin/ad', component: adminAd, name: '广告图' },
      { path: '/admin/*', redirect: { name: '基础设置' } }
    ]
  }
]
export default admin