<template>
<div>
  <div class="header">
    <img src="../../assets/nav-map.jpg" class="footer-bg">

    <div class="menu">
      <div class="left">
        <div class="logo">
          <img src="../../assets/logo.png" alt="">
        </div>
        <!-- 菜单 -->
        <li v-for="(item, index) in nav" :key="index" :class="{active:$route.path==item.url}">
          <a @click="goRouter(item.url)">{{item.name}}</a>
        </li>
      </div>

      <div class="user" v-if="user">
        <Dropdown @on-click="changeMenu">
          <a href="javascript:void(0)" class="user-info">
            <img :src="user.avatar_url ? user.avatar_url : `https://avatars.dicebear.com/v2/identicon/id-${user.id}.svg`">
            {{user.name}}
            <Icon type="md-arrow-dropdown" />
          </a>
          <DropdownMenu slot="list">
            <DropdownItem name="person"><Icon type="md-person" />个人中心</DropdownItem>
            <DropdownItem name="admin" v-if="user.admin"><Icon type="logo-xbox" />后台管理</DropdownItem>
            <DropdownItem name="changePasswd"><Icon type="md-settings" />修改密码</DropdownItem>
            <DropdownItem name="logout"><Icon type="md-exit" />退出登录</DropdownItem>
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
  <div class="phone-logo">
    <img src="../../assets/logo.png" />
  </div>
  <Collapse simple v-model="mobnav" class="nav-content">
    <Panel name="1" hide-arrow>
      <span></span>
      <span></span>
      <span></span>
      <div class="mobliNav-main" slot="content">
        <img :src="$staticUrl + banners[4].url" class="nav-bg">
        <li v-for="(item, index) in nav" :key="index" :class="{active:$route.path==item.url}">
          <Icon :type="item.icon" />
          <a @click="goRouter(item.url)">{{item.name}}</a>
          <!-- <router-link :to="item.url">{{item.name}}</router-link> -->
        </li>

        <template v-if="user">
          <li>
            <img :src="user.avatar_url ? user.avatar_url : `https://avatars.dicebear.com/v2/identicon/id-${user.id}.svg`" class="user-img">
            {{user.name}}
            <Icon type="md-arrow-dropdown" />
          </li>
          <li class="second">
            <Icon type="md-person" />
            <router-link to="/person">个人中心</router-link>
          </li>
          <li class="second">
            <Icon type="md-settings" />
            <router-link to="/password">修改密码</router-link>
          </li>
          <li class="second">
            <Icon type="md-exit" />
            <a @click="changeMenu('logout')">退出登录</a>
          </li>
        </template>
        <template v-else>
          <li>
            <Icon type="logo-snapchat" />
            <router-link to="/login">登录</router-link>
          </li>
          <li>
            <Icon type="md-person-add" />
            <router-link to="/register">注册</router-link>
          </li>
        </template>
      </div>
    </Panel>
  </Collapse>


</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  data () {
    return {
      nav: [
        {name: '文章', url: '/blog', icon: 'ios-book'},
        {name: '友链', url: '/link', icon: 'logo-octocat'},
        {name: '打赏', url: '/donate', icon: 'logo-usd'},
        {name: '留言', url: '/message', icon: 'md-chatboxes'},
        {name: '关于我', url: '/about', icon: 'md-beer'},
      ],
      mobnav: '2'
    }
  },
  computed: {
    ...mapGetters([
      'user', 'classify', 'tag', 'banners'
    ]),
  },
  watch:{
    $route(to,from){
      this.mobnav = '2'
    }
  },
  methods: {
    ...mapActions(['Logout']),
    goRouter(item) {
      // 当有选择标签或者分类时点击博客自动选择
      if (item == '/blog') {
        if (this.classify && this.classify!='all') {
          this.$router.push({path:'/blog', query:{classify: this.classify}})
        } else if (this.tag) {
          this.$router.push({path:'/blog', query:{tag: this.tag}})
        } else {
          this.$router.push({path:'/blog'})
        }
      } else {
        this.$router.push({ path: item})
      }
    },
    changeMenu(item) {
      if (item == 'changePasswd') {
        this.$router.push('/password')
      } 
      if (item == 'person') {
        this.$router.push('/person')
      } 
      if (item == 'admin') {
        // window.href = "/manage.html/#/articlelist"
        // let routeData = this.$router.resolve({ path: '/manage.html/#/articlelist'});
        window.open('/manage.html#/articlelist', '_blank');
      }
      if (item == 'logout') {
        this.$post('/apis/logout').then(res => {
          this.$Notice.success({
            title: res.message,
            desc: '欢迎下次再来👏',
            duration: 3,
          });
          // this.$Message.success(res.message)
          this.$router.push('/')
          this.Logout()
        }).catch(() => {
          this.$router.push('/')
          this.Logout()
        })
      }
    }
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
  border-top: 1px solid #d8ddde;
}
.nav-content .ivu-collapse-content>.ivu-collapse-content-box{
  padding: 0 !important;
}
</style>

<style scoped lang="stylus">
.header
  display: flex
  min-height: 60px
  background-image: linear-gradient(167deg,#2b274b,#771787 49%,rgba(201,28,136,.91));
  color #fff
  position relative
  width 100%
  z-index: 10
  .nav
    display: flex
    justify-content: flex-end
    flex: 1
  .logo
    width 100px
    height 60px
    margin-right 20px
    img
      width 100%


.footer-bg, .nav-bg
  position: absolute;
  opacity: .25;
  height: 100%;
  width: 100%;
  object-fit: cover;
  mix-blend-mode: multiply;
.footer-bg
  width: 100%
.nav-bg
  top: 0
  display none

.header .menu
  z-index 20px
  position relative
  width 1000px
  margin 0 auto
  display flex
  color #fff
  justify-content space-between
  font-size 14px
  padding: 0 20px
  font-size 16px
  div
    display flex
    align-items center
    a 
      color #fff
  .left li
    padding 1px 15px
    margin 0 2px
  .left li.active
    background: #7c1879;
    border-radius: 3px;
  .left li a:hover
    border-bottom: 1px solid;
    // text-decoration 

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
    margin: 2.5px;
    display: table;
    width: 25px;
    height: 3px;
    border-radius: 18%;


.mobliNav-main
  width 100%
  position relative
  overflow hidden
  background-image: linear-gradient(167deg,#2b274b,#771787 49%,rgba(201,28,136,.91));
  li
    display flex
    position relative
    z-index 20
    align-items center
    padding 10px 20px
    color #fff
    .user-img
      width 20px
      border-radius 50%
      margin-right 8px
    i
      font-size 18px
      margin-right 10px
    a
      width: 100%
      color #fff
      font-size 14px
    a:hover
      color: #6289ad
  li.active
    background rgba(166, 37, 141, .4)
  .second
    padding-left 40px

.phone-logo
  display none

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
  .header 
    .footer-bg, .menu
      display none
  .nav-bg, .nav-content
    display block
  .phone-logo
    display block
    position: absolute;
    top: 9px;
    z-index: 20;
    width: 100px;
    left: 20px
    img
      width 100%
</style>
