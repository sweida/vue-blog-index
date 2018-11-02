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
      <!-- <transition name="el-fade-in">
        <router-view class="main animate03" />
      </transition> -->
      <!-- <transition name="page-move"> -->
        <router-view class="main animate03" />
        <BackTop :height="300" :bottom="100">
          <div class="top animate03">
            <Icon type="ios-arrow-up" />
          </div>
        </BackTop>
      <!-- </transition> -->
      <!-- <router-view class="main animate03" /> -->
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
  data: () => ({

  }),
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
    padding: 20px 3%;
    overflow: hidden
    background: #f8f8f9;
    .banner
      max-width: 640px
      margin 30px auto 0
      img 
        width 100%
    .main
      max-width 940px
      margin auto



.top
  background: #93a6ab
  color: #fff;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
.top:hover
  background #73878c
.ivu-back-top i 
  padding: 6px 8px !important

.main {
  animation: main 1s;
}
@keyframes main{
  0%{
    opacity:0
    transform:translateY(0px)
  }
  100%{
    opacity:1;
    transform:translateY(0)
  }
}

@media screen and (max-width: 640px)
  #index
    .content
      .banner
        width 80%
        margin 20px auto 0
  .ivu-back-top
    bottom 80px !important
    right 20px !important
  .top
    background #73878c
// /* 退出登录菜单样式 */
// .el-dialog__title
//   font-size: 16px
// .el-menu--horizontal .el-submenu>.el-menu
//   top: 60px
//   border-radius: 0
// .el-submenu .el-menu-item
//   min-width: 150px
</style>
