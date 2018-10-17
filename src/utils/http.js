import Vue from 'vue'
import axios from 'axios'


var baseUrl = 'http://127.0.0.1:8888/'
// var baseUrl = 'http://192.168.4.85:8888/api/'
// var baseUrl = 'http://localhost:8888/api/'
// if (process.env.SERVER_VARIETY === 'prod') {
//   baseUrl = 'https://mapi.bestpay.com.cn/mapi/portal/'
// } else if (process.env.SERVER_VARIETY === 'pre') {
//   baseUrl = 'https://mapi-pre.bestpay.com.cn/mapi/portal/'
// } else {
//   // baseUrl = 'http://192.168.4.85:8000/api/'
//   baseUrl = 'http://119.29.27.100:8300/api/'
//   // baseUrl = 'http://mapi.test1.bestpay.net/mapi/portal/'
// }
function filterUrl (_url) {
  if (_url.startsWith('http')) {
    return _url
  } else {
    return baseUrl + _url
  }
}
export default {
  get (_url, _params) {
    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(_url),
        method: 'get',
        data: _params || {},
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        // Vue.$Messagebox.alert({
        //   title: '提示',
        //   message: '网络错误，请稍后再试'
        // })
        reject(error)
      })
    })
  },
  post (_url, _params) {
    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(_url),
        method: 'post',
        data: _params || {},
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        timeout: 20000
        // transformRequest: [function (data) {
        //   let ret = ''
        //   for (let it in data) {
        //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //   }
        //   return ret
        // }]
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        // Vue.$Messagebox.alert({
        //   title: '提示',
        //   message: '网络错误，请稍后再试'
        // })
        reject(error)
      })
    })
  }
}
