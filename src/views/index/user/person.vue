<template>
  <div class="person">
    <TextLoading v-if="loading"></TextLoading>

    <template v-else>
      <div class="leftinfo">
        <div class="info-top">
          <img :src="require(`@/assets/avatar/00${userInfo.id%10}.jpg`)" alt="" v-if="userInfo.id">
          <img src="../../../assets/avatar/009.jpg" alt="" v-else>
          <div class="top-text">
            <p class="name">{{userInfo.username}}</p>
            <p>第<span class="pink">{{userInfo.id}}</span>位注册的用户</p> 
            <p>注册于<span class="time">{{userInfo.created_at.substring(0,10)}}</span></p>
          </div>
        </div>

        <ul>
          <li>邮箱： {{userInfo.email}}</li>
          <!-- <p>手机{{user.phone}}</p> -->
          <li>权限： {{userInfo.is_admin ? '站长' : '普通用户'}}</li>
          <li>修改头像</li>
          <router-link tag="li" to="password" class="link">
            修改密码
          </router-link>
          <!-- <li>
            我的评论<span class="pink"> ({{userInfo.comments.data.length}})</span>
          </li>
          <li>
            我的留言<span class="pink"> ({{userInfo.messages.data.length}})</span>
          </li> -->
        </ul>
      </div>

      <div class="rightmain">
        <div class="comment">
          <h4>我的评论<span class="pink"> ({{userInfo.comments.data.length}})</span></h4>
          <ul>
            <router-link tag="li" :to="{path:`/blog/${item.article.id}`}" v-for="(item, index) in userInfo.comments.data" :key="index">
              <p>评论文章：{{item.article.title}}</p>
              <p>内容：{{item.content}}</p>
              <p>时间：{{item.created_at}}</p>
              <div class="delete"  >
                <Poptip
                  confirm
                  title="是否删除该评论?"
                  @on-ok="deleteComment(item)">
                  <Icon type="md-trash" />
                </Poptip>
              </div>
            </router-link>
          </ul>
        </div>
        <div class="message">
          <h4>我的留言<span class="pink"> ({{userInfo.messages.data.length}})</span></h4>
          <ul>
            <li v-for="(item, index) in userInfo.messages.data" :key="index">
              <p>内容：{{item.content}}</p>
              <p class="time">时间：{{item.created_at}}</p>
              <div class="delete"  >
                <Poptip
                  confirm
                  title="是否删除该留言?"
                  @on-ok="deleteMessage(item)">
                  <Icon type="md-trash" />
                </Poptip>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>

</template>


<script>
import {mapState} from "vuex"

export default {
  data () {
    return {
      loading: true,
      userInfo: {
        comments: {
          data: []
        },
        messages: {
          data: []
        }
      }
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
      let param = {
        user_id: this.user.id
      }
      this.$post('/apis/user/read', param).then(res => {
        console.log(res.data, 'UserInfo')
        this.userInfo = res.data.data
        this.loading = false
      })
    },
    deleteComment(item) {
      this.$post('/apis/comment/remove', {id: item.id}).then(res => {
        if (res.data.status == 1) {
          this.userInfo.comments.data.splice(this.userInfo.comments.data.indexOf(item), 1)
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    }, 
    deleteMessage(item) {
      this.$post('/apis/message/remove', {id: item.id}).then(res => {
        if (res.data.status == 1) {
          this.userInfo.messages.data.splice(this.userInfo.messages.data.indexOf(item), 1)
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
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
      width 90px
      height 90px
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
  >div 
    box-shadow: 2px 2px 14px #c0dbe6
    margin-bottom 30px
    h4
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
      .time
        padding-top 5px
        color #858a8c
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

@media screen and (max-width: 750px)
  .person
    flex-direction: column;
  .leftinfo
    flex 1
    width 100%
    margin-right 0
  
</style>
