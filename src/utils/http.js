import axios from 'axios'
import router from '@/router/router'
import { Message } from 'element-ui'
// import { removeLogin } from './loginStatus'
import store from "../store/index"

// 配置开发和生产的请求接口
const service = axios.create({
  // baseURL: process.env.VUE_APP_URL,
  timeout: 10000
})

// 设置header请求头，发起请求前做的事情
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = store.state.user.token
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  },
)

// respone拦截器，发起请求后做的事情
service.interceptors.response.use(
  res => {
    // 当有新的token时自动更新新的token
    if (res.headers.authorization){
      store.dispatch("Token", res.headers.authorization);
    }
    if (res.status && res.status == 200 && res.data.status == 'error') {
      Message({
        message: res.data.message,
        type: 'error',
        duration: 2000
      })
      return;
    }
    return res;
  },
  error => {
    if (error.response.status == 401 || 422) {
      // 登录过期
      Message({
        message: '登录状态已经过期，请重新登录',
        type: 'error',
        duration: 2000,
        onClose() {
          store.dispatch("Logout");
          router.push({ 
            path: '/login', 
            query: { redirect: window.location.hash.substr(1) }
          })
        },
      })
    } else if (error.response.status == 403) {
      // 没有权限
      Message({
        message: error.response.data.message,
        type: 'error',
        duration: 2000,
        onClose() {
          store.dispatch("Logout");
          router.push('/login')
        },
      })
    } else if (error.response.status == 500) {
      // 服务器链接失败
      Message({
        message: '服务器连接失败，请稍后再试',
        type: 'error',
        duration: 2000
      })
    } else {
      Message({
        message: error.response.status+': ' +error.response.data.message,
        type: 'error',
        duration: 2000
      })
    }
    return Promise.reject(error)
  },
)


export default service
