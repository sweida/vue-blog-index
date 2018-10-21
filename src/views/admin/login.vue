<template>
  <div class="login">
    <div class="el-form">
      <div class="logo"></div>
      <div class="formbox">
        <div>
          <label for="name">账号</label>
          <input v-model="user.username" type="text" id="name" placeholder="请输入账号" auto-complete="off">
        </div>
        <div>
          <label for="password">密码</label>
          <input v-model="user.password" :type="show ? 'password' : 'text'" id="password" placeholder="请输入密码" auto-complete="off"><i :class="show ?'seepassword' : 'el-icon-view'" @click="show=!show"></i>
        </div>
      </div>
      <el-checkbox v-model="checked" checked class="remember" >记住密码</el-checkbox>
      <button class="submit animate03" @click="loginSubmit">登 录</button>
    </div>
  </div>
</template>

<script>
// import { setToken, getToken } from '@/utils/token'

export default {
  data() {
    return {
      show: true,
      checked: true,
      user: {
        username: '佟丽娅',
        password: '123456'
      }
    }
  },
  methods: {
    loginSubmit() {
      this.$post('apis/login', this.user).then(res => {
        if (res.data.status == 1) {
          this.$router.push('/admin/setting')
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
  background: url(../../assets/loginbg.jpg) no-repeat center top;
  background-size: cover;
  .el-form {
    position: absolute;
    right: 12%;
    top:15%;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 280px;
    padding: 20px 30px;
    background: #fff;
    .logo{
      width: 100%;
      height: 200px;
      background: url(/static/img/loginlogo.png) no-repeat center top;
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
        i{
          position: absolute;
          margin-top: 10px;
          right: 0px;
          color:#aaa;
          font-size: 18px;
        }
        .seepassword{
          width: 24px;
          height: 20px;
          background: url(/static/img/password.png) no-repeat;
          background-size: contain;
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
