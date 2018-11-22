import axios from 'axios'
import router from '@/router/router'
import { Message } from 'element-ui'

import { removeLogin } from './loginStatus'

// 配置开发和生产的请求接口
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  timeout: 10000
})

// 设置header请求头
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  },
)

// respone拦截器
service.interceptors.response.use(
  res => {
    if (res.data.status == 401) {
      // 管理员登录过期
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
    } else if (res.data.status == 2) {
      removeLogin()
      return res
    } else {
      return res
    }
  },
  error => {
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
