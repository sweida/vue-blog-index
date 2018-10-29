<template>
  <div class="login">
    <div class="regiter-box">
      <h1>注册账号</h1>
    <el-form label-position="top" :rules="rules" ref="ruleForm" label-width="80px" :model="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repassword">
        <el-input type="password" v-model="form.repassword"></el-input>
      </el-form-item>
    </el-form>
      <!-- <div>
        <p>用户名</p>
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        <p>邮箱</p>
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
        <p>密码</p>
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
        <p>确认密码</p>
        <el-input v-model="form.password" placeholder="请确认密码"></el-input>
      </div> -->
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
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
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' }
          ],
          repassword: [
            { validator: validatePass2, trigger: 'blur' }
            // { required: true, message: '请确认密码', trigger: 'blur' }
          ]
        }
    }
  },
  methods: {
    submitForm(formName) {
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
    login() {
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
