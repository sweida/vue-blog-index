import home from '@/views/index/home'
import login from '@/views/index/login'
import register from '@/views/index/register'
import blog from '@/views/index/blog'
import detail from '@/views/index/detail'
import message from '@/views/index/message'
import link from '@/views/index/link'
import about from '@/views/index/about'
import recover from '@/views/index/recover'
import reset from '@/views/index/reset'
import password from '@/views/index/password'

const index = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/home',
    component: home,
    name: 'home',
    children: [
      {
        path: '/about',
        component: about,
        name: 'about',
      },
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
      {
        path: '/recover',
        component: recover,
        name: 'recover'
      },
      {
        path: '/reset',
        component: reset,
        name: 'reset'
      },
      {
        path: '/password',
        component: password,
        name: 'password'
      },
    ],
  },
]
export default index
