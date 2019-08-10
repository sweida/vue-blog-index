<template>
  <div class="home" >
    <div class="about-bg">
      <img :src="$staticUrl + banners[0].url">
      <div class="bg bg2"></div>
      <div class="title">
        <h2>写在前面</h2>
        <em>人生是一场永不停息的奔跑</em>
        <em>每一天，期待遇上更好的自己</em>
        <!-- <em>在每一个苦思冥想的瞬间求知</em> -->

      </div>
    </div>
    <div class="about">
      <p>从 2017 年开始写博客记录自己技术成长的一点一滴，用过了多种博客，从最开始的博客园，到Hexo，再到WordPress。</p>
      <p>但是每个都有各自的缺点和局限性，逼格档次也不够，本着不折腾会死的心，决定自己写一个，功能必须齐全的，于是瞎折腾了2个月(倾心制作)，本站终于诞生了。</p>
      <h3>本站尝试使用如下技术构建</h3>

      <div class="make">
        <div>
          <img src="../../../assets/laravel.png" alt="">
          <p class="laravel">Laravel
          </p>
          <a href="https://github.com/sweida/laravel-blog-api" target="_blank" class="laravel">
            <Icon type="logo-github" />
          </a>

        </div>
        <i class="iconfont lv-icon-aixin"></i>
        <div>
          <img src="../../../assets/vue.jpg" alt="">
          <p class="vue">Vue</p> 
          <a href="https://github.com/sweida/vue-blog-index" target="_blank" class="vue">
            <Icon type="logo-github" />
          </a>
        </div>
      </div>


      <p>如果该项目对你有帮助，希望可以给个<em class="star">star</em></p>
    </div>


    <div class="about-bg">
      <img :src="$staticUrl + banners[1].url" >
      <div class="bg"></div>
      <div class="title">
        <h2>关于我</h2>
        <em>——集技术和颜值于一身的程序猿</em>
        <em>坐标 GuangZhou「广州」</em>
      </div>
    </div>
    <div class="about">
      <p>施伟达，90后、毕业于广东一所野鸡大学的电子信息专业，沉迷于编程不能自拔。</p>
      <p>与时俱进的电脑迷、技术控、真会修电脑的程序猿。</p>
      <p>15年开始接触前端，一路单刷副本，16年底开始学习后端语言，打怪升级，目标成功合格的全栈攻城狮。</p>
      <div class="skills">
        <p>目前已习得技能</p>
        <!-- <img v-for="(item, index) in skills" :key="index" :src="$baseUrl+item.url"> -->
        <img v-for="(item, index) in skills" :key="index" :src="$staticUrl + item.url">
      </div>            
    </div>


  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  data () {
    return {
      skills: []
    }
  },
  computed: {
    ...mapGetters([
      'banners'
    ])
  }, 
  created() {
    this.getSkills()
  },
  methods: {
    async getSkills() {
      const res = await this.$post('/apis/ad', {type: '技能'})
      this.skills = res.data
    },
  }
}
</script>

<style lang="stylus" scoped>
// .home
//   margin 20px auto
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
  padding 40px 0
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
  a i
    font-size 28px
  .lv-icon-aixin
    margin -30px 40px 0
    color red
    font-size 26px
  .laravel
    font-family: none;
    color: #fa5039;
  .vue
    font-family: none;
    color: #3cb884

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
  .bg2
    background #a3b0bf
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
  h3
    font-size 20px
    font-weight 400
    padding-top 30px
    color #f7576c
.skills
  max-width 800px
  text-align center
  margin auto
  p
    font-size 20px
    color #f7576c
  img
    max-width 88px
    margin 3px



@media screen and (max-width: 750px)
  .about-bg
    height 300px
  .about 
    padding 40px 20px
    font-size 16px
    em
      font-family: cursive;
      font-size 24px

  .make .laravel, .make .vue
    font-family: cursive;

  .about-bg .title 
    h2
      font-size: 26px;
      padding-bottom: 20px;
      margin-bottom: 20px;
    em
      font-family: cursive;    
  .skills img
    max-width 66px

@media screen and (min-width: 1368px)
  .about-bg:first-child
    height 700px
@media screen and (min-width: 1660px)
  .about-bg:first-child
    height 830px      
</style>
