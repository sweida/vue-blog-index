<template>
  <div class="backg">

    <!-- 评论框 -->
    <div class="input-box">
      <div class="text-box">
        <div class="user-img" v-if="user.id">
          <img :src="require(`@/assets/avatar/00${user.id%10}.jpg`)" >
          <h4>{{user.username}}</h4>
        </div>
        <div class="user-img" v-else>
          <img src="../../../assets/avatar/009.jpg" >
          <h4>游客</h4>
        </div>
        <Input 
          v-model="message.content" 
          type="textarea" 
          :autosize="{minRows: 4, maxRows: 8}" 
          :maxlength="200"
          :placeholder="textarea" />
      </div>
      <div class="submit-box">
        <div class="ykname">
          <Input v-model="message.ykname" placeholder="游客可以选填昵称" style="width: 120px" v-if="!user"/>
        </div>
        <Button type="primary" @click="submitMessage" >提交评论</Button>
      </div>
    </div>

    <!-- 评论列表 -->
    <MyLoading v-if="loading"></MyLoading>
    <div v-else>
      <div class="comment" v-for="(item, index) in messageList" :key="index">
        <div class="user-ava" >
          <img :src="require(`@/assets/avatar/00${item.user_id%10}.jpg`)" alt="" v-if="item.user_id">
          <img src="../../../assets/avatar/009.jpg" alt="" v-else>
        </div>

        <div class="comment-box animate03">
          <div class="username"> 
            <span>
              <Icon type="md-person" />
              {{item.user ? item.user.username : item.ykname ? `游客（${item.ykname}）` : '游客'}} 
              <em>{{item.user_id==1 ? '(博主)' : ''}}</em>
              <span class="created"><i class="el-icon-time"></i>{{item.created_at}}</span>
            </span>
            <span class="floor">{{item.id}}楼</span>
          </div>
          <!-- 回复功能后续再做 -->
          <!-- <p class="reply" v-if="item.reply_id">回复<span>{{item.reply_id}}楼</span>“{{item.replyContent}}</p> -->
          <div class="com_detail" v-html="item.content">

          </div>
          <div class="delete"  >
            <!-- 自己的留言显示删除按钮 -->
            <Poptip
              confirm
              title="是否删除该留言?"
              @on-ok="deleteComment(item)">
              <Icon type="md-trash" v-if="(item.user_id==user.id) && item.user_id"/>
            </Poptip>
            <!-- 回复功能后续再做 -->
            <!-- <i class="iconfont lv-icon-xiaoxi2" @click="reply(item.id)"></i> -->
          </div>
          
        </div>
      </div>
      
      <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></MyPage>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      textarea: '留点痕迹，最长200个字',
      autofocus: false,
      loading: true,
      messageList: [],
      message:{
        content: '',
        ykname: ''
      },
      pageModel: {
        page: 1,
        sumCount: 10
      },
      page: 2,
      hasMore: true
    }
  },
  computed: mapState({
    user:state=>state.user
  }),
  created() {
    this.getMessage()
  },
  methods: {
    // 获取留言
    getMessage() {
      // this.loading = true
      this.$post('/apis/message/read', this.pageModel).then(res => {
        console.log(res.data, 'message')
        this.loading = false
        // if (res.data.data.length < 10) {
        //   this.hasMore = false
        // }
        this.pageModel.sumCount = res.data.total
        this.messageList = res.data.data
        // 转换换行
        this.messageList.forEach(item => {
          item.content = item.content.replace(/\n/g, '<br>')
        })
      })
    },    
    selectRoleList() {
      this.getMessage()
    },
    // 提交留言
    submitMessage() {
      this.$post('/apis/message/add', this.message).then(res => {
        console.log(res.data)
        this.getMessage()
        if (res.data.status == 1) {
          this.message = {
            content: '',
            ykname: ''
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 删除自己的留言
    deleteComment(item) {
      this.$post('/apis/message/remove', {id: item.id}).then(res => {
        if (res.data.status == 1) {
          this.messageList.splice(this.messageList.indexOf(item), 1)
          this.$Message.success(res.data.msg)
        } else {
          this.$Message.error(res.data.msg)
        }
      })
    },
    // 回复
    reply(id) {
      console.log(id)
      this.autofocus = true
      this.message.content = ''
      this.message.reply_id = id
      this.textarea = `回复 ${id}楼`
    }

  }
}
</script>
<style scoped lang="stylus">


.text-box
  display flex
  .user-img
    width 60px
    margin-right 15px
    h4
      line-height 26px
      font-size: 14px
      text-align center
      color #f7576c
    img 
      width 100%
      border-radius 50% 
      box-shadow: 3px 3px 11px #d6d6d6 

.submit-box
  margin 15px 0 15px 70px
  display flex 
  justify-content space-between
  .ykname
    flex 1


.comment
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
    line-height 22px
    flex 1
    min-height 120px
    border: 1px solid #ecf0f1
    border-radius: 3px
    width: 100%;
    .username
      line-height 30px
      font-weight bold
      color #f7576c
      background: #ECF0F1
      padding: 6px 15px
      display flex
      align-items center
      justify-content space-between
      .created
        margin-left 10px
        font-weight 100
        color #7F8C8D
        i 
          margin-right 5px
      em
        color #009688
    .com_detail
      padding 15px 25px
    .floor
      flex 0 0 42px
      text-align: right;
    .delete
      position: absolute;
      right: 10px;
      bottom: 7px;
      font-size: 20px;
      color: #657f86;
      cursor: pointer;
      i 
        font-size 20px
        margin: -7px 0 0 10px;
  .comment-box:hover
    box-shadow: 2px 2px 15px #d2e7fd
  .reply
    border-bottom: 1px solid #ecf0f1;
    color: #8fa0a5;
    padding: 9px 0;
    margin: 0 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span
      font-weight bold
      margin 0 5px
      color #f7576c

@media screen and (min-width: 750px)
  .backg
    background #fff
    padding 20px
    box-sizing border-box
    box-shadow: 2px 2px 15px #d9ddde

@media screen and (max-width: 750px)
  .comment .user-ava
    display none
  .submit-box
    margin 15px 0 15px 63px
</style>
