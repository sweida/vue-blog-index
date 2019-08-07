import Vue from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css' //样式文件

Vue.directive('highlight', function(el) {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})

// 高亮颜色
// a11y-dark.css 还可以
// atom-one-dark-reasonable.css  还可以atom
// gruvbox-dark.css 太深，还可以
// ir-black.css 就是这个颜色了
// monokai.css 经典颜色
// railscasts.css rainbow.css 修改一下还可以
// solarized-dark.css 太亮了，还可以
// vs2015.css 手机看还行
