<template>
  <div class="favore">
    <mu-card v-for="(item, index) in favorData" :key="index" @click="detail(item)">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      normline: sessionStorage.getItem('normline') || '',
      favorData: [],
    }
  },
  props: ['name', 'type'],
  created() {
    this.getDate()
  },
  watch: {
    $route(){
      this.getDate()
    }
  },
  methods: {
    // 所有数据
    getDate() {
      let params = {
        limit: 5,
        skip: Math.floor(Math.random() * 30 + 1)
      }
      this.$get(this.type, params).then(res => {
        console.log(res.data, '推荐')
        this.favorData = res.data.results
        // this.favorData.forEach(item => {
        //   if (item.image.substring(0, 4) != 'http') {
        //     item.image = sessionStorage.getItem('normline') + item.image
        //   }
        // })
      })
    },
    // 查看详情
    detail(item) {
      const loading = this.$loading();
      this.$router.push({
        path: `/detail/${this.type}/${item.id}`,
        query: {object: item, name: this.name}
      })
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
