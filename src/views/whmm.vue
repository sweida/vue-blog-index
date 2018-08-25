<template>
  <main>
    <mu-container>
      <h3>正常播放：{{video.title}}</h3>
      <p>日期：{{video.creatDate}} <span class="longTime">时长：{{video.longTime}}</span></p>
    </mu-container>
    <div class="video">
      <video controls="controls" :src="video.video" :poster="video.image" width="100%" height="100%" autoplay="autoplay"></video>
    </div>
    <mu-container>
      <mu-flex align-items="center" class="favorite">
        <mu-icon size="18" value="favorite" color="secondary"></mu-icon>
        猜你喜欢
      </mu-flex>

      <mu-card v-for="(item, index) in favorData" :key="index" @click="goroute(item)">
        <mu-card-media >
          <img :src="item.image">
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
    </mu-container>
  </main>
</template>

<script>
import whmm from '@/data/whmm'
export default {
  data () {
    return {
      video: '',
      whmm: whmm,
      favorData: []
    }
  },
  created() {
    // 重定向到首页
    let vdata = JSON.parse(sessionStorage.getItem("data"))
    if(vdata) {
      this.video = vdata
    } else {
      this.$router.push({path: '/'})
    }
    // 猜你喜欢
    this.favorter()
  },
  watch: {
    $route(){
      this.favorter()
    }
  },
  methods: {
    // 猜你喜欢
    favorter() {
      const shuffle = this.whmm.sort(
        () => Math.random() - 0.5
      )
      this.favorData = shuffle.slice(0, 3)
    },
    goroute(data) {
      const loading = this.$loading();
      this.$router.push({
        path: `/whmm/${data.id}`
      })
      this.video = data
      sessionStorage.setItem('data', JSON.stringify(data))
      setTimeout(() => {
        loading.close()
      }, 800)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  margin: 3px 0;
}
p{
  color: #666;
  margin: 3px 0 10px;
}
.longTime{
  margin-left: 30px;
}
.video{
  width: 100%;
  height: 240px;
  background: #000;
  margin-bottom: 30px;
}
.favorite i{
  margin-right: 5px;
}

/* 卡片 */
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
.mu-card-text{
  padding: 10px;
}
.mu-card-text i{
  margin-right: 5px;
}
</style>
