<template>
  <div class="person">
    <div class="leftinfo">
      <img :src="require(`@/assets/avatar/00${userInfo.user_id%10}.jpg`)" alt="" v-if="userInfo.user_id">
      <img src="../../../assets/avatar/009.jpg" alt="" v-else>
      <div>
        <p>{{userInfo.username}}</p>
        <p>第{{userInfo.id}}个注册的用户</p> 
        <p>邮箱： {{userInfo.email}}</p>
        <p>注册时间： {{userInfo.created_at}}</p>
        <!-- <p>手机{{user.phone}}</p> -->
        <p>会员： {{userInfo.is_admin ? '超级管理员' : '普通用户'}}</p>
      </div>

      <li>
        我的评论
      </li>
      <li>
        我的留言
      </li>
    </div>

    <div class="rightmain">
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
.person
  display flex
  font-size 16px
.leftinfo
  text-align center
  width 250px
  padding 20px
  line-height 30px
  margin-right 20px
  margin-bottom 30px
  border 1px solid #ddd
  height: max-content;
  img
    width 80px

.rightmain
  flex 1 

@media screen and (max-width: 750px)
  .person
    flex-direction: column;
  .leftinfo
    flex 1
    width 100%
    margin-right 0
  
</style>
