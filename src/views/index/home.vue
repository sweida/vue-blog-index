<template>

  <div id="index">
      <headnav></headnav>
      <section class="content">

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="main animate03"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="main animate03"></router-view>
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
import '@/style/index.styl'

export default {
  components: {
    headnav,
    Footer
  },
  data: () => ({
    ops: {
      vuescroll: {},
      scrollPanel: {}
    }
  }),
  computed: mapState({
    user:state=>state.user
  }),  
  created() {
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
  },
  methods: {

  }
}
</script>

<style lang="stylus">
.height
  height 100%
#index
  width:100%;
  // background url(../../assets/parchment.jpg) repeat-y
  .content
    box-sizing: border-box;
    padding: 60px 4%;
    overflow: hidden
    color: #3d4852
    // font-weight: bold

    .banner
      max-width: 640px
      margin 30px auto 0
      img 
        width 100%
    .main
      max-width 940px
      margin auto


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

.main {
  animation: main 1s;
}
@keyframes main{
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
  #index
    .content
      .banner
        width 80%
        margin 20px auto 0
  .ivu-back-top
    bottom 80px !important
    right 20px !important
  .top
    background #b8297e

</style>
