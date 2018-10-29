<template>
  <div id="index">
    <headnav></headnav>
    <section class="content">

      <!-- <div class="banner">
        <img src="../../assets/banner.jpg" alt="">
      </div> -->
      <!-- <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="main animate03"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" class="main animate03"></router-view> -->
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
  created() {
    this.$get('/apis/login_Status').then(res => {
      console.log(res, 'islogin')
    })
  },
  methods: {

  }
}
</script>

<style lang="stylus">
#index
  width:100%;
  height: 100%;
  .content
    box-sizing: border-box;
    padding: 80px 3% 20px;
    overflow: hidden
    .banner
      max-width: 640px
      margin 30px auto 0
      img 
        width 100%
    .main
      max-width 940px
      margin auto

@media screen and (max-width: 640px)
  #index
    .content
      .banner
        width 80%
        margin 20px auto 0

// /* 退出登录菜单样式 */
// .el-dialog__title
//   font-size: 16px
// .el-menu--horizontal .el-submenu>.el-menu
//   top: 60px
//   border-radius: 0
// .el-submenu .el-menu-item
//   min-width: 150px
</style>
