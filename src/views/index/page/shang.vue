<template>
  <div class="main">
    
    <div class="text">
      <p>本站的所有源码都是开源的</p>
      <p>如果你觉得该项目对你有助，欢迎赞赏支持（/∇＼），这样我就有更大的动力去完善它，优化它。~非常感激！</p>
    </div>

    <div class="img-box">
      <img :src="webinfo.zhifubao" alt="">
      <img :src="webinfo.weixin" alt="">
    </div>

  </div>


</template>

<script>
import {mapState} from "vuex"

export default {
  data () {
    return {
      success: '',
    }
  },
  computed: mapState({
    webinfo:state=>state.webinfo,
  }), 
  created() {

  },
  methods: {

  }
}
</script>



<style scoped lang="stylus">

.text
  font-size 18px
  text-align center
.img-box
  text-align center
  img
    width 250px
    margin 20px
</style>
