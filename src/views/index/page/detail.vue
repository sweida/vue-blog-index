<template>

    <div class="main detail higtlight">
        <TextLoading v-if="text_loading"></TextLoading>

        <div v-else>
          <div>
            <h2>{{detail.title}}</h2>
            <div class="post-meta"> 
              <div><i class="iconfont lv-icon-kalendar"></i>{{detail.created_at.substring(0,10)}}</div>
              <span>•</span>
              <div><i class="iconfont lv-icon-huore"></i>{{detail.clicks}}热度</div>
              <span>•</span>
              <div><i class="iconfont lv-icon-wenjianjia"></i>{{detail.classify}}</div>
            </div>

            <!-- <div class="post-tag">
              <i class="iconfont lv-icon-fenlei-copy"></i>
              <span v-for="(tag,index) in detail.tag" :key="index">
                {{tag}}
              </span>
            </div> -->
            <div v-html="compiledMarkdown" v-highlight></div>
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
          <p>评论 <span>「 {{detail.comment}} 」</span></p>
        </div>

        <!-- 评论 -->
        <div class="input-box">
          <div class="userbox">
            <div class="user-img" v-if="user.id">
              <img :src="require(`@/assets/avatar/00${user.id%10}.jpg`)" >
              <h4>{{user.username}}</h4>
            </div>
            <div class="user-img" v-else>
              <img src="../../../assets/avatar/009.jpg" >
              <h4>游客</h4>
            </div>
          </div>
          <div class="textbox">
            <Input 
                v-model="comment.content" 
                type="textarea" 
                :autosize="{minRows: 4, maxRows: 8}" 
                :maxlength="400"
                placeholder="说点什么。。支持markdown语法，尾部2个空格后回车才会换行，最长400个字" />
            <div class="submit-box">
              <div class="ykname">
                <Input v-model="comment.username" placeholder="游客可以选填昵称" style="width: 150px" v-if="!user"/>
              </div>
              <Button type="primary" @click="submitComment" >提交评论</Button>
            </div>
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
                <span>
                  <Icon type="md-person" />
                  {{item.user ? item.user.username : item.username ? `游客（${item.username}）` : '游客'}} 
                  <em>{{item.user_id==1 ? '(博主)' : ''}}</em>
                  <span class="created"><i class="el-icon-time"></i>{{item.created_at}}</span>
                </span>
              </div>
              <div class="com_detail" v-html="item.content" v-highlight></div>
              <!-- 显示自己的留言的删除按钮 -->
              <div class="delete" v-if="item.user_id==user.id" >
                <Poptip
                  confirm
                  placement="left"
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
import marked from 'marked'
import '@/style/message.styl'

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
  computed: {
    ...mapState([
        'user'
    ]),
    compiledMarkdown: function () {
      return marked(this.detail.content, { sanitize: true })
    }
  },
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
              item.content = marked(item.content, { sanitize: true })
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


<style scoped lang="stylus">
.more
  margin-top 10px
  text-align center
  font-size: 14px;
.none
  font-size 14px
  text-align center
.detail
  max-width 840px
  font-size: 16px;
  color #444


h2
  font-size 28px
  text-align center
  font-weight 400
.post-meta
  display flex
  justify-content center
  font-size 14px
  line-height 40px
  margin-bottom 20px
  color: #8c8ea0
  border-bottom: 1px solid #eee  
  // border-bottom 1px solid #eee
  span
    margin 0 10px
  i
    margin-right 6px
.post-tag
  line-height 40px
  span
    margin 0 10px

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
  font-size 20px
  margin: 60px 0 15px
  border-left: 4px solid #f7576c;
  padding-left: 10px;
  line-height: 22px;
  span 
    font-size: 14px;
    margin-top: -6px;
    position: absolute;






@media screen and (max-width: 750px)
  h2
    text-align left
  .post-meta
    justify-content flex-start
</style>
