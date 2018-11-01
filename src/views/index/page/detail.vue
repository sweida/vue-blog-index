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
          <!-- <img src="../../assets/yes.png" alt=""> -->
          <i class="iconfont lv-icon-yijin13-zan"></i>
          <span>{{detail.like}}</span>
        </div>

        <div class="posmition">
          由 <a href="http://github.com/sweida" target="_black">sweida</a> 创作，采用 
          <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_black">知识共享署名-非商业性使用 4.0 国际许可协议</a> 进行许可。
          <p>基于上的作品创作。</p>
        </div>



        <!-- 评论列表 -->
        <div>
          <div class="commentList" v-for="(item, index) in commentList">
            <div class="user-ava">
              <img src="../../../assets/avatar/001.jpg" alt="">
            </div>
            <div class="comment-box animate03">
              <div class="username">
                {{item.user.username || '游客'}} 
                <span class="created"><i class="el-icon-time"></i>{{item.created_at}}</span>
              </div>
              <div class="com_detail" v-html="item.content"></div>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <div class="input-box">
          <Input 
            v-model="comment.content" 
            type="textarea" 
            :autosize="{minRows: 3}" 
            placeholder="说点什么.." />
          <div class="submit-box">
            <Input v-model="comment.username" placeholder="游客可以选填昵称" style="width: 150px" v-if="!user"/>
            <Button type="primary" @click="submitComment" >提交评论</Button>
          </div>
        </div>

      </div>



</template>

<script>
import {mapState} from "vuex"

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
  computed: mapState({
    user:state=>state.user
  }),
  created() {
    console.log(this.$route.params, 444)
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
      this.$post('/apis/article/read', this.$route.params).then(res => {
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
        this.$post('/apis/article/like', param).then(res => {
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
      this.$post('/apis/comment/read', param).then(res => {
        console.log(res.data, 'comment')
        this.commentList = res.data.data

        this.commentList.forEach(item => {
          item.content = item.content.replace(/\n/g, '<br>')
        })
      })
    },
    // 提交评论
    submitComment() {
      this.$post('/apis/comment/add', this.comment).then(res => {
        console.log(res.data)
        this.comment.content = ''
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
  .v-note-wrapper
    z-index 9 !important


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
  width 90px
  height 90px
  border-radius 50%
  align-items: center;
  justify-content: center
  flex-direction: column
  cursor pointer
  color: #fff
  font-size: 14px
  i
    font-size 34px
.giveLike.hasclick, .giveLike.hasclick:hover
  background #eee
  color #a9aab1
.giveLike:hover
  background #ff7b8d

.posmition
  background #ecf0f1
  font-size 14px
  line-height 22px
  padding 15px 20px
  border-radius 4px
  margin 20px auto



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

.input-box
  margin 15px 0
  textarea.ivu-input
    border: 2px solid #dce4ec
    border-radius: 5px
  .submit-box
    margin-top 15px
    display flex 
    justify-content flex-end
    .el-input
      width 150px
      border: 2px solid #dce4ec !important

</style>
