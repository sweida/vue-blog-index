<template>
  <div>
    
    <div class="success-box" v-if="success">
      <Icon type="ios-checkmark-circle" size="80" color="Success"/>
      <h2>密码修改成功</h2>
      <p>您的密码已经修改成功，请牢记新密码。现在可以重新登录了。</p>
      <Button type="primary" to="/login" size="large">跳转到登录页</Button>
    </div>

    <div class="regiter-box" v-else>
      <div class="title">重置密码</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="error.type" show-icon v-if="error.msg">{{error.msg}}</Alert>

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
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large">重置密码</Button>
        </FormItem>
      </Form>
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
      success: '',
      error: {
        type: 'success',
        msg: ''
      },
      formCustom: {
        password: '',
        repassword: '',
      },
      ruleCustom: {
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空', }
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
              this.error = {
                type: 'success',
                msg: res.data.msg
              }
              setTimeout(() => {
                this.login()
              }, 1000)
            } else {
              this.error = {
                type: 'error',
                msg: res.data.msg
              }
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
