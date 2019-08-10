<template>
  <div >
    <div class="banner">
      <img :src="$staticUrl + banners[5].url" alt="">
      <div class="bg"></div>
      
      <div class="text-box">
        <p>本站的所有源码都是开源的</p>
        <p>如果你觉得该项目对你有助，欢迎赞赏支持（/∇＼），这样我就有更大的动力去完善它，优化它。~非常感激！</p>
      </div>
    </div>    

    <div class="img-box">
      <img :src="$staticUrl + webInfo.zhifubao">
      <img :src="$staticUrl + webInfo.weixin">
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
  data () {
    return {
      success: '',
    }
  },
  computed: {
    ...mapGetters([
      'webInfo',
      'banners'
    ])
  }, 
  created() {

  },
  methods: {

  }
}
</script>

<style scoped lang="stylus">
.img-box
  text-align center
  margin 30px 0
  img
    width 250px
    margin 20px 40px
    box-shadow: 8px 14px 38px #e7eeef;

@media screen and (max-width: 750px)
  .banner
    height 320px

</style>
