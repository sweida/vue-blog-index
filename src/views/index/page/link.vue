<template>
  <div >
    <!-- 友情连接 -->
      <div>
        <p>这里是一群可爱的小伙伴们，欢迎交换友链 ٩(ˊᗜˋ*)و</p>
        <p>希望添加友链的小伙伴按这个格式写在留言区，我都会看的～</p>

        <p>Name: 马里奥</p>
        <p>Url: https://minemine.cc</p>
        <p>Avatar: https://s.gravatar.com/avatar</p>
        <p>desc: 鲁迅：好好学习，天天向上</p>
      </div>

      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in links">
          <a :href="item.href" target="_blank" class="link-box">
            <div class="desc">
              <h4>{{item.title}}</h4>
              <p>{{item.desc}}</p>
            </div>
            <div class="imgbox">
              <img src="../../../assets/avatar/010.jpg" alt="">
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



.el-row {
  margin-bottom: 20px;
  height 100px
  // &:last-child {
  //   margin-bottom: 0;
  // }
}
.el-col 
  height 90px
  margin-bottom 2%

.link-box
  display flex
  border 1px solid #ddd  
  border-radius: 4px
  padding 8px 20px
  display flex
  align-items: center
  .desc
    flex 1
    overflow: hidden
    h4
      margin 5px 0
    p
      overflow:hidden
      text-overflow:ellipsis
      white-space:nowrap
  .imgbox
    width 60px
    height 60px
    img
      border-radius 50%
      width 100%




@media screen and (max-width: 750px)
  .comment-box
    .comment
      flex: 0 0 48%    


@media screen and (max-width: 550px)
  .comment-box
    .comment
      flex: 0 0 100%   
</style>
