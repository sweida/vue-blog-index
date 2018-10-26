<template>
  <div >
    <!-- 友情连接 -->
        <!-- 评论列表 -->
        <div>
          <li class="comment" v-for="(item, index) in links">
            <div>{{item.title}}</div>
            <div>{{item.href}}</div>
            <div>{{item.desc}}</div>
          </li>
        </div>


  </div>
</template>

<script>

export default {
  data() {
    return {
      links: [],
      messageList: [],
      message:{
        content: '',
        username: ''
      }
    }
  },
  created() {
    this.getLink()
  },
  methods: {
    // 获取留言
    getLink() {
      this.$get('apis/link/read?all=1').then(res => {
        console.log(res.data, 'link')
        this.links = res.data.data
      })
    }
  }
}
</script>
<style scoped lang="stylus">

li
  margin-bottom 10px


</style>
