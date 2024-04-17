<!--
 * @Author: 施伟达
 * @Date: 2019-09-06 00:08:20
 * @LastEditors: 施伟达
 * @LastEditTime: 2021-10-09 14:25:57
 * @Description: 
-->
<template>
  <footer>
    <div class="foot-text">
      <a href="https://github.com/sweida" target="_blank" class="link">
        <Icon type="logo-github" />
      </a>
      <p>本站已萌萌哒运行{{longTime}}</p>
      <p class="base">Crafted with <i class="iconfont lv-icon-aixin"></i> by
        <span>@sweida</span>&nbsp;&nbsp;base on
        <a class="green" href="https://github.com/sweida/laravel-blog-api" target="_blank">Laravel</a> +
        <a class="green" href="https://github.com/sweida/vue-blog-index" target="_blank">Vue</a>
      </p>
      <p>© 2018 - {{year}} &nbsp;&nbsp;天行九歌 &nbsp;&nbsp;
        <a href="https://beian.miit.gov.cn/" target="_blank" style="color: #fff">{{ webInfo.icp || ICP}}</a>
      </p>

    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      longTime: '',
      year: (new Date()).getFullYear(),
      ICP: '粤ICP备2024211741号'
    }
  },
  computed: {
    ...mapGetters(['webInfo']),
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
  created() {

  },
  methods: {

  }

}
</script>

<style scoped lang="stylus">
footer
  position relative
  background: #3d4852;
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
    span, .green
      color #ffed4a
      font-size 16px
      margin 0 2px
.lv-icon-aixin
  color red

</style>
