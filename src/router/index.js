import home from '@/views/index/home'
import login from '@/views/index/login'
import register from '@/views/index/register'
import blog from '@/views/index/blog'
import detail from '@/views/index/detail'
import message from '@/views/index/message'
import link from '@/views/index/link'

const index = [
  {
    path: '/',
    component: home,
    redirect: {
      name: 'home',
    },
  },
  {
    path: '/home',
    component: home,
    name: 'home',
    children: [
      {
        path: '/login',
        component: login,
        name: 'login',
      },
      {
        path: '/register',
        component: register,
        name: 'register',
      },
      {
        path: '/blog',
        component: blog,
        name: 'blog',
        meta: {
          keepAlive: true, // 需要被缓存
        },
      },
      {
        path: '/blog/:id',
        component: detail,
        name: 'detail',
      },
      {
        path: '/message',
        component: message,
        name: 'message',
        meta: {
          keepAlive: true, // 需要被缓存
        },
      },
      {
        path: '/link',
        component: link,
        name: 'link',
        meta: {
          keepAlive: true, // 需要被缓存
        },
      },
    ],
  },
]
export default index
