<template>
  <div>
    
    <div class="text">
      <p>本站的所有源码已经开源</p>
      <p>如果你觉得该项目对你有助，不妨打赏我一下，这样我就有更大的动力去完善它，优化它。~非常感激！</p>
    </div>

    <div class="img-box">
      <img src="../../../assets/zfb.jpg" alt="">
      <img src="../../../assets/wx.jpg" alt="">
    </div>

  </div>


</template>


<script>
export default {
  data () {
    return {
      success: '',
    }
  },
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
  // display: flex
  // align-items: center
  // justify-content: center
  // flex-wrap: wrap;
  text-align center
  img
    width 250px
    margin 20px
</style>
