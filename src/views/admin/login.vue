<template>
  <div class="login">
    <div class="el-form">
      <div class="logo"></div>
      <div class="formbox">
        <div>
          <label for="name">账号</label>
          <input v-model="formCustom.username" type="text" id="name" placeholder="请输入账号" auto-complete="off">
        </div>
        <div>
          <label for="password">密码</label>
          <input v-model="formCustom.password" type="password" id="password" placeholder="请输入密码" auto-complete="off">
        </div>
      </div>
      <el-checkbox v-model="checked" checked class="remember" >记住密码</el-checkbox>
      <button class="submit animate03" @click="loginSubmit">登 录</button>
    </div>
  </div>
</template>

<script>
// import { setToken, getToken } from '@/utils/token'
import {mapState, mapGetters} from "vuex"

export default {
  data() {
    return {
      show: true,
      checked: true,
      formCustom: {
        username: '佟丽娅',
        password: '123456'
      }
    }
  },
  computed: mapState({
    user:state=>state.user
  }),
  created() {
  },
  methods: {
    loginSubmit() {
      this.$post('/apis/admin/login', this.formCustom).then(res => {
        if (res.data.status == 1) {
          this.$message.success(res.data.msg);

          // 保存数据到 localStorage 和 store
          let user = {
            id: res.data.user_id,
            username: this.formCustom.username,
            is_admin: res.data.is_admin
          }
          localStorage.setItem('user', JSON.stringify(user))
          this.$store.commit('increment', user)
          if (this.$route.query.redirect) {
            this.$router.push(this.$route.query.redirect)
          } else {
            this.$router.push('/admin/articlelist')
          }
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.animate03{
  -webkit-transition-duration:0.3s;
   -moz-transition-duration:0.3s;
    -ms-transition-duration:0.3s;
    transition-duration:0.3s;
}
.login{
  width: 100%;
  height: 100%;
  background: url(../../assets/message.jpg) no-repeat center top;
  background-size: cover;
  .el-form {
    position: absolute;
    right: 12%;
    top:15%;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 300px;
    padding: 20px 30px;
    background: #fff;
    .logo{
      width: 100%;
      height: 170px;
      background: url(../../assets/loginlogo.png) no-repeat center bottom
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
    .formbox{
      background: #fff;
      width: 100%;
      height: 80px;
      box-shadow: 0px 5px 15px #9db7f1;
      border-radius: 3px;
      margin-bottom: 20px;
      line-height: 40px;
      font-size: 16px;
      color: #555555;
      div{
        margin:0 20px;
        position: relative;
        label{
          width: 45px;
          display: inline-block;
          border-right: 1px solid #ddd;
          line-height: 20px;
        }
      }
      div:first-child{
        border-bottom: 1px solid #ddd;
      }
      input{
        outline: none;
        border:0;
        padding:0 10px;
        letter-spacing: 1px;
        font-size: 16px;
        width: 140px;
        color: #555;
        line-height: 30px;
      }
    }
    .submit{
      width:88%;
      margin:auto;
      background: #83b5ff;
      margin:0 0 30px 6%;
      border:0;
      color: #fff;
      padding: 8px;
      border-radius: 30px;
      outline: none;
      cursor: pointer;
    }
    .submit:hover{
      box-shadow: 0px 5px 15px #9db7f1;
      transition: all 0.2;
    }
  }
}


</style>
