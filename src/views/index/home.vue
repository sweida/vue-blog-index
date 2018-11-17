<template>

  <div id="index">
      <headnav></headnav>
      <section class="content">
        <About class="slide animate03" v-if="$route.path == '/'"></About>
        
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
import {mapState} from "vuex"
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
  computed: mapState({
    user:state=>state.user,
    webinfo:state=>state.webinfo,
  }),  
  created() {
    console.log(this.$route, 4444)
    // 登录状态
    this.$get('/apis/login_Status').then(res => {
      if (res.data.status == 2) {
        localStorage.removeItem('user')
        this.$store.commit('increment', '')
      } else if (res.data.status == 1) {
        let user = {
          id: res.data.id,
          username: res.data.username
        }
        localStorage.setItem('user', JSON.stringify(user))
        this.$store.commit('increment', user)
      }
    })
    this.getWebInfo()
  },
  methods: {
    getWebInfo() {
      this.$get('/apis/webinfo/read').then(res => {
        this.$store.commit('inWebinfo', res.data.data)
      })
    }
  }
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
