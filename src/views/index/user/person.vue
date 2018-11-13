<template>
  <div class="person">
    <TextLoading v-if="loading"></TextLoading>

    <div v-else class="leftinfo">
      <div class="info-top">
        <img :src="require(`@/assets/avatar/00${userInfo.user_id%10}.jpg`)" alt="" v-if="userInfo.user_id">
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
        <li>等级： {{userInfo.is_admin ? '超级管理员' : '普通用户'}}</li>
        <li>修改头像</li>
        <li>
          修改密码
        </li>
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
          <li v-for="(item, index) in userInfo.comments.data" :key="index">
            <p>{{item.article_id}}</p>
            <p>{{item.content}}</p>
            <p>{{item.created_at}}</p>
          </li>
        </ul>
      </div>
      <div class="message">
        <h4>我的留言<span class="pink"> ({{userInfo.messages.data.length}})</span></h4>
        <ul>
          <li v-for="(item, index) in userInfo.messages.data" :key="index">
            <p>内容：{{item.content}}</p>
            <p>时间：{{item.created_at}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>


<script>
import {mapState} from "vuex"

export default {
  data () {
    return {
      loading: true,
      userInfo: {
        comments: {},
        messages: {}
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
    }
  }
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
    background: #f7f7f7;
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



.rightmain
  flex 1 
  >div 
    box-shadow: 2px 2px 14px #c0dbe6
    margin-bottom 30px
    h4
      background: #f7f7f7
      padding: 8px 20px;
      font-size: 16px;
      font-weight: 400;
  ul
    padding 5px 20px 20px
    li
      padding 10px 0 15px
      border-bottom 1px solid #ddebf1

@media screen and (max-width: 750px)
  .person
    flex-direction: column;
  .leftinfo
    flex 1
    width 100%
    margin-right 0
  
</style>
