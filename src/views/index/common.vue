<template>
  <div class="common">
    <div>
      所有标签
      <li v-for="item in tags">
        <router-link :to="{name: 'article', query: { tag: item }}">{{item}}</router-link>
      </li>
    </div>
    <!-- <div>
      所有分类
      <li v-for="item in classifys">
        <router-link :to="{name: 'article', query: { classify: item }}">{{item}}</router-link>
      </li>
    </div> -->
    <div>
      时间线
      <li v-for="item in timeLine">
        <span>{{item.date}}（{{item.value}}）</span>
      </li>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      loading: true,
      checked: true,
      articles: [],
      timeLine: [],
      tags: [],
      classifys: [],
      pageModel: {
        page: 1,
        sumCount: 10
      }
    }
  },
  created() {
    this.getTimes()
    this.getTags()
    this.getClassify() 
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('apis/article/read', this.pageModel).then(res => {
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
      this.$get('apis/article/times').then(res => {
        console.log(res.data, 'times')
        this.timeLine = res.data.data
      })
    },
    // 获取所有标签
    getTags() {
      this.$get('apis/tag/read').then(res => {
        console.log(res.data, 'tags')
        this.tags = res.data.data
      })
    },
    goTag(item) {
      this.$router.query({tag: item})
    },
    // 获取所有分类
    getClassify() {
      this.$get('apis/article/classify').then(res => {
        console.log(res.data, 'classifys')
        this.classifys = res.data.data
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
li
  margin-bottom 20px

</style>
