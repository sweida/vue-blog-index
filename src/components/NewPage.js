import newPage from './newPage.vue'
// 这里是重点
const NewPage = {
  install: function(Vue) {
    Vue.component("NewPage", newPage);
  },
}

// 导出组件
export default NewPage
