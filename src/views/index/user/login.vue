<template>
  <div>
    <div class="regiter-box">
      <div class="title">登录</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="error.type" show-icon v-if="error.msg">{{error.msg}}</Alert>
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
      error: {
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
  // computed: {...mapState([user])},
  computed: mapState({
    user:state=>state.user
  }),
  // computed: {
  //   ...mapGetters(['user']),
  // },
  created() {

    // store.commit('increment')

    // console.log(this.$store.state.user, 33) // -> 1
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
      this.error.msg = ''
      this.$post('/apis/login', this.formCustom).then(res => {
        this.loading = false
        if (res.data.status == 1) {
          // this.error = {
          //   type: 'success',
          //   msg: res.data.msg
          // }
          this.$Message.success(res.data.msg);
          // 保存数据到 localStorage 和 store
          localStorage.setItem('user', this.formCustom.username)
          this.$store.commit('increment', this.formCustom.username)
          this.$router.push('/')
        } else {
          // this.error = {
          //   type: 'error',
          //   msg: res.data.msg
          // }
          this.$Message.error(res.data.msg);
        }
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
