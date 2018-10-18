<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>
      If Element is successfully added to this project, you'll see an
      <code v-text="'<el-button>'"></code>
      below
    </p>
    <el-button>el-button</el-button>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    HelloWorld
  },
  created() {
    // this.$Http.get('login?username=佟丽娅&password=123456')
    // this.$Http.get('http://127.0.0.1:8888/api/login', {
    //   username: '佟丽娅',
    //   password: '123456'
    // })
    this.$Http.get('apis/user/read?user_id=1')
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  methods: {

  }
}
</script>
