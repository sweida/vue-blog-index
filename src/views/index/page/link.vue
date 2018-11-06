<template>
  <div class="backg">
    <!-- 友情连接 -->
      <div class="text">
        <p>这里是一群可爱的小伙伴们，欢迎交换友链 ٩(ˊᗜˋ*)و</p>
        <p>希望添加友链的小伙伴按这个格式写在留言区，我都会看的～</p>

        <h4>格式示例</h4>
        <p>名称: 马里奥</p>
        <p>链接: https://minemine.cc</p>
        <p>头像: https://s.gravatar.com/avatar</p>
        <p>简介: 集颜值和技术于一身的程序猿</p>
      </div>

      <h3>小伙伴们</h3>
      <MyLoading v-if="loading"></MyLoading>
      <el-row :gutter="20" v-else>
        <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in links" :key="index" class="animate03">
          <a :href="item.href" target="_blank" class="link-box animate03">
            <div class="imgbox">
              <img src="../../../assets/avatar/010.jpg" alt="">
            </div>
            <div class="desc">
              <h4>{{item.title}}</h4>
              <p>{{item.desc}}</p>
            </div>
          </a>

        </el-col>
      </el-row>

  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      links: []
    }
  },
  created() {
    this.getLink()
  },
  methods: {
    // 获取留言
    getLink() {
      this.$get('/apis/link/read?all=1').then(res => {
        console.log(res.data, 'link')
        this.links = res.data.data
        this.loading = false
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.comment-box
  display flex
  flex-wrap: wrap
  justify-content space-between
  .comment
    flex: 0 0 32%   
    // width 260px
    height 200px
    padding 20px
    box-sizing border-box
    line-height 24px
    border 1px solid #ddd
    border-radius 4px
    margin 2% 0

.backg
  background #fff
  padding 20px
  box-sizing border-box
  box-shadow: 2px 2px 15px #d9ddde
  h3
    font-size 20px
    text-align center

.text
  font-size 14px
  border-left: 3px solid #c3d0d4;
  padding-left: 10px;
  margin-bottom 20px
  h4
    font-size 16px
    padding 10px 0 4px



.el-row 
  margin: 20px 0
  .el-col 
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
.el-col:before
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
.el-col:after
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

.el-col:hover .link-box
  transform: translateY(15px)
  background: #ecf0f1;
.animate03
  transition: transform .26s


@media screen and (max-width: 750px)
  .comment-box
    .comment
      flex: 0 0 48%    


@media screen and (max-width: 550px)
  .comment-box
    .comment
      flex: 0 0 100%   
</style>
