<template>
  <div class="main">
    <div class="regiter-box">
      <div class="title">修改密码</div>
      <Form ref="formCustom" :model="formCustom" label-position="top" :rules="ruleCustom">
        <Alert :type="alert.type" show-icon v-if="alert.msg">{{alert.msg}}</Alert>

        <FormItem label="当前密码" prop="old_password">
          <Input type="password" size="large" v-model="formCustom.old_password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="新密码" prop="new_password">
          <Input type="password" size="large" v-model="formCustom.new_password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="rep_password">
          <Input type="password" size="large" v-model="formCustom.rep_password">
            <Icon type="md-lock" slot="prefix" />
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" long size="large" :loading="loading">修改密码</Button>
          <!-- <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button> -->
        </FormItem>
      </Form>
      <div class="text-center">
        忘记密码?你可以<router-link to="/recover">重置密码</router-link>
      </div>
    </div>
  </div>

</template>


<script>

export default {
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认新密码不能为空'));
      } else if (value !== this.formCustom.new_password) {
        callback(new Error('两次输入的密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      alert: {
        type: 'error',
        msg: ''
      },
      formCustom: {
        old_password: '',
        new_password: '',
        rep_password: '',
      },
      ruleCustom: {
        old_password: [
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        new_password: [
          { required: true, message: '新密码不能为空', trigger: 'change'}
        ],
        rep_password: [
          { required: true, validator: validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 修改密码按钮
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changePasswd()
        }
      })
    },
    // 修改密码接口
    changePasswd() {
      this.loading = true
      this.$post('/apis/user/change_password', this.formCustom).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.alert = {
            type: 'success',
            msg: res.data.msg
          }
          this.loading = false
          setTimeout(() => {
            this.$router.push('/')
          }, 800)
        } else {
          this.alert = {
            type: 'error',
            msg: res.data.msg
          }
          this.loading = false
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
