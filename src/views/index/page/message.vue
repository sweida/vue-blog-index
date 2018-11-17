<template>
  <div class="higtlight">
    <div class="about-bg">
      <img src="../../../assets/blog.jpg" class="bg-img">
      <div class="bg">
          <p>留言板</p>
      </div>
      <!-- 评论框 -->
      <div class="input-main">
        <div class="input-box main">
          <div class="userbox">
            <div class="user-img" v-if="user.id">
              <img :src="require(`@/assets/avatar/00${user.id%10}.jpg`)" >
              <h4>{{user.username}}</h4>
            </div>
            <div class="user-img" v-else>
              <img src="../../../assets/avatar/009.jpg" >
              <h4>游客</h4>
            </div>
          </div>

          <div class="textbox">
            <Input 
              v-model="message.content" 
              type="textarea" 
              :autosize="{minRows: 4, maxRows: 8}" 
              :maxlength="400"
              :placeholder="textarea" />
            <div class="submit-box">
              <div class="ykname">
                <Input v-model="message.ykname" placeholder="游客可以选填昵称" style="width: 120px" v-if="!user"/>
              </div>
              <Button type="primary" @click="submitMessage" >提交评论</Button>
            </div>
          </div>
        </div>
      </div>

    </div>



    <!-- 评论列表 -->
    <MyLoading v-if="loading"></MyLoading>
    <div class="main" v-else>
      <div class="commentList" v-for="(item, index) in messageList" :key="index">
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
          <div class="com_detail" v-html="item.content" v-highlight></div>
          <div class="delete"  >
            <!-- 自己的留言显示删除按钮 -->
            <Poptip
              confirm
              placement="left"
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
import marked from 'marked'
import '@/style/message.styl'

export default {
  data() {
    return {
      textarea: '留点痕迹，支持markdown语法，尾部2个空格后回车才会换行，最长400个字',
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
    computed: {
    ...mapState([
        'user'
    ]),
    compiledMarkdown: function () {
      return marked(this.detail.content, { sanitize: true })
    }
  },
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
        this.pageModel.sumCount = res.data.total
        this.messageList = res.data.data
        // 转markdown语法
        this.messageList.forEach(item => {
          item.content = marked(item.content, { sanitize: true })
          // 转换换行
          // item.content = item.content.replace(/\n/g, '<br>')
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
.about-bg
  width 100%
  height 500px
  position relative
  .bg-img 
    width: 100%;
    position absolute
    top 0
    -o-object-fit: cover;
    object-fit: cover;
    height: 100%;
  .bg
    background #ecf4ff
    mix-blend-mode: multiply
    height: 100%

.input-main
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

@media screen and (max-width: 750px)
  .comment-box
    box-shadow: 2px 2px 15px #d2e7fd
  .about-bg
    height 300px
</style>
