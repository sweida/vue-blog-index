<template>
  <div class="center">
    <img src="./assets/404.png" @click="goIndex">
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goIndex() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>

<style lang='stylus'>
.center
  height 100%
  max-width 800px
  margin auto
  display flex
  justify-content center
  align-items center
  padding 20px
  box-sizing: border-box;
  img 
    width 100%
    cursor:pointer
</style>
