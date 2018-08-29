<template>
  <div id="app">
    <Header></Header>
    <router-view class="main"/>
    <!-- <mu-button fab color="secondary" class="gotop" v-if="gotop" @click="goTop" transition="mu-scale-transition">
      <mu-icon value="airplanemode_active"></mu-icon>
    </mu-button> -->
    <footer>
      <div>本站只是为了技术交流，本站资源均来于互联网，如有侵犯权限请联系本站删除，本站不承担任何相关的法律责任</div>
      <p>备案号：这种网站还备案？</p>
    </footer>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
  components: {
    Header
  },
  data () {
    return {
      gotop: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {

  },
  methods: {
    // handleScroll () {
    //   let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    //   if (scrollTop > 700) {
    //     this.gotop = true
    //   } else {
    //     this.gotop = false
    //   }
    // },
    // goTop() {
    //   setTimeout(() => {
    //     document.documentElement.scrollTop = 0
    //     document.body.scrollTop = 0
    //   }, 300)
    // }
  }
}
</script>

<style>
#app {
}
.main{
  padding-top: 65px;
}
.gotop{
  position: fixed;
  bottom: 30px;
  right: 10px;
}
footer{
  padding: 0 20px;
  text-align: center;
}
.mu-scale-transition-enter-active,
.mu-scale-transition-leave-active {
  transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1), opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
  backface-visibility: hidden;
}
.mu-scale-transition-enter,
.mu-scale-transition-leave-active {
  transform: scale(0);
  opacity: 0;
}
</style>
