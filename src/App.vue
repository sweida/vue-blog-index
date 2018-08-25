<template>
  <div id="app">
    <Header></Header>
    <router-view class="main"/>
    <mu-button fab color="secondary" class="gotop" v-show="gotop" @click="goTop">
      <mu-icon value="airplanemode_active"></mu-icon>
    </mu-button>
    <footer>
      <div>本站只是为了技术交流，本站资源均来于互联网，与本人无关，若有侵权请告知</div>
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
  methods: {
    handleScroll () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 700) {
        this.gotop = true
      } else {
        this.gotop = false
      }
    },
    goTop() {
      setTimeout(() => {
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 300)
    }
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
</style>
