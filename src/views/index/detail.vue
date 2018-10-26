<template>

    <div class="detail" >
      
        <div>
          <div>标题：{{detail.title}}</div>
          <div>创建时间：{{detail.created_at}}</div>
          <div>点击量：{{detail.clicks}}</div>
          <div>分类：{{detail.classify}}</div>
          标签:<span v-for="tag in detail.tag">
            <span>{{tag}}、</span>
          </span>
          <mavon-editor v-model="detail.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" />
        </div>

        <!-- 点赞 -->
        <div :class="{hasclick:hasclick}" class="giveLike animate03" @click="giveLike">
          <img src="../../assets/yes.png" alt="">
          <span>赞({{detail.like}})</span>
        </div>

        <!-- 评论框 -->
        <div>
            <!-- 评论 [{{commentList.length}}] -->
            <el-input
              type="textarea"
              placeholder="留的痕迹"
              resize='none'
              :autosize='{minRows: 2}'
              v-model="comment.content">
            </el-input>
            <!-- <el-input v-model="comment.content" placeholder="评论"></el-input> -->
            <div class="submit-box">
              <el-input v-model="comment.username" placeholder="用户名" width="150"></el-input>
              <el-button type="primary" size="small" @click="submitComment">提交评论</el-button>
            </div>
        </div>

        <!-- 评论列表 -->
        <div>
          <div class="commentList" v-for="(item, index) in commentList">
            <div class="user-ava">
              <img src="../../assets/avatar/001.jpg" alt="">
            </div>
            <div class="comment-box animate03">
              <div class="username">
                {{item.user.username || '游客'}} 
                <span class="created"><i class="el-icon-time"></i>{{item.created_at}}</span>
              </div>
              <div class="com_detail">{{item.content}}</div>
            </div>
          </div>
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
      hasclick: false,
      detail: [],
      commentList: [],
      comment: {
        content: '',
        username: '',
        article_id: ''
      },
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
          this.comment.article_id = this.detail.id
          this.getComment()
        } else {
          this.$message.error('文章请求失败')
        }
        this.loading = false
      })
    },
    // 点赞
    giveLike() {
      let param = {
        id: this.detail.id
      }
      if (!this.hasclick) {
        this.$post('apis/article/like', param).then(res => {
          if (res.data.status == 1) {
            this.detail.like +=1
            this.hasclick = true
          }
        })
      }
    },
    // 获取评论
    getComment() {
      let param = {
        article_id: this.detail.id
      }
      this.$post('apis/comment/read', param).then(res => {
        console.log(res.data, 'comment')
        this.commentList = res.data.data
      })
    },
    // 提交评论
    submitComment() {
      this.$post('apis/comment/add', this.comment).then(res => {
        console.log(res.data)
        this.getComment()
      })
    }
  }
}
</script>

<style lang="stylus">
// markmown样式
.detail 
  .v-note-wrapper .v-note-panel
    border none !important
  .v-show-content
    background #fff !important
</style>
<style scoped lang="stylus">
li
  margin-bottom 20px

.detail
  max-width 800px
  margin auto

.giveLike
  display flex
  margin 15px auto
  background #f7576c
  width 100px
  height 100px
  border-radius 50%
  align-items: center;
  justify-content: center
  flex-direction: column
  cursor pointer
  color: #fff
  font-size: 14px
.giveLike.hasclick, .giveLike.hasclick:hover
  background #d4d4d4
  color #34495e
.giveLike:hover
  background #ff7b8d

.submit-box
  margin-top 15px
  display flex 
  justify-content space-between
  .el-input
    width 150px
.commentList
  display flex
  font-size 14px
  padding 12px 0
  .user-ava
    width 60px
    margin-right 15px
    img
      width 100%
      border-radius 50% 
      box-shadow: 3px 3px 11px #d6d6d6
  .comment-box
    background #fff
    line-height 22px
    flex 1
    min-height 100px
    border: 1px solid #ecf0f1
    border-radius: 3px
    box-shadow: 2px 2px 15px #d2e7fd
    .username
      line-height 30px
      font-weight bold
      color #f7576c
      background: #ECF0F1
      padding: 6px 15px
      .created
        margin-left 15px
        font-weight 100
        color #7F8C8D
        i
          margin-right 5px
    .com_detail
      padding 15px 25px
    
</style>
