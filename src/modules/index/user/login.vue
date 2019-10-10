<template>
  <div class="main">
    <div class="regiter-box">
      <div class="title">登录</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="alert.type" show-icon v-if="alert.msg">{{alert.msg}}</Alert>
        <FormItem label="用户名或邮箱地址" prop="name">
          <Input type="text" size="large" v-model="formCustom.name">
            <Icon type="md-happy" slot="prefix" />
          </Input>
        </FormItem>

        <FormItem label="密码" prop="password">
          <Input type="password" size="large" v-model="formCustom.password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large" :loading="loading">登录</Button>
        </FormItem>
        <h3 class="text-center or">or</h3>
        <FormItem>
          <Button class="black" @click="githubLogin" long size="large" :loading="gitHubLoading">
            <Icon type="logo-github" />
            GitHub 登录
          </Button>
        </FormItem>
      </Form>
      <div class="text-center">
        <router-link to="/recover">忘记密码</router-link>
      </div>
      <p class="text-center">尚未拥有账户？
        <router-link to="/register">注册</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";  // 引入mapState 

export default {
  data () {
    return {
      alert: {
        type: 'success',
        msg: ''
      },
      loading: false,  
      gitHubLoading: false,
      formCustom: {
        name: '',
        password: '',
        type: 'name'
      },
      ruleCustom: {
        name: [
          { required: true, message: '用户名或邮箱不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    if (this.$route.query.token){
      this.Token(this.$route.query.token)
      this.UserInfo()
      this.$router.push('/blog')
    }
  },
  mounted() {
    this.formCustom.name = localStorage.getItem('name') || ''
  },
  methods: {
    ...mapActions([
      'Token', 'UserInfo'
    ]),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loginFun()
        }
      })
    },
    // 清空输入框
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    loginFun () {
      this.loading = true
      this.formCustom.name.indexOf('@') == -1 ? this.formCustom.type = 'name' : this.formCustom.type = 'email'

      this.$post('/apis/login', this.formCustom).then(res => {
        // this.$Message.success('登录成功！');
        this.$Notice.success({
          title: '亲爱的 '+this.formCustom.name,
          desc: '欢迎回来！！！',
          duration: 3
        });
        this.Token(res.data.token)
        this.UserInfo()
        
        if (this.$route.query.redirect){
          this.$router.push(this.$route.query.redirect)
        } else{
          this.$router.push('/blog')
        }
      }).catch(err => {
        this.loading = false
      })
    },
    githubLogin () {
      this.gitHubLoading = true
      let githubUrl = this.$baseApiUrl + '/github'

      window.location.href = githubUrl

      // 弹出 500 * 500 的窗口
      // window.open(githubUrl, 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')

      // //  通过监听，父页面可以拿到子页面传递的token，父(前端页面)，子(小窗)
      // window.addEventListener('message', (e) => {
      //     console.log('调用登录');
      //     this.setLogin(e.data)
      // }, false)
    },
  }
}
</script>



<style scoped lang="stylus">
.ivu-checkbox-wrapper
  margin-top 6px
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
.or
  margin -15px 0 10px

.black
  background #333
  color #fff
  outline none
  border #333
  i
    font-size 18px
    margin 0 6px 3px 0

.black:hover
  background #222

</style>
