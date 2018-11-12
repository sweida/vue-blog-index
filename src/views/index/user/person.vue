<template>
  <div>
    <div class="">
      <img src="" alt="">
      <div>
        <p>用户名 {{userInfo.username}}</p>
        <p>第{{userInfo.id}}个注册的用户</p> 
        <p>邮箱 {{userInfo.email}}</p>
        <p>注册时间 {{userInfo.created_at}}</p>
        <p>头像 {{userInfo.avatar_url}}</p>
        <p>手机{{user.phone}}</p>
        <p>会员 {{userInfo.is_admin ? '超级管理员' : '普通用户'}}</p>
      </div>
    </div>
    <div>
      <div>
        <h4>我的评论</h4>
        <li v-for="(item, index) in userInfo.comments.data" :key="index">
          <p>{{item.article_id}}</p>
          <p>{{item.content}}</p>
          <p>{{item.created_at}}</p>
        </li>
      </div>
      <div>
        <h4>我的留言</h4>
        <li v-for="(item, index) in userInfo.messages.data" :key="index">
          <p>{{item.content}}</p>
          <p>{{item.created_at}}</p>
        </li>
      </div>
    </div>
  </div>

</template>


<script>
import {mapState} from "vuex"

export default {
  data () {
    return {
      loading: false,
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
      })
    }
  }
}
</script>



<style scoped lang="stylus">
.title
  border-bottom: 1px solid #e8eaec
  padding: 14px 15px
  line-height: 1
  font-size: 14px
  color: #17233d
  font-weight: bold
.regiter-box
  max-width: 370px
  margin: 30px auto
  padding: 15px
  background: #fff
  font-size: 14px
  box-shadow: 1px 1px 5px #cddde2
  .ivu-form
    padding: 15px 15px 0

</style>
