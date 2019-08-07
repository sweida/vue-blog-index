<template>
  <div id="Admin">
    <leftnav></leftnav>
    <section class="content">
      <headnav></headnav>
      <router-view class="warp animate03" />
    </section>
  </div>
</template>

<script>
import headnav from './headnav'
import leftnav from './leftnav'
import '@/style/common.styl'
import '@/style/table.styl'
import {mapState, mapGetters} from "vuex"

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
  computed: mapState({
    user:state=>state.user
  }),
  created() {

  },
  methods: {
  }
}
</script>

<style lang="stylus">
#Admin
  width:100%;
  height: 100%;
  display: flex;
  .content
    position relative
    flex-direction: column;
    display: flex;
    flex: 1;
    box-sizing: border-box;
    background: #E2E5EE;
    width 0
    // padding: 20px 40px;


/* 退出登录菜单样式 */
.el-dialog__title
  font-size: 16px
.el-menu--horizontal .el-submenu>.el-menu
  top: 60px
  border-radius: 0
.el-submenu .el-menu-item
  min-width: 150px
</style>
