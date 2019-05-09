import home from "@/views/index/home"
import blog from "@/views/index/page/blog"
import about from "@/views/index/page/about"

const detail   = resolve => require(["@/views/index/page/detail"], resolve);
const message  = resolve => require(["@/views/index/page/message"], resolve);
const link     = resolve => require(["@/views/index/page/link"], resolve);
const donate   = resolve => require(["@/views/index/page/donate"], resolve);

const login    = resolve => require(["@/views/index/user/login"], resolve);
const register = resolve => require(["@/views/index/user/register"], resolve);
const recover  = resolve => require(["@/views/index/user/recover"], resolve);
const password = resolve => require(["@/views/index/user/password"], resolve);
const person   = resolve => require(["@/views/index/user/person"], resolve);

const index = [
  {
    path: "/",
    component: home,
    redirect: '/blog',
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: "/home",
    component: home,
    name: "home",
    meta: {
      keepAlive: true
    },
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
        path: "/donate",
        component: donate,
        name: "donate",
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
