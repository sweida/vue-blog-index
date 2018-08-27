<template>
    <mu-card v-for="(item, index) in listData" :key="index" @click="goroute(item)">
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
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    // 查看详情
    goroute(data) {
      const loading = this.$loading();
      this.$router.push({
        path: `/whmm/${data.id}`
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
.mu-header {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 101;
  overflow: hidden;
}

</style>
