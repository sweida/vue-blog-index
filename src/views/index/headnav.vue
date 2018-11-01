<template>
  <div class="header">
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
          <a href="javascript:void(0)">
            {{user}}
            <Icon type="ios-arrow-down"></Icon>
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
</template>

<script>
import {mapState} from "vuex"

export default {
  data () {
    return {
    }
  },
  computed: mapState({
    user:state=>state.user
  }),
  created() {
    // console.log(, 22)
    // this.getClassify()
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

<style scoped lang="stylus">
.header
  display: flex
  height: 60px
  background: #93a6ab
  color #fff
  position fixed
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

.user
  .ivu-dropdown-item
    font-size 14px !important
    i 
      margin-right 10px

</style>
