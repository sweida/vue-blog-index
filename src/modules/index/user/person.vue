<template>
  <div class="main person higtlight">
    <TextLoading v-if="loading"></TextLoading>

    <template v-else>
      <div class="leftinfo">
        <div class="info-top">
          <img :src="`${avatarUrl}?seed=${user.id || 'false'}`" alt="avatar" />
          <div class="top-text">
            <p class="name">{{user.name}}</p>
            <p>第<span class="pink">{{user.id}}</span>位注册的用户</p>
            <p>注册于<span class="time">{{user.created_at.substring(0,10)}}</span></p>
          </div>
        </div>

        <ul>
          <li>邮箱： {{user.email}}</li>
          <li>权限： {{user.admin ? '博主' : '普通用户'}}</li>
          <li>修改头像</li>
          <router-link tag="li" to="password" class="link">
            修改密码
          </router-link>
          <!-- <li>
            我的评论<span class="pink"> ({{comments.length}})</span>
          </li>
          <li>
            我的留言<span class="pink"> ({{messages.length}})</span>
          </li> -->
        </ul>
      </div>

      <div class="rightmain">
        <div class="comment">
          <h6>我的评论<span class="pink" v-if="comments"> ({{commentsTotal}})</span></h6>
          <ul>
            <li v-for="(item, index) in comments" :key="index">
              <router-link :to="{path:`/blog/${item.article.id}`}">评论文章：{{item.article.title}}</router-link>
              <div class="mark" v-html="item.content" v-highlight></div>
              <p class="time">
                <Icon type="md-time" />{{item.created_at}}
              </p>
              <div class="delete">
                <Poptip confirm placement="left" title="是否删除该评论?" @on-ok="deleteComment(item)">
                  <Icon type="md-trash" />
                </Poptip>
              </div>
            </li>
            <NewPage :pageModel="pageModel1" @selectList="selectCommentList" v-if="pageModel1.sumCount>10"></NewPage>
          </ul>
          <ul class="noneli" v-if="commentsTotal==0">
            你还没有评论
          </ul>
        </div>

        <div class="message">
          <h6>我的留言<span class="pink" v-if="messages"> ({{messagesTotal}})</span></h6>
          <ul>
            <li v-for="(item, index) in messages" :key="index">
              <div class="mark" v-html="item.content" v-highlight></div>
              <p class="time">
                <Icon type="md-time" />{{item.created_at}}
              </p>
              <div class="delete">
                <Poptip confirm placement="left" title="是否删除该留言?" @on-ok="deleteMessage(item)">
                  <Icon type="md-trash" />
                </Poptip>
              </div>
            </li>
            <NewPage :pageModel="pageModel2" @selectList="selectMessageList" v-if="pageModel2.sumCount>10"></NewPage>
          </ul>
          <ul class="noneli" v-if="messagesTotal==0">
            你还没有留言
          </ul>
        </div>
      </div>
    </template>
  </div>

</template>


<script>
import marked from 'marked'
import {mapGetters} from "vuex"

export default {
  data () {
    return {
      avatarUrl: this.$avatarUrl,
      loading: true,
      comments: {},
      messages: {},
      commentsTotal: 0,
      messagesTotal: 0,
      pageModel1: {
        page: 1,
        sumCount: 10
      },
      pageModel2: {
        page: 1,
        sumCount: 10
      },
    }
  },
  computed: mapGetters([
    'user'
  ]),  
  created() {
    this.getComment()
    this.getMessage()
  },
  methods: {
    getComment() {
      this.$post('/apis/comment/person', this.pageModel1).then(res => {
        this.loading = false
        this.commentsTotal = res.data.total
        this.comments = res.data.data
        this.pageModel1.sumCount = res.data.total
      }).catch(() => {})
    },
    selectCommentList() {
      this.getComment()
    },
    // 删除评论
    deleteComment(item) {
      let param = {
        id: item.id
      }
      this.$post('/apis/comment/delete', param).then(res => {
        this.comments.splice(this.comments.indexOf(item), 1)
        this.commentsTotal-=1
        this.$Message.success(res.message)
      }).catch(() => {})
    }, 
    getMessage() {
      this.$post('/apis/message/person', this.pageModel2).then(res => {
        this.loading = false
        this.messages = res.data.data
        this.messagesTotal = res.data.total
        this.pageModel2.sumCount = res.data.total
      }).catch(() => {})
    },
    selectMessageList() {
      this.getMessage()
    },
    // 删除留言
    deleteMessage(item) {
      let param = {
        id: item.id
      }
      this.$post('/apis/message/delete', param).then(res => {
        this.messages.splice(this.messages.indexOf(item), 1)
        this.messagesTotal-=1
        this.$Message.success(res.message)
      }).catch(() => {})
    }, 
  }, 
}
</script>


<style scoped lang="stylus">
.person
  display flex
  font-size 14px
.leftinfo
  width 270px
  min-width 270px
  line-height 30px
  margin-right 30px
  margin-bottom 30px
  box-shadow: 2px 2px 14px #c0dbe6
  height: max-content;
  .info-top
    display flex  
    margin-bottom 20px
    background: #ecf0f1;
    padding: 20px;
    img
      width 86px
      height 86px
      border-radius 50%
      box-shadow: 2px 2px 14px #c0dbe6
    .top-text
      padding-left 20px
      .name
        color #f7576c
        font-size 20px
      .time
        color #90999c
        padding-left 5px
  ul
    margin 20px
    border 1px solid #ddebf1
    border-radius 4px
    li
      line-height 44px
      padding 0 20px
      border-bottom 1px solid #ddebf1
    li:last-child
      border none
    .link
      cursor pointer


.rightmain
  flex 1 
  width 0
  >div 
    box-shadow: 2px 2px 14px #c0dbe6
    margin-bottom 30px
    h6
      background: #ecf0f1
      padding: 8px 20px;
      font-size: 16px;
      font-weight: 400;
  ul
    padding 5px 20px
    li
      padding 10px 0 15px
      position relative
      border-bottom 1px solid #ddebf1
      .mark
        padding 5px 0
      .time
        padding-top 5px
        color #858a8c
        i
          margin -2px 6px 0 0
    li:last-child
      border none
    .delete
      position absolute
      bottom: 13px;
      right: 0px;
      cursor pointer
      i
        font-size 20px
        color #98aaaf

.noneli
  line-height: 35px;

@media screen and (max-width: 750px)
  .person
    flex-direction: column;
  .leftinfo
    flex 1
    width 100%
    margin-right 0
  .rightmain
    width 100%
</style>
