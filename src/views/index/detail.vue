<template>
  <div class="article">
    <div>
      <div>标题：{{detail.title}}</div>
      <div>创建时间：{{detail.created_at}}</div>
      <div>点击量：{{detail.clicks}}</div>
      <div>点赞：{{detail.like}}</div>
      <mavon-editor v-model="detail.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" @change="changeData" />
      <div>分类：{{detail.classify}}</div>
      标签:<span v-for="tag in detail.tag">
        <span>{{tag}}、</span>
      </span>
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
      detail: [],
      pageModel: {
        id: 1
      }
    }
  },
  created() {
    this.getDetail()
  },
  watch:{
    $route(to,from){
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      this.loading = true
      this.$post('apis/article/read', this.$route.params).then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.detail = res.data.data
        } else {
          this.$message.error('文章请求失败')
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
