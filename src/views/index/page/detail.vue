<template>

    <div class="detail" >
        <TextLoading v-if="text_loading"></TextLoading>

        <div v-else>
          <div>
            <div>标题：{{detail.title}}</div>
            <div>创建时间：{{detail.created_at}}</div>
            <div>点击量：{{detail.clicks}}</div>
            <div>分类：{{detail.classify}}</div>
            标签:<span v-for="(tag,index) in detail.tag" :key="index">
              <span>{{tag}}、</span>
            </span>
            <mavon-editor v-model="detail.content" :subfield="false" codeStyle="googlecode" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" />
          </div>

          <!-- 许可 -->
          <div class="posmition">
            由 <a href="http://github.com/sweida" target="_black">sweida</a> 创作，采用 
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_black">知识共享署名-非商业性使用 4.0 国际许可协议</a> 进行许可。
            <p>基于上的作品创作。</p>
          </div>

          <!-- 点赞 -->
          <div :class="{hasclick:hasclick}" class="giveLike animate03" @click="giveLike">
            <i class="iconfont lv-icon-yijin13-zan"></i>
            <span>{{detail.like}}</span>
          </div>
        </div>


        <div class="comment-title">
          <h3>评论 <span>「 {{detail.comment}} 」</span></h3>
        </div>

        <!-- 评论 -->
        <div class="input-box">
          <Input 
            v-model="comment.content" 
            type="textarea" 
            :autosize="{minRows: 3}" 
            placeholder="说点什么.." />
          <div class="submit-box">
            <div class="ykname">
              <Input v-model="comment.username" placeholder="游客可以选填昵称" style="width: 150px" v-if="!user"/>
            </div>
            <Button type="primary" @click="submitComment" >提交评论</Button>
          </div>
        </div>


        <!-- 评论列表 -->
        <div class="none" v-if="!detail.comment">
          还没有评论，快来抢沙发。
        </div>
        <div v-else>
          <MyLoading v-if="loading"></MyLoading>
          <div class="commentList" v-for="(item, index) in commentList" :key="index" v-else>
            <div class="user-ava">
              <img src="../../../assets/avatar/001.jpg" alt="">
            </div>
            <div class="comment-box animate03">
              <div class="username">
                <Icon type="md-person" />
                {{item.user ? item.user.username : item.username ? `游客（${item.username}）` : '游客'}} 
                <em>{{item.user_id==1 ? '(博主)' : ''}}</em>
                <span class="created"><i class="el-icon-time"></i>{{item.created_at}}</span>
              </div>
              <div class="com_detail" v-html="item.content"></div>
              <!-- 显示自己的留言的删除按钮 -->
              <div class="delete" v-if="item.user_id==user.id" >
                <Poptip
                  confirm
                  title="是否删除该评论?"
                  @on-ok="deleteComment(item)">
                  <Icon type="md-trash" v-if="(item.user_id==user.id) && item.user_id"/>
                </Poptip>
              </div>
            </div>
          </div>
          <div class="more">
            <Button @click="getMore" v-if="hasMore">加载更多</Button>
            <p v-else>没有更多了..</p>
          </div>
        </div>




      </div>



</template>

<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      text_loading: true,
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
      },
      page: 2,
      hasMore: true
    }
  },
  computed: mapState({
    user:state=>state.user
  }),
  created() {
    console.log(this.$route, 444)
    this.getDetail()
  },
  watch:{
    $route(to,from){
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      this.$post('/apis/article/read', this.$route.params).then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.detail = res.data.data
          this.text_loading = false
          this.comment.article_id = this.detail.id
          // 有评论是才请求这个接口
          if (this.detail.comment){
            this.getComment()
          }
        } else {
          this.$message.error('文章请求失败')
        }
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
        if (res.data.status == 1) {
          this.commentList = res.data.data
          if (res.data.data.length < 10) {
            this.hasMore = false
          }
          if (this.commentList) {
            this.commentList.forEach(item => {
              item.content = item.content.replace(/\n/g, '<br>')
            })
          }
          this.loading = false
        }
      })
    },
    // 提交评论
    submitComment() {
      this.$post('/apis/comment/add', this.comment).then(res => {
        console.log(res.data)
        this.comment.content = ''
        this.getComment()
      })
    },
    // 加载评论
    getMore() {
      let param = {
        article_id: this.detail.id,
        page: this.page
      }
      this.$post('/apis/comment/read', param).then(res => {
        console.log(res.data, 'commentList')
        this.page +=1
        if (res.data.data.length < 10) {
          this.hasMore = false
        }
        // 转换换行
        res.data.data.forEach(item => {
          item.content = item.content.replace(/\n/g, '<br>')
        })
        this.commentList.push(...res.data.data)
      })
    },
    // 删除自己的留言
    deleteComment(item) {
      this.$post('/apis/comment/remove', {id: item.id}).then(res => {
        if (res.data.status == 1) {
          this.commentList.splice(this.commentList.indexOf(item), 1)
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
        }
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
    padding 0 !important
  .v-note-wrapper
    z-index 9 !important

</style>

<style scoped lang="stylus">

.more
  margin-top 10px
  text-align center
.none
  font-size 14px
  text-align center
.detail
  font-size: 14px;
  // max-width 800px
  // margin auto
  // background #fff
  // padding 20px
  // box-sizing border-box
  // box-shadow: 2px 2px 15px #d9ddde

.giveLike
  display flex
  margin 25px auto
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


.comment-title
  font-size 16px
  margin: 30px 0 15px
  border-left: 4px solid #f7576c;
  padding-left: 10px;
  line-height: 22px;
  span 
    font-size: 14px;
    margin-top: -6px;
    position: absolute;

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
    position relative
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
      em
        color #009688
    .com_detail
      padding 15px 25px
    .delete
      position: absolute;
      right: 10px;
      bottom: 7px;
      font-size: 20px;
      color: #657f86;
      cursor: pointer;


.input-box
  margin 15px 0
  textarea.ivu-input
    border: 2px solid #dce4ec
    border-radius: 5px
  .submit-box
    margin-top 15px
    display flex 
    justify-content flex-end
    .ykname
      flex 1

@media screen and (max-width: 750px)
  .commentList .user-ava
    display none
</style>
