<template>
<div>


  <div class="header">

    <!-- <div class="mobliNav">
      <Icon type="md-menu" @click="show3 = !show3" class=""/>
    </div> -->
    <!-- <el-button @click="show3 = !show3">Click Me</el-button> -->
    <div class="menu">
      <div class="left">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/blog">博文</router-link>
        </li>
        <li>
          <router-link to="/link">友链</router-link>
        </li>
        <li>
          <router-link to="/shang">打赏</router-link>
        </li>
        <li>
          <router-link to="/message">留言</router-link>
        </li>
      </div>
      <!-- <div class="logo">
        <img src="../../assets/logo.png" />
      </div> -->


      <div class="user" v-if="user">
        <Dropdown @on-click="changeMenu">
          <a href="javascript:void(0)" class="user-info">
            <img src="../../assets/avatar/005.jpg" alt="">
            {{user}}
            <!-- <Icon type="ios-arrow-down"></Icon> -->
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="person"><Icon type="ios-hammer" />个人中心</DropdownItem>
            <DropdownItem name="changePasswd"><Icon type="ios-hammer" />修改密码</DropdownItem>
            <DropdownItem name="logout"><Icon type="ios-log-out" />退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <div class="right" v-else>
        <router-link to="/login">登录</router-link>
        <span class="register">/</span>
        <router-link to="/register">注册</router-link>
      </div>

    </div>
  </div>

  <!-- 手机菜单 -->
  <Collapse simple v-model="mobnav" class="nav-content">
    <Panel name="1" hide-arrow>
      <span></span>
      <span></span>
      <span></span>
      <div class="mobliNav-main" slot="content">
        <router-link to="/">首页</router-link>
        <router-link to="/blog">博文</router-link>
        <router-link to="/link">友链</router-link>
        <router-link to="/shang">打赏</router-link>
        <router-link to="/message">留言</router-link>
      </div>
    </Panel>
  </Collapse>

  <!-- <div class="mobliNav-main animate05"  :class="{active: show3}">
    <li>
      <router-link to="/">首页</router-link>
    </li>
    <li>
      <router-link to="/blog">博文</router-link>
    </li>
    <li>
      <router-link to="/link">友链</router-link>
    </li>
    <li>
      <router-link to="/shang">打赏</router-link>
    </li>
    <li>
      <router-link to="/message">留言</router-link>
    </li>
  </div> -->


</div>
</template>

<script>
import {mapState} from "vuex"

export default {
  data () {
    return {
      mobnav: '2'
    }
  },
  computed: mapState({
    user:state=>state.user
  }),
  created() {
    // console.log(, 22)
    // this.getClassify()
  },
  watch:{
    $route(to,from){
      this.mobnav = '2'
    }
  },
  methods: {
    changeMenu(item) {
      if (item == 'changePasswd') {
        this.$router.push('/password')
      } 
      if (item == 'person') {
        this.$router.push('/person')
      } 
      if (item == 'logout') {
        this.$post('/apis/logout').then(res => {
          this.$Message.success(res.data.msg)
          // 清除 localStorage 和 store
          localStorage.removeItem('user')
          this.$store.commit('increment', '')
        })
      }
    }
    // 获取所有分类
    // getClassify() {
    //   this.$get('/apis/article/classify').then(res => {
    //     console.log(res.data, 'classifys')
    //     this.classifys = res.data.data
    //   })
    // }
  }

}
</script>

<style>
/* 手机菜单 */
.nav-content .ivu-collapse-header{
  height: 60px !important;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 60px;
  position: absolute !important;
  right: 20px;
  top: -60px;
}

.nav-content .ivu-collapse-content{
  padding: 0 !important;
  border-radius: 0 !important;
  border-top: 1px solid #b0b9bb;
}
.nav-content .ivu-collapse-content>.ivu-collapse-content-box{
  padding: 0 !important;
}
</style>

<style scoped lang="stylus">
.header
  display: flex
  min-height: 60px
  background: #93a6ab
  color #fff
  position relative
  width 100%
  z-index: 10
  .nav
    display: flex
    justify-content: flex-end
    flex: 1
  // .logo
  //   width: 360px
  //   display: flex
  //   justify-content: center
  //   align-content: center
  //   img
  //     width: 200px

.header .menu
  width 1000px
  margin 0 auto
  display flex
  color #fff
  justify-content space-between
  font-size 14px
  padding: 0 10px
  // .left, .right
  //   width 40%
  .logo
    height 100%
    img
      height 100%
  div
    display flex
    align-items center
    a 
      color #fff
  .left li
    padding 0 15px

.register
  margin 0 10px

// 手机菜单
.nav-content
  z-index 11
  display none
  position: relative;
  background: transparent;
  border: 0 !important;
  span
    background: #fff;
    margin-bottom: 4px;
    display: table;
    width: 25px;
    height: 3px;
    border-radius: 18%;


.mobliNav-main
  width 100%
  background #93a6ab
  a
    display block
    color #fff
    font-size 14px
    padding 10px 20px
  a:hover
    color: #6289ad



.user
  .user-info
    display flex
    align-items center
  img
    width 40px
    height 40px
    margin-right 10px
    border-radius 50%
  .ivu-dropdown-item
    font-size 14px !important
    i 
      margin-right 10px

@media screen and (max-width: 750px)
  .header .menu
    display none
  .nav-content
    display block
</style>
