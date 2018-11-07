<template>
    <!-- <vue-scroll :ops="ops"> -->
      <!-- <el-scrollbar class="height"> -->
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
        <!-- <transition name="page-move"> -->
          <!-- <router-view class="main animate03" /> -->
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
  <!-- </el-scrollbar> -->
    <!-- </vue-scroll> -->
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
    ops: {
      vuescroll: {},
      scrollPanel: {},
      rail: {
        background: '#01a99a',
        opacity: 0,
        /** Rail's size(Height/Width) , default -> 6px */
        size: '6px',
        /** Specify rail and bar's border-radius, or the border-radius of rail and bar will be equal to the rail's size. default -> false **/
        specifyBorderRadius: false,
        /** Rail the distance from the two ends of the X axis and Y axis. **/
        gutterOfEnds: '2px',
        /** Rail the distance from the side of container. **/
        gutterOfSide: '2px',
        /** Whether to keep rail show or not, default -> false, event content height is not enough */
        keepShow: false
      },
      bar: {
        showDelay: 500,
        onlyShowBarOnScroll: true,
        keepShow: false,
        background: '#c5ced7',
        opacity: 1,
        hoverStyle: false,
        keepShow: false
      }
    }
  }),
  created() {
    // this.$get('/apis/login_Status').then(res => {
    //   console.log(res, 'islogin')
    // })
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
