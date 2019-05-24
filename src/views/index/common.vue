<template>
  <div class="common">
    <div class="box">
      <h3>Skills<i class="iconfont lv-icon-biaoqian"></i></h3>
      <div class="backg"></div>
      <div class="tagBox
      .type
        background #f1f5f8
        border none">
        <span class="tagli animate03 classify" @click="allArticles">
          全部
        </span>
        <div v-for="(item, index) in classifys" :key="index" >
          <span class="tagli animate03 classify" @click="OrderByClassify(item.name)">
            {{item.name}}
          </span>
          <span class="tagli animate03 topaz" v-for="(child, index) in item.tags" :key="index" @click="OrderByTag(child)">
            {{child}}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      classifys: []
    }
  },
  props: {pageModel: {}},
  created() {
    this.getClassify() 
  },
  computed: {
    ...mapState([
        'classify', 'tag'
    ]),

  },
  methods: {
    // 切换分类标签时，页码变为1
    allArticles() {
      this.$router.push('/blog')
      this.pageModel.page = 1
      this.$emit('getArticles');
    },
    OrderByClassify(item) {
      this.$router.push({path:'/blog', query:{classify: item}})
      this.pageModel.page = 1
      this.$emit('ArticlesOrderByClassify');
    },
    OrderByTag(item) {
      this.$router.push({path:'/blog', query:{tag: item}})
      this.pageModel.page = 1
      this.$emit('ArticlesOrderByTag');
    }, 
    // 获取所有分类
    getClassify() {
      this.$get('/apis/article/classify').then(res => {
        this.classifys = res.data.data
      })
    }
  }
}
</script>


<style scoped lang="stylus">
.common
  // margin-left 20px
  // width 255px
  font-family: sans-serif;
  .box
    padding 15px 0
    margin-bottom 20px
    // box-shadow: 2px 2px 14px #c0dbe6
    background #fff
    border-radius 5px
    h3
      position relative
      font-size 16px
      font-weight 100 
      display flex
      justify-content space-between
      font-family: Arkibal Serif,Constantia,Lucida Bright,Lucidabright,Lucida Serif,Lucida,DejaVu Serif,Bitstream Vera Serif,Liberation Serif,Georgia,serif;
      font-size: 2.25em;
      font-weight: bold;
      color: #22292f;
    .tagBox
      .classify
        background #f1f5f8
        border none
    .tagli
      color: #606f7b;
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
      padding: 4px 16px;
      border-radius: 31px;
      margin: 0 10px 12px 0px;
      font-family: sans-serif;
      font-weight: 600;
      font-size: 16px;
    .tagli:hover
      background #d2d9de
      color: #606f7b;
    .timeli
      cursor pointer
      font-weight 100
      font-size 14px
      padding 8px 20px
      em
        color #ab267f
    .timeli:hover, .timeli.active
      background #ecf0f1
      border-right 4px solid #7a8996
    .topaz
      background-image: linear-gradient(30deg,#ee7752,#e73c7e);
      color #fff

.backg
  animation: movingGradient 15s linear infinite;
  background-size: 600% 100%;
  background-image: linear-gradient(120deg, #EE7752, #E73C7E, #23A6D5, #23D5AB, #EE7752, #E73C7E);
  width: 100%;
  transition: width .3s linear;
  height 8px
  margin-bottom 25px

@keyframes movingGradient{
  0%{background-position:0 50%}
  to{background-position:100% 50%}
}

@media screen and (max-width: 750px)
  .common .box .tagli
      font-size: 14px
</style>
