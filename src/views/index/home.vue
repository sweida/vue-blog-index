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
            <div class="title">
              <h2>关于我</h2>
              <em>——集技术和颜值于一身的程序猿</em>
              <em>坐标 GuangZhou「广州」</em>
            </div>
          </div>
          <div class="about">
            <p>施伟达，90后、毕业于广东一所野鸡大学的电子信息专业，沉迷于编程不能自拔。</p>
            <p>与时俱进的电脑迷、技术控、真会修电脑的程序猿（头未秃，发未白）。</p>
            <p>15年开始接触前端，一路单刷副本，17年开始学习后端语言，打怪升级，目标成功合格的全栈攻城狮。</p>
            <div class="skills">
              <p>目前已习得技能</p>
              <img src="../../assets/skills.png" alt="">
            </div>            
          </div>

          <div class="about-bg">
            <img src="../../assets/blog.jpg" >
            <div class="bg"></div>
            <div class="title">
              <h2>关于博客</h2>
              <em>在每一个苦思冥想的瞬间求知</em>
            </div>
          </div>
          <div class="about">
            <p>从 2017 年开始写博客记录自己技术成长的一点一滴，用过了多种博客，从最开始的博客园，到Hexo，再到WordPress。</p>
            <p>但是每个都有各自的缺点和局限性，逼格档次也不够，本着不折腾会死的心，决定自己写一个，功能必须齐全的，于是瞎折腾了2个月，本站终于诞生了，代码写的有点丑，请见谅。</p>
            <a href="https://github.com/sweida/laravel" target="_blank" class="link">
              后端源码
            </a>
            <a href="https://github.com/sweida/lv-blog" target="_blank" class="link">
              前端源码
            </a>
            <p>如果该项目对你有帮助，希望可以给个<em>star</em></p>
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
#index
  width:100%;
  .home
    margin 20px auto
    .banner
      max-width: 800px
      margin 0 auto
      img 
        width 100%

.webbase
  text-align center
  padding 50px 20px
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
    max-width 100px
  i
    margin -30px 40px 0
    color red
    font-size 26px


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
    background: #8a8588
    mix-blend-mode: multiply
    height: 100%
  .title
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    h2
      position: relative;
      font-size: 34px;
      font-weight: 300;
      padding-bottom: 30px;
      margin-bottom: 30px;
    h2:after
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 80px;
      height: 2px;
      margin-left: -40px;
      content: '';
      background-color: #FF5722
    em
      color: #d0d6da
      font-size 16px
      font-style: oblique;
      line-height: 40px;

.about
  text-align center
  position relative
  line-height 26px
  font-size 18px 
  padding 60px 20px
  max-width 700px
  margin auto
  p
    padding-bottom 10px
  em
    color: #9eabb3;
    font-size 16px
    font-style: oblique;
    line-height: 40px;
  a
    margin 0 10px
.skills
  max-width 800px
  text-align center
  margin auto
  p
    font-size 20px
    color #f7576c
  img
    max-width 100% 


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

  .about-bg
    height 300px
  .about 
    padding 40px 20px
    font-size 16px
    em
      font-family: cursive;

  .about-bg .title 
    h2
      font-size: 26px;
      padding-bottom: 20px;
      margin-bottom: 20px;
    em
      font-family: cursive;
</style>
