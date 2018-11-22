import axios from 'axios'
import router from '@/router'
// import store from "../store";
import { Message } from 'element-ui'
import { removeLogin } from './loginStatus'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (config.url == 'apis/authentication/form') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.headers['deviceId'] = '9001'
    } else {
      config.headers['Content-Type'] = 'application/json;charset=utf-8'
      // let Authorization = "bearer " + getToken().access_token;
      // config.headers["Authorization"] = Authorization;
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  },
)

// respone拦截器
service.interceptors.response.use(
  res => {
    if (res.data.status == 401) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 2000,
        onClose() {
          removeLogin()
          router.push('/admin/login')
        },
      })
      return res
    } else {
      resolve(res)
    }
    if (res.status == 401) {
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 2000,
        onClose() {
          // removeToken();
          router.push('/')
        },
      })
      return res
    } else if (res.status == 500) {
      Message({
        message: '服务器错误',
        type: 'error',
        duration: 2000,
        onClose() {
          // removeToken();
          router.push('/')
        },
      })
    } else {
      return res
    }
  },
  error => {
    if (error.response.status == 401) {
      Message({
        message: '登录信息过期，请重新登录！',
        type: 'error',
        duration: 800,
        onClose() {
          // removeToken();
          router.push('/login')
        },
      })
    }
    if (error.response.status == 504) {
      Message({
        message: '服务器异常！',
        type: 'error',
        duration: 800,
        onClose() {
          // removeToken();
          router.push('/login')
        },
      })
    }
    // Message({
    //   message: error.response.data.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  },
)

export default service

// export default {
//   get (_url, _params) {
//     return new Promise((resolve, reject) => {
//       axios({
//         url: _url,
//         method: 'get',
//         data: _params || {},
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         transformRequest: [function (data) {
//           let ret = ''
//           for (let it in data) {
//             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//           }
//           return ret
//         }]
//       }).then((res) => {
//         if (res.data.status == 401) {
//           Message({
//             message: res.data.msg,
//             type: "error",
//             duration: 2000,
//             onClose() {
//               removeLogin();
//               router.push("/admin/login");
//             }
//           })
//         } else {
//           resolve(res);
//         }
//       }).catch((error) => {
//         reject(error)
//       })
//     })
//   },
//   post (_url, _params) {
//     return new Promise((resolve, reject) => {
//       axios({
//         url: _url,
//         method: 'post',
//         data: _params || {},
//         headers: {
//           'Content-Type': 'application/json;charset=UTF-8'
//         },
//         timeout: 20000
//       }).then((res) => {
//         if (res.data.status == 401) {
//           Message({
//             message: res.data.msg,
//             type: "error",
//             duration: 2000,
//             onClose() {
//               removeLogin();
//               router.push("/admin/login");
//             }
//           })
//         } else {
//           resolve(res)
//         }
//       }).catch((error) => {
//         reject(error)
//       })
//     })
//   }
// }
