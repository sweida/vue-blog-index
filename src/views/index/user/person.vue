<template>
  <div class="main person higtlight">
    <TextLoading v-if="loading"></TextLoading>

    <template v-else>
      <div class="leftinfo">
        <div class="info-top">
          <img :src="`https://avatars.dicebear.com/v2/identicon/id-${userInfo.id}.svg`" alt="">
          <!-- <img src="../../../assets/avatar/009.jpg" alt="" v-else> -->
          <div class="top-text">
            <p class="name">{{userInfo.name}}</p>
            <p>第<span class="pink">{{userInfo.id}}</span>位注册的用户</p> 
            <p>注册于<span class="time">{{userInfo.created_at.substring(0,10)}}</span></p>
          </div>
        </div>

        <ul>
          <li>邮箱： {{userInfo.email}}</li>
          <li>权限： {{userInfo.is_admin ? '博主' : '普通用户'}}</li>
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
          <h6>我的评论<span class="pink" v-if="comments"> ({{comments.length}})</span></h6>
          <ul>
            <li v-for="(item, index) in comments" :key="index">
              <router-link :to="{path:`/blog/${item.article.id}`}">评论文章：{{item.article.title}}</router-link>
              <div class="mark" v-html="item.content" v-highlight></div>
              <p class="time"><Icon type="md-time" />{{item.created_at}}</p>
              <div class="delete"  >
                <Poptip
                  confirm
                  placement="left"
                  title="是否删除该评论?"
                  @on-ok="deleteComment(item)">
                  <Icon type="md-trash" />
                </Poptip>
              </div>
            </li>
          </ul>
          <ul class="noneli" v-if="comments.length==0">
            你还没有评论
          </ul>
        </div>

        <div class="message">
          <h6>我的留言<span class="pink" v-if="messages"> ({{messages.length}})</span></h6>
          <ul>
            <li v-for="(item, index) in messages" :key="index">
              <div class="mark" v-html="item.content" v-highlight></div>
              <p class="time"><Icon type="md-time" />{{item.created_at}}</p>
              <div class="delete"  >
                <Poptip
                  confirm
                  placement="left"
                  title="是否删除该留言?"
                  @on-ok="deleteMessage(item)">
                  <Icon type="md-trash" />
                </Poptip>
              </div>
            </li>
          </ul>
          <ul class="noneli" v-if="messages.length==0">
            你还没有留言
          </ul>
        </div>
      </div>
    </template>
  </div>

</template>


<script>
import marked from 'marked'
import {mapState} from "vuex"

export default {
  data () {
    return {
      loading: true,
      userInfo: {},
      comments: {},
      messages: {}
    }
  },
  computed: mapState({
    user:state=>state.user
  }),  
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$get('/apis/user/info').then(res => {
        console.log(res.data, 'UserInfo')
        if (res.data.status == 'success') {
          this.userInfo = res.data.data
        } else {
          this.alert = {
            type: 'error',
            msg: res.data.message
          }
        }
      })
      this.$get('/apis/comment/person').then(res => {
        this.loading = false
        if (res.data.status == 'success') {
          this.comments = res.data.data.data
        } else {
          this.alert = {
            type: 'error',
            msg: res.data.message
          }
        }
      })
      this.$get('/apis/message/person').then(res => {
        this.loading = false
        if (res.data.status == 'success') {
          this.messages = res.data.data.data
        } else {
          this.alert = {
            type: 'error',
            msg: res.data.message
          }
        }
      })
    },
    // 删除评论
    deleteComment(item) {
      let param = {
        id: item.id
      }
      this.$post('/apis/comment/delete', param).then(res => {
        if (res.data.status == 1) {
          this.comments.data.splice(this.comments.data.indexOf(item), 1)
          this.$Message.success(res.data.message)
        } else {
          this.$Message.error(res.data.message)
        }
      })
    }, 
    // 删除留言
    deleteMessage(item) {
      let param = {
        id: item.id
      }
      this.$post('/apis/message/delete', param).then(res => {
        if (res.data.status == 1) {
          this.messages.data.splice(this.messages.data.indexOf(item), 1)
          this.$Message.success(res.data.message)
        } else {
          this.$Message.error(res.data.message)
        }
      })
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
