<template>
  <main>
    <mu-container>
      <h3>正在播放：{{video.title}}</h3>
      <p>视频分类：{{Name}}</p>
      <p>日期：{{video.creatDate}} <span class="Time">时长：{{video.longTime}}</span></p>
    </mu-container>
    <div class="video">
      <video controls="controls" :src="video.video" :poster="video.image" width="100%" height="100%" autoplay="autoplay"></video>
    </div>
    <mu-container>
      <mu-flex align-items="center" class="favorite">
        <mu-icon size="18" value="favorite" color="secondary"></mu-icon>
        猜你喜欢
      </mu-flex>

      <Card :name="Name" :type="type"></Card>
    </mu-container>
  </main>
</template>

<script>
import Card from '@/components/card'
export default {
  components: {
    Card
  },
  data () {
    return {
      video: {},
      type: this.$route.params.type,
      Name: this.$route.query.name,
    }
  },
  created() {
    console.log(this.$route.params, this.$route.query, 99)
    if (this.$route.query.object.video) {
      this.video = this.$route.query.object
    } else {
      this.getDetail()
    }
  },
  watch: {
    $route(){
      this.video = this.$route.query.object
    }
  },
  methods: {
    // 详情
    getDetail() {
      let params = {
        where: {"id": this.$route.params.id}
      }
      this.$get(this.type, params).then(res => {
        console.log(res, 22)
        this.video = res.data.results[0]
        // if (this.video.image.substring(0, 4) != 'http') {
        //   this.video.image = sessionStorage.getItem('normline') + this.video.image
        // }
      })
    },
    goroute(data) {
      this.$router.push({
        // name: 'detail',
        path: `/detail/${this.type}/${data.id}`,
        query: {object: data, name: this.name}
      })      
      // const loading = this.$loading();
      // this.$router.push({
      //   path: `/whmm/${data.id}`
      // })
      // this.video = data
      // sessionStorage.setItem('data', JSON.stringify(data))
      // setTimeout(() => {
      //   loading.close()
      // }, 800)
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
  margin: 5px 0 7px;
}
.Time{
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
