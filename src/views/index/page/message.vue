<template>
  <div class="backg">

        <!-- 评论框 -->
        <div class="input-box">
            <Input 
              v-model="message.content" 
              type="textarea" 
              :autosize="{minRows: 4}" 
              placeholder="留点痕迹" />
            <div class="submit-box">
              <div class="ykname">
                <Input v-model="message.username" placeholder="游客可以选填昵称" style="width: 150px" v-if="!user"/>
              </div>
              <Button type="primary" @click="submitMessage" >提交评论</Button>
            </div>
        </div>

        <!-- 评论列表 -->
        <MyLoading v-if="loading"></MyLoading>
        <div v-else>
          <div class="comment" v-for="(item, index) in messageList" :key="index">
            <div class="user-ava">
              <img src="../../../assets/avatar/010.jpg" alt="">
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
              </div>
            </div>
          </div>
          <!-- <div class="more">
            <Button @click="getMore" v-if="hasMore">加载更多</Button>
            <p v-else>没有更多了..</p>
          </div> -->
          <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></MyPage>
        </div>

  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  data() {
    return {
      loading: true,
      messageList: [],
      message:{
        content: '',
        username: ''
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
            username: ''
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 加载更多
    // getMore() {
    //   let param = {
    //     page: this.page
    //   }
    //   this.$post('/apis/message/read', param).then(res => {
    //     console.log(res.data, 'message2')
    //     this.page +=1
    //     if (res.data.data.length < 10) {
    //       this.hasMore = false
    //     }
    //     // // 转换换行
    //     res.data.data.forEach(item => {
    //       item.content = item.content.replace(/\n/g, '<br>')
    //     })
    //     this.messageList.push(...res.data.data)
    //   })
    // }
  }
}
</script>
<style scoped lang="stylus">
.backg
  background #fff
  padding 20px
  box-sizing border-box
  box-shadow: 2px 2px 15px #d9ddde

.submit-box
  margin 15px auto
  display flex 
  justify-content space-between
  .el-input
    width 150px
    .ykname
      flex 1

.more
  margin-top 10px
  text-align center

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
    // box-shadow: 2px 2px 15px #d2e7fd
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
        i 
          margin-right 5px
    .com_detail
      padding 15px 25px
    .floor
      flex 0 0 42px
      text-align: right;
  .comment-box:hover
    box-shadow: 2px 2px 15px #d2e7fd


</style>
