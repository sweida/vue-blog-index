<template>
  <div>
    <div class="regiter-box">
      <div class="title">注册账号</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <FormItem label="用户名" prop="username">
          <Input type="text" size="large" v-model="formCustom.username">
            <Icon type="md-happy" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="电子邮箱" prop="email">
          <Input type="text" size="large" v-model="formCustom.email">
            <Icon type="md-mail" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="设置密码" prop="password">
          <Input type="password" size="large" v-model="formCustom.password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="确认密码" prop="repassword">
          <Input type="password" size="large" v-model="formCustom.repassword">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large" :loading="laoding">提交</Button>
          <!-- <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
        </FormItem>
      </Form>
      <p class="text-center">已经拥有账户？
        <router-link to="/login">登录</router-link>
      </p>
    </div>
  </div>

</template>


<script>
export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'));
      } else if (value !== this.formCustom.password) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      laoding: false,
      formCustom: {
        username: '',
        password: '',
        repassword: '',
        email: ''
      },
      ruleCustom: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' },
          { type: 'email', message: '请输入正确的电子邮箱', trigger: 'change' }
        ],
        password: [
          { required: true, trigger: 'change', message: '密码不能为空', }
        ],
        repassword: [
          { required: true, validator: validatePassCheck, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.register()
        }
      })
    },
    // 清空
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    register() {
      this.laoding = true
      this.$post('/apis/signup', this.formCustom).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.$Message.success(res.data.msg)
          this.login()
        } else {
          this.$Message.error(res.data.msg)
        }
        this.laoding = false
      })
    },
    login() {
      this.$post('/apis/login', this.formCustom).then(res => {
        if (res.data.status == 1) {
          this.$router.push('/')
        } else {
          this.$Message.error(res.data.msg)
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
