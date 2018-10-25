import home from '@/views/index/home.vue'
import login from '@/views/index/login.vue'
import register from '@/views/index/register.vue'
import article from '@/views/index/article.vue'
import detail from '@/views/index/detail.vue'
import message from '@/views/index/message.vue'


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
        path: '/article',
        component: article,
        name: 'article',
      },
      {
        path: '/article/:id',
        component: detail,
        name: 'detail',
      },
      {
        path: '/message',
        component: message,
        name: 'message',
      },
    ]
  },
]
export default index
