import textloading from "./textLoading.vue";
// 这里是重点
const TextLoading = {
  install: function(Vue) {
    Vue.component("TextLoading", textloading);
  },
}

// 导出组件
export default TextLoading;
