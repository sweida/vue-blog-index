<template>

  <mu-container>
    <mu-flex justify-content="center">
      <mu-paper :z-depth="1">

        <mu-grid-list class="gridlist-demo">
          <mu-sub-header>December</mu-sub-header>
          <mu-grid-tile v-for="(item, index) in whmm" :key="index">
            <img :src="item.image" >
            <span slot="title">{{item.title}}</span>
            <span>{{item.longTime}}</span>
            <span slot="subTitle">by <b>{{item.creatDate}}</b></span>
            <!-- <mu-button slot="action" icon>
              <mu-icon value="star_border"></mu-icon>
            </mu-button> -->
          </mu-grid-tile>
        </mu-grid-list>
      </mu-paper>
    </mu-flex>
  </mu-container>
</template>

<script>
import whmm from '@/data/whmm'
export default {
  data () {
    return {
      whmm: whmm
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
