<template>
  <div class="main flex">
    <TextLoading v-if="loading"></TextLoading>
    <div class="article" v-else>

      <div class="topTab" v-if="classify && classify!='all'">
        分类：{{classify}}
      </div>      
      <div class="topTab" v-if="tag">
        标签：{{tag}}
      </div>      
      <div class="topTab" v-if="timeline">
        归档：{{timeline}}
      </div>

      <!-- 新样式 -->
      <router-link :to="{path:`/blog/${item.id}`}" class="list animate03" v-for="(item, index) in articles" :key="index">
        <div class="img-box">
          <img :src="$baseUrl+item.img" class="footer-bg animate03">
        </div>
        <div class="bg"></div>
        <div class="classifybox">
          <div class="classify">{{item.classify}}</div>
        </div>
        <div class="list-main">
          <h4>{{item.created_at.substring(0,10)}}</h4>
          <h3>{{item.title}}</h3>
          <!-- 有标签才显示 -->
          <div class="tag-box" v-if="item.tag.length">
            <i class="iconfont lv-icon-biaoqian6"></i>
            <span v-for="(tagli, index) in item.tag" :key="index" :class="{active:tag==tagli}">
              {{tagli}}
            </span>
          </div>
          <div class="comment">
            <span><i class="iconfont lv-icon-huore"></i>{{item.clicks}}热度</span>
            <span><i class="iconfont lv-icon-xiaoxi3"></i>{{item.commentCount}}条评论</span>
          </div>
        </div>
      </router-link>

      <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></MyPage>
    </div>
    <common 
      :pageModel="pageModel"
      @getArticles="getArticles"
      @ArticlesOrderByClassify="ArticlesOrderByClassify" 
      @ArticlesOrderByTag="ArticlesOrderByTag" 
      @ArticlesOrderByTime="ArticlesOrderByTime">
    </common>
  </div>
</template>

<script>
import {mapState} from "vuex"
import common from '../common'

export default {
  components: {
    common
  },
  data() {
    return {
      show: true,
      loading: false,
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
    if (this.classify) {
      this.$route.query.classify = this.classify
      console.log(this.$route.query.classify, 7777)
    }
    console.log(this.$route, 44444)
    if (this.$route.query.tag) {
      console.log('tag')
      this.ArticlesOrderByTag()
    } else if (this.$route.query.classify) {
      console.log('classify')
      this.ArticlesOrderByClassify()
    } else if (this.$route.query.year) {
      console.log('year month')
      this.ArticlesOrderByTime()
    } else {
      console.log('all')
      this.getArticles()
    }
  },
  computed: {
    ...mapState([
        'classify', 'tag', 'timeline'
    ])
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('/apis/article/read', this.pageModel).then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.loading = false
          this.articles = res.data.data
          this.$store.commit('inclassify', 'all')
          this.$store.commit('intag', '')
          this.$store.commit('intimeline', '')
          this.pageModel.sumCount = res.data.total
        } else {
          this.$message.error('获取数据失败！')
          this.loading = false
        }
        
      })
    },
    selectRoleList() {
      if (this.$route.query.classify) {
        this.ArticlesOrderByClassify()
        console.log('请求分类分页')
      } else if (this.$route.query.tag) {
        this.ArticlesOrderByTag()
        console.log('请求标签分页')
      } else if (this.$route.query.year) {
        this.ArticlesOrderByTime()
        console.log('请求时间分页')
      } else {
        this.getArticles()
        console.log('请求正常分页')
      }
      window.scrollTo(0,0);
    },
    // 按标签获取
    ArticlesOrderByTag() {
      this.loading = true
      let param = {
        tag: this.$route.query.tag
      }
      this.$post('/apis/tag/read', Object.assign(param, this.pageModel)).then(res => {
        if (res.data.status == 1) {
          this.pageModel.sumCount = res.data.total
          this.articles = []
          res.data.data.forEach(item => {
            this.articles.push(item.article)
          })
          this.$store.commit('inclassify', '')
          this.$store.commit('intag', this.$route.query.tag)
          this.$store.commit('intimeline', '')
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
      this.$post('/apis/article/read', Object.assign(param, this.pageModel)).then(res => {
        console.log(res.data, 'class')
        if (res.data.status == 1) {
          // this.pageModel.sumCount = 0
          this.pageModel.sumCount = res.data.total
          this.articles = res.data.data
          this.$store.commit('inclassify', this.$route.query.classify)
          this.$store.commit('intag', '')
          this.$store.commit('intimeline', '')
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
      this.$post('/apis/article/times', Object.assign(param, this.pageModel)).then(res => {
        console.log(res.data, 'class')
        if (res.data.status == 1) {
          this.pageModel.sumCount = res.data.total
          this.articles = res.data.data
          this.$store.commit('inclassify', '')
          this.$store.commit('intag', '')
          this.$store.commit('intimeline', `${param.year}年${param.month}月`)
        } else {
          this.$message.error(res.data.msg)
        }
        this.loading = false
      })
    },

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
.topTab
  font-size 16px
  margin-bottom 20px
  padding 12px 20px
  box-shadow: 2px 2px 14px #c0dbe6

.typeTitle
  padding: 5px 15px 5px;
  margin-bottom: 17px;
  background: #ecf0f1
  font-size: 16px;

.article
  flex 1
  li
    margin: 0 0 20px 0;
    padding: 14px 25px;
    border-radius: 5px;
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
    color #fff
    font-size 12px
  i 
    margin-right 4px
    font-size 14px 
.desc
  margin 5px 0 10px
.tag-box
  line-height 24px
  font-size 14px
  color #fff
  span
    padding 0 4px
  i 
    font-size 12px 
  .tag
    display: inline-block;
    padding 2px 8px
    border-radius 3px
    background #e8e8e8
    margin 5px 5px   
  span.active
    color #ffed4a


// 新样式
.img-box
  overflow hidden
  width 100%
  height 100%
  position: relative;
  border-radius: 5px;
.list:hover
  box-shadow:1 1px 20px -6px rgba(0,0,0,.5)
  transition: transform .5s
.list:hover img
  transform: scale(1.1)
  transition: transform .6s
  // transform: translateY(-6px)

.list
  position relative
  display block
  border-radius 10px
  margin-bottom 20px
  height 250px
  font-size 14px
  .bg
    // background-color: #3F51B5
    // background-image: linear-gradient(167deg,#d93533,#c91c88 69%,#771787);
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
    height: 100%;
    border-radius: 5px;
  .list-main
    font-family: sans-serif;
    position absolute
    z-index 11
    bottom: 0;
    width: 100%;
    padding: 60px 20px 10px
    border-radius 0 0 5px 5px 
    background-image: linear-gradient(7deg,rgba(0,0,0,.8) 30%,transparent 70%);
    h3
      color #fff
      font-size 22px
      font-weight 400
      // font-family: cursive;
    h4
      font-size 16px
      color #ffed4a

  .classifybox
    position absolute
    left -8px
    top -8px
    width 100px
    height 100px
    overflow hidden
    z-index: 30;
  .classify
    width: 220px;
    left: -70px;
    top: 25px;
    text-align: center
    padding 4px 15px
    position relative
    color #fff
    font-weight 600
    background-image: linear-gradient(90deg,#23a6d5,#23d5ab);
    text-shadow: 0 1px 1px rgba(0,0,0,.2);
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    transform: rotate(-45deg);
  .classifybox:after, .classifybox:before
    position: absolute;
    z-index: -1;
    content: "";
    display: block;
    border: 4px solid #3d4852;
    border-top-color: transparent;
    border-left-color: transparent;

  .classifybox:before
    border-color: #2779bd;
    top: 0;
    right: 0;
  .classifybox:after
    border-color: #2779bd;
    bottom : 0;
    left: 0;
  // .classify:after
  //   content: "";      
  //   display: block;
  //   position: absolute;
  //   right: 0px;
  //   border-top: 8px solid #ead9cc;
  //   border-left: 0px solid transparent;
  //   border-right: 10px solid transparent;
  //   top: 28px;

@media screen and (max-width: 750px)
  #index .content .main 
    flex-direction: column
  .common
    margin-left 0px
    width 100%

  .list .list-main h4
    font-size 18px
    font-family: cursive;
  
</style>
