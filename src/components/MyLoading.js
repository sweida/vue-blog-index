import loading from './myLoading.vue'
// 这里是重点
const MyLoading = {
  install: function(Vue) {
    Vue.component('MyLoading', loading)
  },
}

// 导出组件
export default MyLoading
