<template>
  <div class="article">
    <div>
      所有标签
      <li v-for="item in tags">
        <router-link :to="{name: 'article', query: { tag: item }}">{{item}}</router-link>
      </li>
    </div>
    <div>
      所有分类
      <li v-for="item in classifys">
        <router-link :to="{name: 'article', query: { classify: item }}">{{item}}</router-link>
      </li>
    </div>
    <li v-for="item in articles">
      <router-link :to="{path:`/article/${item.id}`}">{{item.title}}</router-link>
      <div>标题：{{item.title}}</div>
      <div>创建时间：{{item.created_at}}</div>
      <div>点击量：{{item.clicks}}</div>
      <div>点赞：{{item.like}}</div>
      <mavon-editor v-model="item.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" />
      <div>分类：{{item.classify}}</div>
      标签:<span v-for="tag in item.tag">
        <span>{{tag}}、</span>
      </span>
    </li>
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

    console.log(this.$route.query.tag, 44)
    if (this.$route.query.tag) {
      console.log(1)
      this.ArticlesOrderByTag()
    } else if (this.$route.query.classify) {
      console.log(2)
      this.ArticlesOrderByClassify()
    } else {
      console.log(3)
      this.getArticles()
    }
  },
  watch:{
    $route(to,from){
      if (this.$route.query.tag) {
        console.log(1)
        this.ArticlesOrderByTag()
      } else if (this.$route.query.classify) {
        console.log(2)
        this.ArticlesOrderByClassify()
      } else {
        console.log(3)
        this.getArticles()
      }
    }
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
    // 按标签获取
    ArticlesOrderByTag() {
      this.loading = true
      let param = {
        tag: this.$route.query.tag
      }
      this.$post('apis/tag/read', param).then(res => {
        if (res.data.status == 1) {
          this.articles = []
          res.data.data.forEach(item => {
            this.articles.push(item.article)
          })
          console.log(this.articles, param)
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
      })
    },
    // 按分类获取
    ArticlesOrderByClassify() {
      this.loading = true
      let param = {
        classify: this.$route.query.classify
      }
      this.$post('apis/article/read', param).then(res => {
        console.log(res.data, 'class')
        if (res.data.status == 1) {
          this.articles = res.data.data
        } else {
          this.$message.error(res.data.msg)
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
.article 
  width 1000px
  margin auto
li
  margin-bottom 20px

</style>
