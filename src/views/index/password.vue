<template>
  <div>
    <div class="regiter-box">
      <div class="title">修改密码</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="error.type" show-icon v-if="error.msg">{{error.msg}}</Alert>

        <FormItem label="当前密码" prop="password">
          <Input type="text" size="large" v-model="formCustom.password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="newpassword">
          <Input type="password" size="large" v-model="formCustom.newpassword">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="repassword">
          <Input type="password" size="large" v-model="formCustom.repassword">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large">修改密码</Button>
          <!-- <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
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
      } else if (value !== this.formCustom.repassword) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      error: {
        type: 'success',
        msg: ''
      },
      formCustom: {
        password: '',
        newpassword: '',
        repassword: '',
      },
      ruleCustom: {
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, trigger: 'blur', message: '新密码不能为空', }
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

</style>
