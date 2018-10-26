<template>
  <div>
    <div class="foot-text">
      <p>Crafted with <i class="iconfont lv-icon-aixin"></i> by sweida</p>
      <p>© 2018 马里奥 备案：不存在的</p>
      
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      classifys: [],
      tip: ''
    }
  },
  created() {
    this.getClassify()
  },
  methods: {
    // 获取所有分类
    getClassify() {
      this.$get('apis/article/classify').then(res => {
        console.log(res.data, 'classifys')
        this.classifys = res.data.data
      })
    }
  }

}
</script>

<style scoped lang="stylus">
.foot-text
  text-align center
.lv-icon-aixin
  color red

</style>
