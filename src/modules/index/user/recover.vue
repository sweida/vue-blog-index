<template>
  <div class="main">
    <div class="success-box" v-if="success">
      <Icon type="ios-checkmark-circle" size="80" color="Success"/>
      <h2>密码修改成功</h2>
      <p>您的密码已经修改成功，请牢记新密码。现在可以重新登录了。</p>
      <Button type="primary" to="/login" size="large">跳转到登录页</Button>
    </div>

    <div class="regiter-box" v-else>
      <div class="title">通过邮箱重置密码</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="alert.type" show-icon v-if="alert.text">{{alert.text}}</Alert>
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
        <FormItem label="验证码" prop="captcha">
          <Input type="text" size="large" v-model="formCustom.captcha" placeholder="请输入邮件中的验证码">
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
      alert: {
        type: '',
        text: ''
      },
      success: false,
      loading: false,
      loading2: false,
      btnText: '发送邮箱验证码',
      formCustom: {
        email: '',
        captcha: '',
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
        captcha: [
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
          this.seedEmailFun()
          this.loading = true
        }
      })
    },
    // 发送邮件
    seedEmailFun() {
      let param = {
        email: this.formCustom.email
      }
      this.$api.SendEmail(param).then(res => {
        this.alert = {
          type: 'success',
          text: res.message
        }
        this.loading = false
      }).catch(err =>{
        this.loading = false
        this.btnText = '重新发送邮件'
      })
    },
    // 提交新密码
    codeSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading2 = true
          this.submitForm()
        }
      })
    },
    submitForm() {
      this.$api.CheckCaptcha(this.formCustom).then(res => {
        this.success = true
        this.loading2 = false
      }).catch(err => {
        this.loading2 = false
      })
    },
    // 重置表单
    handleReset (name) {
      this.$refs[name].resetFields();
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
