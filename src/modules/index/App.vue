<template>
  <div id="app">
    <Headnav></Headnav>
    <section class="content blog">
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
import Headnav from './components/headnav'
import Footer from './components/footer'
import '@/style/index.styl'
import '@/style/hybrid.styl'
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'app',
  components: {
    Headnav,
    Footer,
  },
  computed: {
    ...mapGetters([
      'user',
      'token',
      'webInfo',
      'banners'
    ])
  }, 
  data() {
    return {
    }
  },
  created() {
    // 有token,没有user时才请求用户信息
    if (this.token){
      this.UserInfo()
    }
    if (!this.webInfo){
      this.WebInfo()
    }
    this.Banners()
    // if (!this.banners) {
    // }
    // this.$Loading.config({
    //   color: '#fff',
    //   failedColor: '#000',
    //   height: 50
    // })
  },
  methods: {
    ...mapActions([
      'UserInfo',
      'WebInfo',
      'Banners'
    ]),
  }
}
</script>

<style lang="stylus">
html, body, #app
  height 100%
  display flex
  flex-direction column
  margin 0
  padding 0
section.content
  flex 1

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
  animation: slide .8s;
}
@keyframes slide{
  0%{
    opacity:0.3
    transition: all .5s cubic-bezier(.19,1,.22,1);
    transform: translate3d(0,-20px,0);
    // transform:translateY(-20px)
  }
  100%{
    opacity:1;
    transition: all .5s cubic-bezier(.22,1,.27,1);
    transform: translateZ(0);
    // transform:translateY(0)
  }
}

@media screen and (max-width: 640px)
  .ivu-back-top
    bottom 80px !important
    right 20px !important
  .top
    background #b8297e


</style>
