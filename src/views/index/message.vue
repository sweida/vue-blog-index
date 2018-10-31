<template>
  <div >

        <!-- 评论框 -->
        <div>
            <!-- 评论 [{{commentList.length}}] -->
            <!-- <el-input
              type="textarea"
              placeholder="留的痕迹"
              resize='none'
              :autosize='{minRows: 2}'
              v-model="message.content">
            </el-input> -->
            <Input 
              v-model="message.content" 
              type="textarea" 
              :autosize="{minRows: 2}" 
              placeholder="留的痕迹" />
            <div class="submit-box">
              <Input v-model="message.username" placeholder="游客可以选填昵称" style="width: 150px" />
              <Button type="primary" @click="submitMessage" >提交评论</Button>
              <!-- <el-input v-model="message.username" size="small" placeholder="昵称"></el-input> -->
              <!-- <el-button type="primary" size="small" @click="submitMessage">提交评论</el-button> -->
            </div>
        </div>

        <!-- 评论列表 -->
        <div>
          <div class="comment" v-for="(item, index) in messageList">
            <div class="user-ava">
              <img src="../../assets/avatar/010.jpg" alt="">
            </div>
            <div class="comment-box animate03">
              <div class="username"> 
                <span>
                  {{item.user ? item.user.username : '游客'}} 
                  <span class="created"><i class="el-icon-time"></i>  <Time :time="item.created_at" /></span>
                </span>
                <span class="floor">{{item.id}}楼</span>
              </div>
              <div class="com_detail" v-html="item.content">
                <!-- <mavon-editor v-html="item.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :boxShadow="false" /> -->
                <!-- {{item.content}} -->
              </div>
            </div>
          </div>
        </div>


  </div>
</template>

<script>

export default {
  data() {
    return {
      messageList: [],
      message:{
        content: '',
        username: ''
      }
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    // 获取留言
    getMessage() {
      this.$get('/apis/message/read').then(res => {
        console.log(res.data, 'message')
        this.messageList = res.data.data
        // 转换换行
        this.messageList.forEach(item => {
          item.content = item.content.replace(/\n/g, '<br>')
        })
      })
    },
    // 提交留言
    submitMessage() {
      this.$post('/apis/message/add', this.message).then(res => {
        console.log(res.data)
        this.getMessage()
        if (res.data.status == 1) {
          this.message = {
            content: '',
            username: ''
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">

li
  margin-bottom 10px


.submit-box
  margin-top 15px
  display flex 
  justify-content space-between
  .el-input
    width 150px

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
    box-shadow: 2px 2px 15px #d2e7fd
    .username
      line-height 30px
      font-weight bold
      color #f7576c
      background: #ECF0F1
      padding: 6px 15px
      display flex
      justify-content space-between
      .created
        margin-left 10px
        font-weight 100
        color #7F8C8D
    .com_detail
      padding 15px 25px
    .floor
      flex 0 0 42px
      text-align: right;
  .comment-box:hover
    box-shadow: 2px 2px 15px #d2e7fd
  // .comment-box:after
  //   content: ""
  //   width 2px
  //   height: 30px;
  //   bottom -30px
  //   left: 20px;
  //   background: #ecf0f1;
  //   position: absolute;
  //   display: block;
</style>
