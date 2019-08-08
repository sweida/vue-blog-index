<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'user',
      'token',
    ])
  }, 
  created() {
    // 有token,没有user时才请求用户信息
    if (this.token){
      this.UserInfo()
    }

  },
  methods: {
    ...mapActions([
      'UserInfo',
    ]),
  }
}
</script>

<style lang="stylus">
html, body, #app
  height 100%
  min-height 550px
body
  margin 0
  padding 0

</style>
