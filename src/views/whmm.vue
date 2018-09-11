<template>
  <mu-container>
    <mu-alert color="info">
      <mu-icon left value="video_library" color="#fff"></mu-icon>
      视频分类：{{name}}（共{{page.total}}个视频）
    </mu-alert>
    <div class="videoType">
      快速分类：
      <mu-button :color="active=='all' ? 'secondary' : 'primary'" @click="allType">全部</mu-button>
      <mu-button :color="active=='vip' ? 'secondary' : 'primary'" @click="vipType">精品推荐</mu-button>
    </div>
    <mu-card v-for="(item, index) in listData" :key="index" @click="detail(item)">
      <mu-card-media >
        <img v-lazy="item.image" :key="item.id">
        <mu-badge class="longTime" :content="item.longTime" color="pinkA200"></mu-badge>
      </mu-card-media>
      <mu-card-text>
        <h3 class="listTitle">{{item.title}}</h3>
        <mu-flex align-items="center" class="creatTime">
          <mu-icon size="18" value="access_time"></mu-icon>
          {{item.creatDate}}
        </mu-flex>
      </mu-card-text>
    </mu-card>
    <!-- 分页 -->
    <mu-flex justify-content="center" style="margin: 32px 0;">
      <mu-pagination raised :total="page.total" :page-size="page.Size" :page-count=5 :current.sync="page.current" @change="handlpage"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      name: '网红主播',
      type: 'whmm',
      active: 'all',
      normline: sessionStorage.getItem('normline') || '',
      listData: [],
      page: {
        current: 1,
        Size: 10,
        total: 1
      }
    }
  },
  created() {
    this.page.current = Number(this.$route.query.page) || 1
    this.getDate()
  },
  watch: {
    $route(){
      if (this.active == 'all') {
        this.page.current = Number(this.$route.query.page) || 1
        this.getDate()
      } else if(this.active == 'vip') {
        this.page.current = Number(this.$route.query.page) || 1
        this.getVipData()
      }
    }
  },
  methods: {
    // 所有数据
    getDate() {
      let params = {
        limit: this.page.Size,
        count : 1,
        skip: (this.page.current - 1) * this.page.Size
      }
      this.$get(this.type, params).then(res => {
        this.listData = res.data.results
        this.page.total = res.data.count
        // this.listData.forEach(item => {
        //   if (item.image.substring(0, 4) != 'http') {
        //     item.image = sessionStorage.getItem('normline') + item.image
        //   }
        // })
      })
    },
    // 获取推荐列表
    getVipData() {
      let params = {
        count : 1,
        limit: this.page.Size,
        skip: (this.page.current - 1) * this.page.Size,
        where: {"vip": true}
      }
      this.$get(this.type, params).then(res => {
        this.listData = res.data.results
        this.page.total = res.data.count
        this.listData.forEach(item => {
          if (item.image.substring(0, 4) != 'http') {
            item.image = sessionStorage.getItem('normline') + item.image
          }
        })
      })
    },
    // 查看详情
    detail(data) {
      // const loading = this.$loading();
      this.$router.push({
        // name: 'detail',
        path: `/detail/${this.type}/${data.id}`,
        query: {object: data, name: this.name}
      })
      // sessionStorage.setItem('data', JSON.stringify(data))
      // setTimeout(() => {
      //   loading.close()
      // }, 800)
    },
    // 所有列表
    allType () {
      this.active = 'all'
      this.getDate()
    },
    // 精品推荐
    vipType () {
      this.page.current = 1
      this.active = 'vip'
      this.getVipData()
    },
    // 点击分页
    handlpage() {
      this.$router.push({path: '/listData', query: {page: this.page.current}})
      const loading = this.$loading();
      setTimeout(() => {
        loading.close()
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }, 1000)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mu-card{
  margin: 10px 0 15px;
  overflow: hidden;
}
.videoType{
  margin-top: 10px;
}
.longTime {
  position: absolute;
  right: 15px;
  bottom: 15px;
}
.listTitle{
  margin: 0 auto 3px;
}
.mu-card-media {
  min-height: 200px;
}
.mu-card-text{
  padding: 10px;
}
.mu-card-text i{
  margin-right: 5px;
}
.mu-circular-progress{
  margin: 25% 0 0 50%;
  transform: translateX(-18px)
}

.mu-alert{
  padding: 10px 16px;
}
.mu-scale-transition-enter-active,
.mu-scale-transition-leave-active {
  transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1), opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
  backface-visibility: hidden;
}
.mu-scale-transition-enter,
.mu-scale-transition-leave-active {
  transform: scale(0);
  opacity: 0;
}
</style>
