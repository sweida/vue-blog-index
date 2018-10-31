<template>
  <div class="login">
    <div class="regiter-box">
      <h1>登录</h1>
    <el-form label-position="top" :rules="rules" ref="ruleForm" label-width="80px" :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      show: true,
      checked: true,
      form: {
        username: '',
        email: '',
        password: '',
        repassword: '',
      },
      rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' }
          ],
        }
    }
  },
  methods: {
    submitForm() {
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

.regiter-box
  max-width 450px 
  margin auto
  background #fff
  font-size 14px

</style>
