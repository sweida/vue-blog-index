<template>

  <div id="index">
      <headnav></headnav>
      <section class="content blog">
        <!-- <About class="slide animate03" v-if="$route.path == '/'"></About> -->
        
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="slide animate03"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="slide animate03"></router-view>
        
        <!-- <transition name="el-fade-in">
          <router-view class="main animate03" />
        </transition> -->

        <BackTop :height="300" :bottom="100">
          <div class="top animate03">
            <Icon type="ios-arrow-up" />
          </div>
        </BackTop>

      </section>
      <Footer></Footer>

  </div>

</template>

<script>
import headnav from './headnav'
import Footer from './footer'
import About from './page/about'
import '@/style/index.styl'
import '@/style/hybrid.styl'

export default {
  components: {
    headnav,
    Footer,
    About
  },
  data: () => ({
    ops: {
      vuescroll: {},
      scrollPanel: {}
    }
  }),
  created() {
  },

}
</script>

<style lang="stylus">

// 回到顶部
.ivu-back-top
  z-index 30 !important
.top
  background: #b8297e
  color: #fff;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
.top:hover
  background #64156e
.ivu-back-top i 
  padding: 6px 8px !important

.slide {
  animation: slide 1s;
}
@keyframes slide{
  0%{
    opacity:0
    transform:translateY(10px)
  }
  100%{
    opacity:1;
    transform:translateY(0)
  }
}

@media screen and (max-width: 640px)
  .ivu-back-top
    bottom 80px !important
    right 20px !important
  .top
    background #b8297e

</style>
