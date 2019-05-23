<template>
  <div class="common">
    <!-- <div class="box">
      <li class="classify animate03" :class="{active:classify=='all'}" @click="allArticles">
        全部博文
      </li>
      <li class="classify animate03" :class="{active:classify==item}" v-for="(item, index) in classifys" :key="index" @click="OrderByClassify(item)" >
        {{item}}
      </li>

    </div> -->

    <div class="box">
      <h3>Skills<i class="iconfont lv-icon-biaoqian"></i></h3>
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
        <!-- <span class="tagli animate03" v-for="(item, index) in tags" :key="index" @click="OrderByTag(item)">
          {{item}}
        </span> -->
      </div>
    </div>

    <!-- <div class="box">
      <h3>归档<i class="iconfont lv-icon-kalendar"></i></h3>
      <li class="timeli animate03" v-for="(item, index) in timeLines" :key="index" @click="TiemLine(item.date)" :class="{active:timeline==item.date}">
        <span>{{item.date}}<em>（{{item.value}}）</em></span>
      </li>
    </div> -->

  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      timeLine: [],
      tags: [],
      classifys: []
    }
  },
  props: {pageModel: {}},
  created() {
    // this.getTimes()
    // this.getTags()
    this.getClassify() 
  },
  computed: {
    ...mapState([
        'classify', 'tag', 'timeline'
    ]),
    // 倒序时间线
    timeLines() {
      return this.timeLine.reverse();
    }
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
    // 点击时间线
    TiemLine(item) {
      let year = item.substring(0, 4)
      let month = item.substring(5, 7)
      this.$router.push({
        name: 'blog',
        query: {
          year: year,
          month: month
        }
      })
      this.pageModel.page = 1
      this.$emit('ArticlesOrderByTime');
    },

    // 获取时间线
    getTimes() {
      this.$get('/apis/article/times').then(res => {
        // console.log(res.data, 'times')
        this.timeLine = res.data.data
      })
    },
    // 获取所有标签
    getTags() {
      this.$get('/apis/tag/read').then(res => {
        // console.log(res.data, 'tags')
        this.tags = res.data.data
      })
    },
    goTag(item) {
      this.$router.query({tag: item})
    },
    // 获取所有分类
    getClassify() {
      this.$get('/apis/article/classify').then(res => {
        // console.log(res.data, 'classifys')
        console.log(res.data, 555555)
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
      border-bottom 1px solid #dae1e7
      padding 5px 0
      margin 0 0 25px
      font-size 16px
      font-weight 100 
      display flex
      justify-content space-between
      font-family: Arkibal Serif,Constantia,Lucida Bright,Lucidabright,Lucida Serif,Lucida,DejaVu Serif,Bitstream Vera Serif,Liberation Serif,Georgia,serif;
      font-size: 2.25em;
      font-weight: bold;
      color: #22292f;
    h3:before
      content ''
      position: absolute;
      width: 78px;
      height: 2px;
      background: #b8297e;
      bottom: -2px;
      left: 0px;
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




@media screen and (max-width: 750px)
  .common .box .tagli
      font-size: 14px
</style>
