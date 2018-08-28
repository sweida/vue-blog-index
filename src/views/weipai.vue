<template>
  <mu-container>
    <mu-alert color="info">
      <mu-icon left value="video_library" color="#fff"></mu-icon>视频分类：{{name}}
    </mu-alert>

    <mu-card v-for="(item, index) in listData" :key="index" @click="detail(item)">
      <mu-card-media >
        <img v-lazy="normline+item.image" :key="item.id">
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
      <mu-pagination raised :total="weipai.length" :page-size="pageSize" :current.sync="current" @change="handlpage"></mu-pagination>
    </mu-flex>
  </mu-container>
</template>

<script>
import weipai from '@/data/weipai/index.js'
export default {
  data () {
    return {
      name: '微拍福利',
      weipai: weipai,
      normline: sessionStorage.getItem('normline') || '',
      current: 1,
      pageSize: 10,
      listData: [],
      tip: true
    }
  },
  created() {
    // 是否提示
    if(sessionStorage.getItem('tip')) {
      this.tip = false
    }    
    // 默认路线
    if (this.normline=='') {
      this.$get('line').then(res => {
        sessionStorage.setItem('normline', res.data[0].address)
        this.normline = res.data[0].address
        this.current = Number(this.$route.query.page) || 1
        this.goPage()
      })
    } else {
      this.current = Number(this.$route.query.page) || 1
      this.goPage()
    }
  },
  beforeMount() {

  },
  watch: {
    $route(){
      this.current = Number(this.$route.query.page) || 1
      this.goPage()
    }
  },
  methods: {
    closeAlert () {
      this.tip = false
      sessionStorage.setItem('tip', false)
    },    
    detail(data) {
      const loading = this.$loading();
      this.$router.push({
        path: `/detail/${data.id}`,
        query: {type: this.name}

      })
      sessionStorage.setItem('data', JSON.stringify(data))
      setTimeout(() => {
        loading.close()
      }, 800)
    },
    // 获取分页数据
    goPage() {
      this.listData = this.weipai.slice( (this.current-1)*this.pageSize, this.current*this.pageSize)
    },
    // 点击分页
    handlpage() {
      this.$router.push({path: '/weipai', query: {page: this.current}})
      const loading = this.$loading();
      this.goPage()
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
