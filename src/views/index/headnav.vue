<template>
  <div class="header">
    <div class="menu">
      <div>
        <img src="../../assets/logo.png" class="logo" />
        <li>
          <router-link to="/">首页</router-link>

        </li>
        <li>
          <router-link to="/article">博文</router-link>
        </li>
        <li>
          <router-link to="/link">友链</router-link>
        </li>
        <li>
          <router-link to="/message">留言</router-link>
        </li>
      </div>
      <div>
        <router-link to="/login">登陆</router-link>
        <router-link to="/register">注册</router-link>
      </div>
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
.header
  display: flex
  height: 60px
  background: #253752
  color #fff
  .nav
    display: flex
    justify-content: flex-end
    flex: 1
  // .logo
  //   width: 360px
  //   display: flex
  //   justify-content: center
  //   align-content: center
  //   img
  //     width: 200px

.header .menu
  width 1000px
  margin 0 auto
  display flex
  color #fff
  justify-content space-between
  font-size 14px
  div
    display flex
    align-items center
    a 
      color #fff
    li
      padding 0 15px

.logo
  width 100px
</style>
