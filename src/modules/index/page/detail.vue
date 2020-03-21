<template>
    <div class=" detail higtlight">

      <div class="title-box" v-if="!text_loading">
        <h1>{{detail.title}}</h1>
        <div class="post-box">
          <div>
            <i class="iconfont lv-icon-kalendar"></i>
            {{detail.created_at}}
          </div>
          <div class="tag-box" v-if="detail.tags && detail.tags.length">
            <i class="iconfont lv-icon-biaoqian6"></i>
            <span v-for="(tagli, index) in detail.tags" :key="index">
              {{tagli}}
            </span>
          </div>
          <div><i class="iconfont lv-icon-huore"></i>{{detail.view_count}}热度</div>
        </div>
      </div>

      <TextLoading class="article" v-if="text_loading"></TextLoading>

      <section class="article" v-else>
        <div v-html="compiledMarkdown" v-highlight></div>

        <!-- 许可 -->
        <div class="posmition">
          <p>文章版权所有：<a href="https://github.com/sweida" target="_black">sweida</a>，采用 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh" target="_black">知识共享署名-非商业性使用 4.0 国际许可协议</a> 进行许可。</p>
          <p>欢迎分享，转载务必保留出处及原文链接 <a :href="href" target="_blank">{{href}}</a></p>
        </div>

        <!-- 点赞 -->
        <div :class="{hasclick:hasclick}" class="giveLike animate03" @click="giveLike">
          <i class="iconfont lv-icon-yijin13-zan"></i>
          <span>{{detail.like}}</span>
        </div>

        <!-- 上一篇和下一篇 -->
        <div class="nextBox">
          <p class="goArticle" @click="goArticle(prevArticle)">
            <Icon type="md-arrow-round-back" />
            <span>{{prevArticle ? prevArticle.title : '无'}}</span>
          </p>
          <p class="goArticle" @click="goArticle(nextrAticle)">
            <span>{{nextrAticle ? nextrAticle.title : '无'}}</span>
            <Icon type="md-arrow-round-forward" />
          </p>
        </div>
      </section>

      <section class="commentbox" v-if="user" >
        <div class="comment-title">
          <p>评论 <span>「 {{detail.comment}} 」</span></p>
        </div>

        <div class="input-box">
          <div class="userbox">
            <div class="user-img" v-if="user.id">
              <img :src="user.avatar_url ? user.avatar_url : `https://avatars.dicebear.com/v2/identicon/id-${user.id}.svg`" >
              <h4>{{user.name}}</h4>
            </div>
            <div class="user-img" v-else>
              <img :src="`https://avatars.dicebear.com/v2/identicon/id-.svg`" alt="">
              <h4>未登录</h4>
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
              <Button type="primary" @click="submitComment" >
                <Icon type="ios-create" />
                提交评论
              </Button>
            </div>
          </div>
        </div>
        <!-- 评论列表 -->
        <div class="none" v-if="!detail.comment">
          还没有评论，快来抢沙发。
        </div>
        <div v-else>
          <MyLoading v-if="loading"></MyLoading>
          <div v-else>
            <div class="commentList" v-for="(item, index) in commentList" :key="index">
              <div class="user-ava">
                <img :src="item.user.avatar_url ? item.user.avatar_url : `https://avatars.dicebear.com/v2/identicon/id-${item.user.id}.svg`" v-if="item.user">
                <img src="https://avatars.dicebear.com/v2/identicon/id-undefined.svg" v-else>
              </div>
              <div class="comment-box animate03">
                <div class="username">
                  <span>
                    <Icon type="md-person" />
                    {{item.user ? item.user.name : item.name ? `游客（${item.name}）` : '游客'}} 
                    <em>{{item.user_id==1 ? '(博主)' : ''}}</em>
                    <span class="created"><i class="el-icon-time"></i>{{item.created_at}}</span>
                  </span>
                </div>
                <div class="com_detail" v-html="item.content" v-highlight></div>
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
            <NewPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></NewPage>
          </div>
        </div>
      </section>

    </div>

</template>

<script>
import {mapGetters} from "vuex"
import marked from 'marked'
import 'style/message.styl'

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
      prevArticle: {},
      nextrAticle: {},
      comment: {
        content: '',
        name: '',
        article_id: ''
      },
      pageModel: {
        page: 1,
        sumCount: 10
      },
      page: 2,
      hasMore: true,
      href: ''
    }
  },
  computed: {
    ...mapGetters([
        'user'
    ]),
    compiledMarkdown: function () {
      return marked(this.detail.content, { sanitize: false })
    }
  },
  created() {
    this.href = window.location.href
    this.getDetail()
  },
  watch:{
    $route(to,from){
      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      this.$post('/apis/article', this.$route.params).then(res => {
        this.text_loading = false
        this.detail = res.data
        this.detail.created_at = this.detail.created_at.substring(0,10).replace(/-/g,"/")
        this.comment.article_id = this.detail.id
        this.prevArticle = res.data.prevArticle[0]
        this.nextrAticle = res.data.nextrAticle[0]

        // 有评论是才请求这个接口
        if (this.detail.comment){
          this.getComment()
        }
      }).catch(() => {})
    },
    // 跳转上下一篇文章
    goArticle(article) {
      if(article) {
        this.text_loading = true
        this.$router.push(`/blog/${article.id}`)
        this.hasclick = false
      }
    },
    // 点赞
    giveLike() {
      let param = {
        id: this.detail.id
      }
      if (!this.hasclick) {
        this.$post('/apis/article/like', param).then(res => {
          this.detail.like +=1
          this.hasclick = true
        }).catch(() => {})
      }
    },
    // 获取评论
    getComment() {
      let param = {
        article_id: this.detail.id,
        ...this.pageModel,
      }
      this.$post('/apis/comment/read', param).then(res => {
        this.commentList = res.data.data
        this.pageModel.sumCount = res.data.total

        this.commentList.forEach(item => {
          item.content = marked(item.content, { sanitize: false })
        })
        this.loading = false
      }).catch(() => {})
    },
    // 提交评论
    submitComment() {
      this.$post('/apis/comment/add', this.comment).then(res => {
        this.comment.content = ''
        this.detail.comment += 1
        this.$Message.success(res.message)
        this.getComment()
      }).catch(() => {})
    },
    // 评论分页
    selectRoleList() {
      this.getComment()
    },
    // 删除自己的留言
    deleteComment(item) {
      this.$post('/apis/comment/delete', {id: item.id}).then(res => {
        this.commentList.splice(this.commentList.indexOf(item), 1)
        this.$Message.success(res.message)
        this.detail.comment -= 1
      }).catch(() => {})
    }
  }
}
</script>


<style scoped lang="stylus">
.title-box
  margin 20px auto 40px
  h1
    font-size: 3em;
    padding: 0 0 50px;
    color: #22292f;
    line-height: 1.15;
    font-family: monospace;
  .post-box
    border-top: 1px solid #b8c2cc;
    background: #f8fafc;
    border-bottom: 1px solid #b8c2cc;
    padding: 7px 15px;
    display: flex;
    font-weight: 600;
    color: #606f7b;
    font-family: auto
    flex-wrap: wrap;
    line-height: 28px;
    >div
      margin-right 20px
.more
  margin-top 10px
  text-align center
  font-size: 14px;
.none
  font-size 14px
  text-align center
.detail
  max-width 840px
  margin auto
  padding: 50px 15px 70px
  font-size: 16px;
  color #444


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
  margin 30px auto


.article
  font-size 1.3em
  font-family Georgia,system-ui,BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif
  color #3d4852
  padding-bottom 20px

.commentbox
  max-width: 840px;
  margin: auto;   
.comment-title
  font-size 20px
  margin: 10px 0 15px
  border-left: 4px solid #f7576c;
  padding-left: 10px;
  line-height: 22px;
  span 
    font-size: 14px;
    margin-top: -6px;
    position: absolute;


.nextBox
  border-top: 1px solid #dfe8ea
  line-height: 26px
  padding-top: 10px
  margin-top: 45px
  display flex
  justify-content space-between
  .goArticle
    width 49%
    cursor pointer
    display flex
    align-items center
    font-size 18px
    span
      overflow hidden
      margin 0 5px
      text-overflow ellipsis
      white-space nowrap
  .goArticle:nth-child(2)
    justify-content: flex-end
  .goArticle:hover
    color: #ff7b8d
  .goArticle:hover span
    text-decoration: underline
    

@media screen and (min-width: 900px)
  .banner .bg
    background #989898

@media screen and (max-width: 750px)
  .title-box h1
    font-size: 2em;
  .article
    font-size 1.15em
  .commentbox
    border-top: 30px solid #f5f6f7

  .nextBox
    flex-wrap wrap
    .goArticle
      margin-bottom 10px
      width 100%
      cursor: pointer
</style>
