<template>
  <mu-appbar color="primary" class="mu-header">
    <mu-button icon slot="left" @click="gohome">
      <mu-icon value="home" ></mu-icon>
    </mu-button>
    <mu-menu slot="right">
      <mu-button flat>{{'路线'+normid}}</mu-button>
      <mu-list slot="content">
        <mu-list-item button v-for="(item, index) in line" :key="index" @click="changeLine(index)">
          <mu-list-item-content>
            <mu-list-item-title>{{item.name}}</mu-list-item-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </mu-appbar>
</template>

<script>
export default {
  data () {
    return {
      line: [],
      normLine: sessionStorage.getItem("normline") || '',
      normid: sessionStorage.getItem("normid") || '1'
    }
  },
  created() {
    // 路线
    const loading = this.$loading();
    this.$get('line').then(res => {
      this.line = res.data
      if(this.normLine=='') {
        sessionStorage.setItem('normline', res.data[0].address)
        sessionStorage.setItem('normid', res.data[0].id)
      }
      loading.close()
    })    
  },
  methods: {
    gohome() {
      this.$router.push({path: '/'})
    },
    changeLine(index) {
      sessionStorage.setItem('normline', this.line[index].address)
      sessionStorage.setItem('normid', this.line[index].id)
      this.normLine =  this.line[index].name
      location.reload()
    }
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
