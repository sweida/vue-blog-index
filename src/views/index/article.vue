<template>
  <div class="article">
    <li v-for="item in articles">
      <div>标题：{{item.title}}</div>
      <div>创建时间：{{item.created_at}}</div>
      <div>点击量：{{item.clicks}}</div>
      <div>点赞：{{item.like}}</div>
      <mavon-editor v-model="item.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" @change="changeData" />
      <div>分类：{{item.classify}}</div>
      标签:<span v-for="tag in item.tag">
        <span>{{tag}}、</span>
      </span>
    </li>
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
      pageModel: {
        page: 1,
        sumCount: 10
      }
    }
  },
  created() {
    this.getArticles()
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
    changeData(value, render) {
        console.log(render);
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
.article 
  width 1000px
  margin auto
li
  margin-bottom 20px

</style>
