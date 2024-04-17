import spinLoading from './spinLoading.vue'
// 这里是重点
const SpinLoading = {
  install: function(Vue) {
    Vue.component('SpinLoading', spinLoading)
  },
}

// 导出组件
export default SpinLoading
