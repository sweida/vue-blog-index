<template>
  <div>
    <div class="regiter-box">
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
        <FormItem label="验证码" class="code">
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
          <Button type="primary" @click="codeSubmit('formCustom')" long size="large">确 认</Button>
        </FormItem>

        <p class="text-center">我们会向您注册的邮箱发送一封验证邮件，请输入邮件中的验证码完成剩余操作。</p>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      seedEmail: false,
      loading: false,
      btnText: '发送邮箱验证码',
      formCustom: {
        email: '',
        code: '',
      },
      ruleCustom: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'change' },
          { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur' }
        ],
        // code: [
        //   { required: true, message: '验证码不能为空', trigger: 'change' },
        // ],
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
    codeSubmit() {
      this.$router.push({name: 'reset', query: this.formCustom})
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

// .code
//   .ivu-form-item-content
//     display flex 
//     justify-content space-between
//     .ivu-input-wrapper
//       width 200px
//     .ivu-btn
//       flex 1
//       margin-left 20px
</style>
