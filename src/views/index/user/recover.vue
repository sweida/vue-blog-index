<template>
  <div>
    <div class="success-box" v-if="success">
      <Icon type="ios-checkmark-circle" size="80" color="Success"/>
      <h2>密码修改成功</h2>
      <p>您的密码已经修改成功，请牢记新密码。现在可以重新登录了。</p>
      <Button type="primary" to="/login" size="large">跳转到登录页</Button>
    </div>

    <div class="regiter-box" v-else>
      <div class="title">通过邮箱重置密码</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert type="success" show-icon v-if="seedEmail">邮件发送成功，请注意查收邮件</Alert>
        <FormItem label="电子邮箱" prop="email">
          <Input type="text" size="large" v-model="formCustom.email" placeholder="请输入注册时的邮箱地址">
            <Icon type="md-mail" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large" :loading="loading">{{btnText}}</Button>
        </FormItem>
      </Form>

      <Form ref="resetCustom" :model="formCustom" label-position="top" :rules="rulePasswd">
        <FormItem label="验证码" prop="code">
          <Input type="text" size="large" v-model="formCustom.code" placeholder="请输入邮件中的验证码">
            <Icon type="md-mail-open" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="password">
          <Input type="password" size="large" v-model="formCustom.password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="repassword">
          <Input type="password" size="large" v-model="formCustom.repassword">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="codeSubmit('resetCustom')" long size="large" :loading="loading2">确 认</Button>
        </FormItem>

        <p class="text-center">我们会向您注册的邮箱发送一封验证邮件，请输入邮件中的验证码完成剩余操作。</p>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码不能为空'));
      } else if (value !== this.formCustom.password) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      success: false,
      seedEmail: false,
      loading: false,
      loading2: false,
      btnText: '发送邮箱验证码',
      formCustom: {
        email: '',
        code: '',
        password: '',
        repassword: ''
      },
      ruleCustom: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' },
          { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur' }
        ],
      },
      rulePasswd: {
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change'}
        ],
        repassword: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true
          this.seedEmail = true
          this.seedEmailFun()
          this.btnText = '重新发送邮件'
          // this.$Message.success('Success!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    },
    // 发送邮件
    seedEmailFun() {
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    // 提交新密码
    codeSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading2 = true
          this.success = true
          // this.$router.push({name: 'reset', query: this.formCustom})
        }
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$post('/apis/signup', this.form).then(res => {
            console.log(res)
            if (res.data.status == 1) {
              this.$message.success(res.data.msg)
              setTimeout(() => {
                this.login()
              }, 1000)
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
    },
    login () {
      this.$post('/apis/login', this.form).then(res => {
        if (res.data.status == 1) {
          this.$router.push('/')
        } else {
          this.$message.error(res.data.msg)
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
  .login
    text-align: center
  .forger
    width 100%
    display block
    text-align center

.success-box
  margin 50px 0
  text-align center
  color #19be6b
  h2
    font-weight 100
    margin: 18px;
    font-size: 24px;
    color: #17233d;
  p
    width: 70%;
    margin: 0 auto 30px;
    color: #808695;
    font-size: 14px;
</style>
