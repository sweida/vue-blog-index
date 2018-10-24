<template>
  <div id="index">
    <headnav></headnav>
    <section class="content">
      <router-view class="main animate03" />
    </section>
  </div>
</template>

<script>
import headnav from './headnav'
import '@/style/index.styl'

export default {
  components: {
    headnav
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
    background: #E2E5EE;
    padding: 20px 40px;


/* 退出登录菜单样式 */
.el-dialog__title
  font-size: 16px
.el-menu--horizontal .el-submenu>.el-menu
  top: 60px
  border-radius: 0
.el-submenu .el-menu-item
  min-width: 150px
</style>
