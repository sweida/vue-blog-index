<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'app',
  created() {
    this.$Loading.config({
      color: '#fff',
      failedColor: '#000',
      height: 50
  });
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
