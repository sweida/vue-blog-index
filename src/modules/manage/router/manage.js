const Login = resolve => require(["@/modules/manage/login"], resolve);
const Home = resolve => require(["@/modules/manage/home.vue"], resolve);
const Setting = resolve => require(["@/modules/manage/page/setting"], resolve);
const Article = resolve => require(["@/modules/manage/page/article"], resolve);
const AddArticle = resolve => require(["@/modules/manage/page/addArticle"], resolve);
const Users = resolve => require(["@/modules/manage/page/users"], resolve);
const Message = resolve => require(["@/modules/manage/page/message"], resolve);
const Comment = resolve => require(["@/modules/manage/page/comment"], resolve);
const Rassword = resolve => require(["@/modules/manage/page/password"], resolve);
const Link = resolve => require(["@/modules/manage/page/link"], resolve);
const Ad = resolve => require(["@/modules/manage/page/ad"], resolve);


const manage = [
  {
    path: "/",
    component: Login,
    redirect: { name: "manageLogin" }
  },
  {
    path: "/login",
    component: Login,
    name: "manageLogin"
  },
  {
    path: "/home",
    component: Home,
    name: "manageHome",
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: "/setting",
        component: Setting,
        name: "基础设置",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/articlelist",
        component: Article,
        name: "博文列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/article/add",
        component: AddArticle,
        name: "写博客",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/article/edit/:id",
        component: AddArticle,
        name: "编辑博文",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/users",
        component: Users,
        name: "会员列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/message",
        component: Message,
        name: "留言板",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/comment",
        component: Comment,
        name: "评论列表",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/resetpassword",
        component: Rassword,
        name: "修改密码",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/link",
        component: Link,
        name: "友情链接",
        meta: {
          requireAuth: true
        }
      },
      {
        path: "/ad",
        component: Ad,
        name: "广告图",
        meta: {
          requireAuth: true
        }
      },
      { path: "/*", redirect: { name: "基础设置" } }
    ]
  }
];
export default manage