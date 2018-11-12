<template>
  <div class="text_loading">
    <div class="hr"></div>
    <div class="box">
      <i class="iconfont lv-icon-huore"></i> <p></p>
      <i class="iconfont lv-icon-biaoqian6"></i> <p></p>
    </div>
    <div class="hr hr2"></div>
    <div class="hr hr1"></div>
    <div class="hr hr3"></div>
    <div class="text"></div>
  </div>
</template>

<script>
export default {
  methods: {

  }
}
</script>

<style scoped lang="stylus">
.text_loading
  flex 1
  .text
    max-width 500px
    height 150px
    background #ecf0f1
    margin-bottom 30px
  .box
    display flex
    p
      width 50px
      height 20px
      margin 0px 15px 10px 0
      background #ecf0f1
    i
      color #ecf0f1
      margin-right 15px
  .hr
    height 20px
    width 120px
    margin-bottom 10px
    background #ecf0f1
    animation: bouncedelay 1.6s infinite ease-in-out;
  .hr2
    width 80px
    animation: bouncedelay 2s infinite ease-in-out;
  .hr1
    width 100px
    animation: bouncedelay 1.8s infinite ease-in-out;
  .hr3
    width 90px
    animation: bouncedelay 2.2s infinite ease-in-out;
@keyframes bouncedelay {
  0%, 80%, 100% {
  } 40% {
    width 350px
  }
}
</style>