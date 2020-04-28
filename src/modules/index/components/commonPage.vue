<template>
  <section class="blog">
    <Headnav />
    <!-- 插槽 -->
    <slot name="content"></slot>
    <Footer />
  </section>
</template>

<script>
import Headnav from './headnav'
import Footer from './footer'

export default {
  components: {
    Footer,
    Headnav,
  },
  data() {
    return {}
  },
}
</script>

<style scoped lang="stylus"></style>
