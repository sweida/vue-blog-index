<template>
  <div>
    <mu-appbar color="primary" class="mu-header">
      <mu-button icon slot="left" @click="open = !open">
        <mu-icon value="menu" ></mu-icon>
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

    <mu-drawer :open.sync="open" :docked="false">
      <mu-list>
        <mu-list-item button v-for="(item, index) in menu" :key="index"  @click="goMenu(item.url)">
          <mu-list-item-action>
            <mu-icon :value="item.icon || 'grade'" color="pink"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{item.name}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>

</template>

<script>
export default {
  data () {
    return {
      line: [],
      open: false,
      normLine: sessionStorage.getItem("normline") || '',
      normid: sessionStorage.getItem("normid") || '1',
      menu: [
        {
          name: '首页',
          url: 'index',
          icon: 'home'
        },
        {
          name: '网红主播',
          url: 'whmm',
          icon: 'library_music'
        },
        {
          name: '国产精品',
          url: 'guochan',
          icon: 'live_tv'
        },
        {
          name: '微拍福利',
          url: 'weipai',
          icon: 'videocam'
        },
        {
          name: '嫩模写真',
          url: 'nenmo',
          icon: 'collections'
        },
        {
          name: '91大神',
          url: 'porn91',
          icon: 'movie_filter'
        },
        {
          name: '丝袜诱惑',
          url: 'siwa',
          icon: 'hot_tub'
        },
        {
          name: '韩国主播',
          url: 'hanguo',
          icon: 'music_video'
        },
        {
          name: '嫖客日记',
          url: 'riji',
          icon: 'book'
        },
        {
          name: '两性综艺',
          url: 'zongyi',
          icon: 'touch_app'
        },
        {
          name: '三级片',
          url: 'sanjipian',
          icon: 'receipt'
        }
      ],
    }
  },
  created() {
    // 路线
    const loading = this.$loading();
    this.$get('line').then(res => {
      // console.log(res, 333)
      this.line = res.data.results
      if(this.normLine=='') {
        sessionStorage.setItem('normline', res.data.results[0].address)
        sessionStorage.setItem('normid', res.data.results[0].id)
      }
      loading.close()
    })
  },
  methods: {
    gohome() {
      this.$router.push({path: '/'})
    },
    goMenu(menu) {
      this.$router.push({name: menu})
      this.open = false
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
