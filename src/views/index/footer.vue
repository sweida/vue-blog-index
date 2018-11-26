<template>
  <footer>
    <img src="../../assets/big-map.jpg" class="footer-bg">
    <div class="foot-text">
      <a href="https://github.com/sweida" target="_blank" class="link">
        <Icon type="logo-github" />
      </a>
      <p>本站已萌萌哒运行{{longTime}}</p>
      <p class="base">Crafted with <i class="iconfont lv-icon-aixin"></i> by <span>@sweida</span>&nbsp;&nbsp;base on <span>Laravel</span> + <span>Vue</span></p>
      <p>© {{year}} - 天行九歌 &nbsp;&nbsp;备案：不存在的</p>
      
    </div>
  </footer>
</template>

<script>


export default {
  data () {
    return {
      longTime: '',
      year: (new Date()).getFullYear()
    }
  },
  beforeMount() {
    setInterval(getRemainderTime, 1000)

    let that = this;
    function getRemainderTime (){
      let startTime = "2018-10-10"
      let s1 = new Date(startTime.replace(/-/g, "/")),
      s2 = new Date(),
      runTime = parseInt((s2.getTime() - s1.getTime()) / 1000);
      let day = Math.floor(runTime / 86400);
      runTime = runTime % 86400;
      let hour = Math.floor(runTime / 3600);
      runTime = runTime % 3600;
      let minute = Math.floor(runTime / 60);
      runTime = runTime % 60;
      let second = runTime;

      that.longTime = day+'天'+hour+'小时'+minute+'分'+second+'秒';
    }
    getRemainderTime();      
  },
  methods: {

  }

}
</script>

<style scoped lang="stylus">
footer
  position relative
  overflow hidden
  background-image: linear-gradient(167deg,#2b274b,#771787 49%,rgba(201,28,136,.91));
.footer-bg
  position: absolute;
  opacity: .25;
  bottom: 0;
  margin: auto;
  right: 0;
  left: 0;
  top: 0;
  width: 100%;
  mix-blend-mode: multiply;
.link
  color #fff
  i
    margin-bottom 15px
    font-size 28px
  i:hover
    color #929292

.foot-text
  line-height 30px
  z-index 20
  position relative
  font-size 14px
  text-align: center;
  // background: #93a6ab;
  width: 100%;
  padding: 15px 0 20px;
  color: #fff;
  .base
    span
      color #ffed4a
      font-size 16px
      margin 0 2px
.lv-icon-aixin
  color red

</style>
