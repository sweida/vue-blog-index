<template>


  <mu-container>
    <!-- <mu-flex justify-content="center"> -->
      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <!-- <mu-card-header title="Myron Avatar" sub-title="sub title">
          <mu-avatar slot="avatar">
            <img src="../../assets/images/uicon.jpg">
          </mu-avatar>
        </mu-card-header> -->
        <mu-card-media title="Image Title" sub-title="Image Sub Title">
          <img src="../assets/sun.jpg">
        </mu-card-media>
        <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>
      </mu-card>

      <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
        <!-- <mu-card-header title="Myron Avatar" sub-title="sub title">
          <mu-avatar slot="avatar">
            <img src="../../assets/images/uicon.jpg">
          </mu-avatar>
        </mu-card-header> -->
        <mu-card-media title="Image Title" sub-title="Image Sub Title">
          <img src="../assets/sun.jpg">
        </mu-card-media>
        <mu-card-title title="Content Title" sub-title="Content Title"></mu-card-title>
        <mu-card-text>
          散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
          调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
          似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
          找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
        </mu-card-text>
      </mu-card>
      <!-- <mu-paper :z-depth="1">
        <mu-grid-list class="gridlist-demo">
          <mu-sub-header>December</mu-sub-header>
          <mu-grid-tile v-for="(item, index) in whmm" :key="index">
            <img :src="item.image" >
            <span slot="title">{{item.title}}</span>
            <span slot="subTitle">by <b>{{item.creatDate}}</b></span>
            <mu-button slot="action" icon>
              <mu-icon value="star_border"></mu-icon>
            </mu-button>
          </mu-grid-tile>
        </mu-grid-list>
      </mu-paper> -->
    <!-- </mu-flex> -->
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
