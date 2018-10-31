<template>
  <div>
    <div class="regiter-box">
      <div class="title">通过邮箱重置密码</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <FormItem label="电子邮箱" prop="email">
          <Input type="text" size="large" v-model="formCustom.email" placeholder="请输入注册时的邮箱地址">
            <Icon type="md-mail" slot="prefix" />
          </Input>
        </FormItem>



        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large">发送邮箱验证码</Button>
        </FormItem>
        <p class="text-center">我们会向您注册的邮箱发送一封验证邮件，请通过邮件中的链接完成剩余操作。</p>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formCustom: {
        username: '',
        password: '',
      },
      ruleCustom: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '请输入正确的电子邮箱', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
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
</style>
