<template>
  <div id="index">
    <headnav></headnav>
    <section class="content">
      <router-view class="main animate03" />
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import headnav from './headnav'
import Footer from './footer'
import '@/style/index.styl'

export default {
  components: {
    headnav,
    Footer
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
#index
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .content
    display: flex;
    flex-direction: row;
    flex: 1;
    box-sizing: border-box;
    padding: 20px 3%;
    .main
      max-width 940px
      margin auto
/* 退出登录菜单样式 */
.el-dialog__title
  font-size: 16px
.el-menu--horizontal .el-submenu>.el-menu
  top: 60px
  border-radius: 0
.el-submenu .el-menu-item
  min-width: 150px
</style>
