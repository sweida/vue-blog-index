import page from './page.vue'
// 这里是重点
const MyPage = {
  install: function(Vue) {
    Vue.component('MyPage', page)
  },
}

// 导出组件
export default MyPage
