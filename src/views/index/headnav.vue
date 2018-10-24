<template>
  <div class="header">
    <div class="menu">
      <div>
        <div>博客logo</div>
        <li>首页</li>
        <li>前端</li>
        <li>后端</li>
        <li>工具</li>
        <li>随写</li>
      </div>
      <div>
        <li>登陆</li>
        <li>注册</li>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  data () {
    return {
      tip: ''
    }
  },
  methods: {
    logout: function () {

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
  .logo
    width: 360px
    display: flex
    justify-content: center
    align-content: center
    img
      width: 200px

.header .menu
  width 1000px
  margin 0 auto
  display flex
  justify-content space-between
  font-size 14px
  div
    display flex
    align-items center
    li
      padding 0 15px
</style>
