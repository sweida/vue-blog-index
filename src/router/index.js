import home from '@/views/index/home'

import blog from '@/views/index/page/blog'
import detail from '@/views/index/page/detail'
import message from '@/views/index/page/message'
import link from '@/views/index/page/link'
import about from '@/views/index/page/about'
import shang from '@/views/index/page/shang'

import login from '@/views/index/user/login'
import register from '@/views/index/user/register'
import recover from '@/views/index/user/recover'
import password from '@/views/index/user/password'
import person from '@/views/index/user/person'

const index = [
  {
    path: "/",
    component: home
  },
  {
    path: "/home",
    component: home,
    name: "home",
    children: [
      {
        path: "/about",
        component: about,
        name: "about"
      },
      {
        path: "/login",
        component: login,
        name: "login"
      },
      {
        path: "/register",
        component: register,
        name: "register"
      },
      {
        path: "/blog",
        component: blog,
        name: "blog",
        meta: {
          keepAlive: true // 需要被缓存
        }
      },
      {
        path: "/blog/:id",
        component: detail,
        name: "detail"
      },
      {
        path: "/message",
        component: message,
        name: "message",
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/link",
        component: link,
        name: "link",
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/recover",
        component: recover,
        name: "recover"
      },
      {
        path: "/password",
        component: password,
        name: "password"
      },
      {
        path: "/shang",
        component: shang,
        name: "shang",
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/person",
        component: person,
        name: "person"
      }
    ]
  }
];
export default index
