<template>
  <div>
    <div class="banner">
      <img :src="$staticUrl + banners[2].url" alt="">
      <div class="bg"></div>
      
      <div class="text-box">
        <p>这里是一群可爱的小伙伴们，欢迎交换友链 ٩(ˊᗜˋ*)و</p>
        <p>希望添加友链的小伙伴按这个格式写在留言区，我都会看的～</p>

        <div class="examp">
          <h4>格式示例</h4>
          <p>名称: 九歌</p>
          <p>链接: https://golang365.com</p>
          <p>头像: https://s.gravatar.com/avatar</p>
          <p>简介: 集颜值和技术于一身的程序猿</p>
        </div>

      </div>
    </div> 

    <!-- 友情连接 -->
    <div class="main">
      <h3>小伙伴们</h3>
      <MyLoading v-if="loading"></MyLoading>
      <Row :gutter="20" v-else>
        <Col :xs="24" :sm="12" :md="8" v-for="(item, index) in links" :key="index" class="animate03">
          <a :href="item.url" target="_blank" class="link-box animate03">
            <div class="imgbox">
              <img :src="item.img" v-if="item.img">
              <img src="../../../assets/avatar/link-img.jpg" v-else>
            </div>
            <div class="desc">
              <h4>{{item.title}}</h4>
              <p>{{item.desc}}</p>
            </div>
          </a>
        </Col>
      </Row>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
export default {
  data() {
    return {
      loading: true,
      links: [],
      pageModel: {
        page: 1,
        all: 1,
        sumCount: 100
      }
    }
  },
  computed: {
    ...mapGetters([
      'banners'
    ])
  }, 
  created() {
    this.getLink()
  },
  methods: {
    // 获取留言 all=1请求所有，不加的话请求的是有效期内的
    getLink() {
      this.$post('/apis/link/list', this.pageModel).then(res => {
        this.links = res.data.data
        this.loading = false
      }).catch(() => {})
    }
  }
}
</script>
<style scoped lang="stylus">
.main 
  margin: 40px auto
.banner .bg
  background: #8a8a8a;
.text-box
  max-width: 600px;
  position relative
  margin auto
  font-size 16px
  line-height 26px
.examp
  padding-top 15px
  text-align left
  width: 100%
  font-size: 14px
  line-height 22px
  h4
    line-height 30px
    font-size 16px
h3
  text-align center
  font-size 26px
  padding 5px 0


.ivu-row
  margin: 20px 0
  .ivu-col 
    position relative
    margin-bottom 35px

.link-box
  position relative
  display flex
  height 120px
  border 1px solid #dedede  
  background #fff
  padding 8px 20px
  display flex
  align-items: center
  z-index 10
  box-shadow: 2px -5px 15px #e8e8e8;
  .desc
    flex 1
    overflow: hidden
    color #475558
    font-size 14px
    h4
      margin 5px 0
    p
      height 62px
  .imgbox
    width 60px
    height 60px
    margin-right: 20px
    img
      border-radius 50%
      width 100%
      height: 100%
      object-fit: cover
.ivu-col:before
  content: "";      
  border: 0.5px solid #dedede;
  background: #fff;
  display: block;
  position: absolute;
  left: 14px;
  right 14px
  bottom: -4px;
  height: 5px;
  z-index 9
.ivu-col:after
  content: "";      
  border: 0.5px solid #dedede;
  background: #fff;
  display: block;
  position: absolute;
  right 18px
  left 18px
  bottom: -8px;
  height: 5px;
  box-shadow: 2px 2px 10px #e4e4e4;

.ivu-col:hover .link-box
  transform: translateY(15px)
  background: #ecf0f1;
.animate03
  transition: transform .26s


@media screen and (max-width: 750px)
  .banner
    height 320px
  .comment-box
    .comment
      flex: 0 0 48%    


@media screen and (max-width: 550px)
  .comment-box
    .comment
      flex: 0 0 100%   
</style>
