<template>

  <div id="index">
      <headnav></headnav>
      <section class="content">
        <div class="home slide animate03" v-if="$route.path == '/'">
          <div class="banner">
            <img src="../../assets/banner.jpg" >
          </div>
          <div class="webbase">
            <h2>你好Laravel、Vue</h2>
            <h3>本站尝试使用如下技术/工具构建</h3>
            <h3>配合单页架构营造响应式设计、顺滑体验</h3>
          </div>
          <!-- <p>Laravel + Vue 强力驱动</p> -->
          <div class="make">
            <div>
              <img src="../../assets/laravel.jpg" alt="">
              <p>Laravel</p>
            </div>
            <i class="iconfont lv-icon-aixin"></i>
            <div>
              <img src="../../assets/vue.jpg" alt="">
              <p>Vue</p> 
            </div>
          </div>

          <div class="about-bg">
            <img src="../../assets/about.jpg" >
            <div class="bg"></div>
          </div>
          <div class="about">
            <h2>关于我</h2>
            <span>——集技术和颜值于一身的程序猿</span>
            <div class="text">
              <p>施伟达，90后、我也不知道什么星座的普通青年，毕业于广东一所野鸡大学的电子信息专业。</p>
              <p>与时俱进的电脑迷、技术控、真会修电脑的程序猿（头未秃，发未白）。</p>
              <p>15年开始接触前端，一路单刷副本，17年开始学习后端语言，打怪升级，目标成功合格的全栈攻城狮。</p>
              <div class="skills">
                <p>目前已习得技能</p>
                <img src="../../assets/skills.png" alt="">
              </div>
              <p>从 2017 年开始写博客记录自己技术成长的一点一滴，用过了多种博客，从最开始的博客园，到用github的issues为接口搭建的网站、再到hexo。</p>
              <p>但是每个都有各自的缺点和局限性，逼格档次也不够，本着不折腾会死的心，决定自己写一个，功能必须齐全的，于是瞎折腾了2个月，本站终于诞生了，代码写的有点丑，请见谅。</p>
              <span>坐标 GuangZhou「广州」</span>
            </div>
            
          </div>

        </div>

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="main slide animate03"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="main slide animate03"></router-view>
        
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
  },
  methods: {

  }
}
</script>

<style lang="stylus">

.home
  margin 60px auto
.banner
  max-width: 800px
  margin -40px auto 0
  img 
    width 100%
.height
  height 100%
#index
  width:100%;

  .main
    margin 60px auto


.webbase
  text-align center
  padding 50px 0
  h2
    font-weight 300
    font-size 28px
  h3
    font-weight 300
    font-size 22px
.make
  padding 50px 0
  display: flex;
  align-items: center;
  justify-content: center;
  text-align center
  font-size 20px
  line-height 30px
  font-family: cursive;
  font-weight: bold;
  img 
    max-width 120px
  i
    margin -30px 40px 0
    color red
    font-size 26px

.skills
  max-width 800px
  text-align center
  margin auto
  img
    max-width 100% 
.about-bg
  width 100%
  height 600px
  position relative
  img 
    width: 100%;
    position absolute
    top 0
    -o-object-fit: cover;
    object-fit: cover;
    height: 100%;
  .bg
    background: #8a8a8a
    mix-blend-mode: multiply
    height: 100%

.about
  text-align center
  position relative
  p
    padding-bottom 10px
  h2
    position: relative;
    font-size: 34px;
    font-weight: 300;
    padding-bottom: 20px;
    margin-bottom: 20px;
  h2:after
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 80px;
    height: 2px;
    margin-left: -40px;
    content: '';
    background-color: #f7576c
  span
    color: #9eabb3;
    font-size 16px
    font-style: oblique;
    line-height: 40px;
  .text
    padding 20px 10%
    line-height 24px
    font-size 15px 


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

  .about-bg
    height 280px
  .about 
    .text
      padding 20px 0 
    span
      font-family: cursive;
  .ivu-back-top
    bottom 80px !important
    right 20px !important
  .top
    background #b8297e

</style>
