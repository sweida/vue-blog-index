<template>
  <div class="common">
    <div class="box">
      <h3>所有分类</h3>
      <li v-for="item in classifys">
        <router-link :to="{name: 'blog', query: { classify: item }}">{{item}}</router-link>
      </li>
    </div>

    <div class="box">
      <h3>归档</h3>
      <li class="timeli" v-for="item in timeLines" @click="TiemLine(item.date)">
        <span>{{item.date}}（{{item.value}}）</span>
      </li>
    </div>

    <div class="box">
      <h3>所有标签</h3>
      <span class="tagli" v-for="item in tags">
        <router-link :to="{name: 'blog', query: { tag: item }}">{{item}}</router-link>
      </span>
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
  width 220px
  .box
    height 200px
    padding 1px 20px
    margin-bottom 20px
    box-shadow: 2px 2px 14px #c0dbe6
    .tagli
      font-size 14px
      display: inline-block;
      padding 4px 8px
      border-radius 3px
      background #e8e8e8
      margin 5px 10px 0 0  
    .timeli
      cursor pointer

</style>
