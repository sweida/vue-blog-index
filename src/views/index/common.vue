<template>
  <div class="common">
    <div class="box">
      <!-- <h3>所有分类</h3> -->
      <li class="classify animate03" :class="{active:this.$route.fullPath == '/blog'}">
        <router-link to="/blog">全部博文</router-link>
      </li>
      <li class="classify animate03" v-for="(item, index) in classifys" :key="index" :class="{active:$route.query.classify==item}">
        <router-link :to="{name: 'blog', query: { classify: item }}">{{item}}</router-link>
      </li>

    </div>

    <div class="box">
      <h3>所有标签<i class="iconfont lv-icon-biaoqian6"></i></h3>
      <div class="tagBox">
        <span class="tagli animate03" v-for="(item, index) in tags" :key="index">
          <router-link :to="{name: 'blog', query: { tag: item }}">{{item}}</router-link>
        </span>
      </div>
    </div>

    <div class="box">
      <h3>归档<i class="iconfont lv-icon-kalendar"></i></h3>
      <li class="timeli" v-for="(item, index) in timeLines" :key="index" @click="TiemLine(item.date)" >
        <span>{{item.date}}（{{item.value}}）</span>
      </li>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      timeLine: [],
      tags: [],
      classifys: []
    }
  },
  created() {
    this.getTimes()
    this.getTags()
    this.getClassify() 
    console.log(this.$route.query, 444)
  },
  computed: {
    // 倒序时间线
    timeLines() {
      return this.timeLine.reverse();
    }
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('/apis/article/read', this.pageModel).then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.articles = res.data.data
          this.pageModel.sumCount = res.data.total
        } else {
          this.$message.error('获取数据失败！')
        }
        this.loading = false
      })
    },
    // 获取时间线
    getTimes() {
      this.$get('/apis/article/times').then(res => {
        console.log(res.data, 'times')
        this.timeLine = res.data.data
      })
    },
    // 获取所有标签
    getTags() {
      this.$get('/apis/tag/read').then(res => {
        console.log(res.data, 'tags')
        this.tags = res.data.data
      })
    },
    goTag(item) {
      this.$router.query({tag: item})
    },
    // 获取所有分类
    getClassify() {
      this.$get('/apis/article/classify').then(res => {
        console.log(res.data, 'classifys')
        this.classifys = res.data.data
      })
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
    }
  }
}
</script>

<style lang="stylus">
// markmown样式
.article 
  .v-note-wrapper .v-note-panel
    border none !important
  .v-show-content
    background #fff !important
</style>
<style scoped lang="stylus">
.common
  margin-left 20px
  width 240px
  .box
    padding 15px 0
    margin-bottom 20px
    box-shadow: 2px 2px 14px #c0dbe6
    h3
      border-bottom 1px solid #ddd
      padding 5px 0
      margin 0 20px
      font-size 16px
      font-weight 100 
      display flex
      justify-content space-between
    .tagBox
      padding 5px 15px
    .tagli
      font-size 12px
      display: inline-block;
      padding 3px 8px
      border-radius 3px
      background #e8e8e8
      margin 4px 5px
      a
        color #34495e
    .tagli:hover
      background #ddd
    .timeli
      cursor pointer
      font-weight 100
      font-size 14px
      padding 8px 20px
    .timeli:hover
      color #34495e
    
// 分类    
.classify
  font-size 14px
  padding: 9px 30px
  font-weight: 100
  a
    color #80817f
    display block
.classify:hover, .classify.active
  background #ecf0f1
  border-right 4px solid #999
  a
    color #525251




</style>
