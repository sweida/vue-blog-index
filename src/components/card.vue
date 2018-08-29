<template>
  <div class="favore">
    <mu-card v-for="(item, index) in favorData" :key="index" @click="detail(item)">
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
  </div>
</template>

<script>
import whmm from '@/data/whmm/index'
export default {
  data () {
    return {
      whmm: whmm,
      normline: sessionStorage.getItem('normline') || '',
      favorData: [],
    }
  },
  created() {
    // 猜你喜欢
    let newlist = this.whmm.slice()
    const shuffle = newlist.sort(
      () => Math.random() - 0.5
    )
    this.favorData = shuffle.slice(0, 3)
  },
  watch: {
    $route(){
      let newlist = this.whmm.slice()
      const shuffle = newlist.sort(
        () => Math.random() - 0.5
      )
      this.favorData = shuffle.slice(0, 3)
    }
  },
  methods: {
    // 查看详情
    detail(data) {
      const loading = this.$loading();
      this.$router.push({
        path: `/detail/${data.id}`,
        query: {type: '网红主播'}
      })
      sessionStorage.setItem('data', JSON.stringify(data))
      setTimeout(() => {
        loading.close()
      }, 800)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.favore{
  margin-bottom: 40px;
}
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
</style>
