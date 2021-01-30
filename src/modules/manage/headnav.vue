<template>
  <div class="header">
    <div class="title">
      {{$route.name}}
    </div>
    <div class="nav">
      <div class="right-nav">

        <el-menu 
          class="el-menu-demo2" 
          mode="horizontal" 
          background-color="#2a2c40" 
          text-color="#fff" 
          :router="true" 
          :default-active="$route.path" 
          active-text-color="#ffd04b">
          <el-menu-item index="1">
            <a href="/" target="_blank">前往博客</a>
          </el-menu-item>
          <el-submenu class="user-nav" index="">
            <template slot="title">
              <img src="../../assets/avatar/admin.jpg" class="userimg">
              <span class="admin-name">{{user.username}}</span>
            </template>
            <el-menu-item index="/resetpassword">修改密码</el-menu-item>
            <el-menu-item index="" @click="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
  },
  methods: {
    ...mapActions(['Logout']),
    logout() {
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('/apis/logout').then(res => {
          this.$message.success(res.message)
          this.Logout()
          this.$router.push('/login')
        }).catch(err => {})
      }).catch(() => {
      })
    },
    goindex() {
      let routeData = this.$router.resolve({ path: '/'});
      window.open(routeData.href, '_blank');
    }
  }

}
</script>

<style scoped lang="stylus">
.header
  display: flex
  height: 60px
  background: #2a2c40
  .nav
    display: flex
    justify-content: flex-end
    flex: 1
  .title
    color #fff
    line-height 60px
    margin-left 30px
    font-size: 18px
.el-menu-demo li
  width: 100px
  text-align: center
.right-nav
  display: flex
  margin-right: 30px
  img
    width: 42px
    border-radius: 50%
    margin-right: 5px
  .tip
    width: 300px
    height: 150px
    padding: 20px
    background: #475368
    position: absolute
    top: 65px
    z-index: 100
    right: 205px
    color: #fff
    font-size: 14px
    .tip-top
      position: absolute
      right: 20px
      top: -15px
      width: 0
      height: 0
      border-left: 6px solid transparent
      border-right: 6px solid transparent
      border-bottom: 15px solid #475368
  .bell
    width: 60px
    display: flex
    justify-content: center
    padding-top: 20px
    box-sizing: border-box
    cursor: pointer
    position: relative
    .num
      border: 0
      background: red
      width: 18px
      height: 18px
      line-height: 18px
      border-radius: 50%
      text-align: center
      font-size: 12px
      color: #fff
      position: absolute
      right: 8px
      top: 12px
    .el-icon-bell
      color: #fff
      font-size: 22px
</style>
