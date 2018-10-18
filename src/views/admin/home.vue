<template>
  <div class="Admin">
    <headnav class="headnav"></headnav>
    <main class="content">
      <leftnav></leftnav>
      <router-view class="main" />
    </main>
  </div>
</template>

<script>

import headnav from './headnav'
import leftnav from './leftnav'
import '@/style/common.styl'
export default {
  name: 'app',
  components: {
    headnav,
    leftnav
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
.Admin
  height: 100%
  display: flex
  flex-direction: column
main
  flex: 1
  display: flex

/* 退出登录菜单样式 */
.el-dialog__title
  font-size: 16px
.el-menu--horizontal .el-submenu>.el-menu
  top: 60px
  border-radius: 0
.el-submenu .el-menu-item
  min-width: 150px
</style>
