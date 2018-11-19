<template>
  <div class="main">
    <div class="regiter-box">
      <div class="title">登录</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="alert.type" show-icon v-if="alert.msg">{{alert.msg}}</Alert>
        <FormItem label="用户名" prop="username">
          <Input type="text" size="large" v-model="formCustom.username">
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
      </Form>
      <div class="text-center">
        <router-link to="/recover">忘记密码</router-link>
      </div>
      <p class="text-center">尚未拥有账户？
        <router-link to="/register">注册</router-link>
      </p>
      {{user}}
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";  // 引入mapState 

export default {
  data () {
    return {
      alert: {
        type: 'success',
        msg: ''
      },
      loading: false,  
      formCustom: {
        username: '',
        password: '',
      },
      ruleCustom: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change'}
        ]
      }
    }
  },
  computed: mapState({
    user:state=>state.user
  }),
  mounted() {
    this.formCustom.username = localStorage.getItem('username') || ''
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.login()
        }
      })
    },
    // 清空输入框
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    login () {
      this.loading = true

      this.$post('/apis/login', this.formCustom).then(res => {
        this.loading = false
        if (res.data.status == 1) {
          console.log(res, 5555)
          this.$Message.success(res.data.msg);
          // 保存数据到 localStorage 和 store
          let user = {
            id: res.data.user_id,
            username: this.formCustom.username
          }
          if (res.data.is_admin) {
            user.is_admin = res.data.is_admin
          }
          localStorage.setItem('user', JSON.stringify(user))
          this.$store.commit('increment', user)
          this.$router.push('/')
          localStorage.setItem('username', this.formCustom.username)
        } else {
          this.alert = {
            type: 'error',
            msg: res.data.msg
          }
          // this.$Message.error(res.data.msg);
        }
      })
    }
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

</style>
