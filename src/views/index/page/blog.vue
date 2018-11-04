<template>
  <div class="flex">
    <div class="article">
      <div>
        <div v-if="$route.query.tag">
          <i class="iconfont lv-icon-biaoqian6"></i>
          {{$route.query.tag}}
        </div>

        <div v-if="$route.query.classify">
          <i class="iconfont lv-icon-wenjianjia"></i>
          {{$route.query.classify}}
        </div>

        <div v-if="$route.query.year">
          <i class="iconfont lv-icon-wenjianjia"></i>
          {{$route.query.year}}年{{$route.query.month}}月
        </div>


        <!-- 新样式 -->
        <router-link :to="{path:`/blog/${item.id}`}" class="list" v-for="(item, index) in articles" :key="index">
          <img src="../../../assets/big-map.jpg" class="footer-bg">
          <div class="bg"></div>
          <div class="classify">{{item.classify}}</div>
          <div class="list-main">
            <h4>{{item.created_at.substring(0,10)}}</h4>
            <h3>{{item.title}}</h3>
          </div>
        </router-link>


        <!-- 旧样式 -->
        <li v-for="(item, index) in articles" :key="index">
          <div class="created"><i class="iconfont lv-icon-shijian3"></i>发布于{{item.created_at.substring(0,10)}}</div>
          <router-link :to="{path:`/blog/${item.id}`}" class="title">{{item.title}}</router-link>
          <div class="comment">
            <span><i class="iconfont lv-icon-huore"></i>{{item.clicks}}热度</span>
            <span><i class="iconfont lv-icon-xiaoxi3"></i>{{item.commentCount}}条评论</span>
            <span><i class="iconfont lv-icon-wenjianjia"></i>{{item.classify}}</span>
          </div>
          
          <div class="desc">
            这是摘要这是摘要这是摘要这是摘要这是摘要
            这是摘要这是摘要这是摘要这是摘要这是摘要
            这是摘要这是摘要这是摘要这是摘要这是摘要
            {{item.desc}}
          </div>

          <div class="tag-box">
            <router-link class="tag" :to="{name: 'blog', query: { tag: tag }}" v-for="(tag,index) in item.tag" :key="index" :class="{active:$route.query.tag==tag}">
              <i class="iconfont lv-icon-biaoqian6"></i>
              {{tag}}
            </router-link>
          </div>
        </li>
      </div>
      <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
    </div>
    <common></common>
  </div>
</template>

<script>
import common from '../common'
import page from '@/components/page'

export default {
  components: {
    common,
    page
  },
  data() {
    return {
      show: true,
      loading: true,
      checked: true,
      articles: [],
      timeLine: [],
      tags: [],
      classifys: [],
      pageModel: {
        page: 1,
        sumCount: 10
      }
    }
  },
  created() {
    // this.getTimes()
    // this.getTags()
    // this.getClassify() 

    console.log(this.$route.query.tag, 44)
    if (this.$route.query.tag) {
      console.log(1)
      this.ArticlesOrderByTag()
    } else if (this.$route.query.classify) {
      console.log(2)
      this.ArticlesOrderByClassify()
    } else if (this.$route.query.year) {
      console.log('year month')
      this.ArticlesOrderByTime()
    } else {
      console.log(3)
      this.getArticles()
    }
  },
  watch:{
    $route(to,from){
      if (this.$route.query.tag) {
        console.log(1)
        this.ArticlesOrderByTag()
      } else if (this.$route.query.classify) {
        console.log(2)
        this.ArticlesOrderByClassify()
      } else if (this.$route.query.year) {
        console.log('year month')
        this.ArticlesOrderByTime()
      } else {
        console.log(3)
        this.getArticles()
      }
    }
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('/apis/article/read', this.pageModel).then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.articles = res.data.data
          this.pageModel.sumCount = res.data.total
        } else {
          this.$message.error('获取数据失败！')
        }
        this.loading = false
      })
    },
    selectRoleList() {
      this.getArticles()
    },
    // 按标签获取
    ArticlesOrderByTag() {
      this.loading = true
      let param = {
        tag: this.$route.query.tag
      }
      this.$post('/apis/tag/read', param).then(res => {
        if (res.data.status == 1) {
          this.articles = []
          res.data.data.forEach(item => {
            this.articles.push(item.article)
          })
          console.log(this.articles, param)
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
      })
    },
    // 按分类获取
    ArticlesOrderByClassify() {
      this.loading = true
      let param = {
        classify: this.$route.query.classify
      }
      this.$post('/apis/article/read', param).then(res => {
        console.log(res.data, 'class')
        if (res.data.status == 1) {
          this.articles = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
      })
    },
    // 按时间线
    ArticlesOrderByTime() {
      this.loading = true
      let param = {
        year: this.$route.query.year,
        month: this.$route.query.month
      }
      this.$post('/apis/article/times', param).then(res => {
        console.log(res.data, 'class')
        if (res.data.status == 1) {
          this.articles = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
      })
    },
    // 获取时间线
    getTimes() {
      this.$get('/apis/article/times').then(res => {
        console.log(res.data, 'times')
        this.timeLine = res.data.data
      })
    },
    // 获取所有标签
    getTags() {
      this.$get('/apis/tag/read').then(res => {
        console.log(res.data, 'tags')
        this.tags = res.data.data
      })
    },
    goTag(item) {
      this.$router.query({tag: item})
    },
    // 获取所有分类
    getClassify() {
      this.$get('/apis/article/classify').then(res => {
        console.log(res.data, 'classifys')
        this.classifys = res.data.data
      })
    }
  }
}
</script>

<style lang="stylus">
// markmown样式
.article 
  .v-note-wrapper .v-note-panel
    border none !important
  .v-show-content
    background #fff !important
</style>
<style scoped lang="stylus">
.article, a 
    font-family: 'Source Han Serif SC','Source Han Serif','source-han-serif-sc','PT Serif','SongTi SC','MicroSoft Yahei',Georgia,serif;
    color #34495e


.article
  flex 1
  li
    margin: 0 0 20px 0;
    padding: 14px 25px;
    border-radius: 8px;
    box-shadow: 2px 2px 14px #c0dbe6

.created
  color #888
  font-size 12px
  i
    color #959595
    margin-right 4px
    font-size 14px
.title
  color #34495e
  line-height 30px
  font-size 18px
.comment
  line-height 30px
  span
    margin-right 20px
    color #888
    font-size 12px
  i 
    margin-right 4px
    font-size 14px 
.desc
  margin 5px 0 10px
.tag-box
  line-height 24px
  font-size 14px
  i 
    font-size 12px 
  .tag
    display: inline-block;
    padding 2px 8px
    border-radius 3px
    background #e8e8e8
    margin 5px 10px 0 0   
  .tag.active
    background #fd668e


// 新样式
.list
  position relative
  display block
  border-radius 10px
  margin-bottom 20px
  height 250px
  font-size 14px
  .bg
    // background #5b3b86
    background-image: linear-gradient(167deg,#d93533,#c91c88 69%,#771787);
    z-index 10
    opacity .5
    mix-blend-mode: screen;
    border-radius 5px
    position absolute
    top 0
    width 100%
    height 100%
  img
    width 100%
    position absolute
    top 0
    object-fit: cover;
    max-height: 100%;
    border-radius: 5px;
  .list-main
    position absolute
    z-index 1
    bottom: 0;
    width: 100%;
    padding: 50px 20px 20px
    border-radius 0 0 5px 5px 
    background-image: linear-gradient(7deg,rgba(0,0,0,.75) 30%,transparent 65%);
    h3
      color #fff
      font-size 22px
    h4
      font-family: cursive;
      font-size 18px
      color #ffed4a
  .classify
    position absolute
    padding 4px 10px
    right -10px
    top 12px
    z-index: 30;
    background #ead9cc
    color #3d4852

@media screen and (max-width: 750px)
  #index .content .main 
    flex-direction: column
  .common
    margin-left 0px
    width 100%
</style>
