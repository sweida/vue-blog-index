<template>
  <main>
    <header>基础设置</header>
    <section class="wrap scroll">
      <el-form v-model="webinfo" label-width="130px">
        <el-form-item label="网站标题">
          <el-input size="medium" v-model="webinfo.title"> </el-input>
        </el-form-item>
        <el-form-item label="网站关键词">
          <el-input size="medium" v-model="webinfo.keyword"> </el-input>
        </el-form-item>
        <el-form-item label="网站描述">
          <el-input size="medium" v-model="webinfo.description" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="备案号">
          <el-input size="medium" v-model="webinfo.icp"></el-input>
        </el-form-item>
        <el-form-item label="微信图片地址">
          <el-input size="medium" v-model="webinfo.weixin"></el-input>
        </el-form-item>
        <el-form-item label="支付宝图片地址">
          <el-input size="medium" v-model="webinfo.zhifubao"></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input size="medium" v-model="webinfo.qq"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input size="medium" v-model="webinfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input size="medium" v-model="webinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="Github地址">
          <el-input size="medium" v-model="webinfo.github"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input size="medium" v-model="webinfo.personinfo" type="textarea" :rows="3"></el-input>
        </el-form-item>
      </el-form>
    </section>
    <footer>
      <el-button type="primary" size="small" @click="submit">保　存</el-button>
    </footer>
  </main>
</template>

<script>

export default {
  data() {
    return {
      webinfo: {
        title: '',
        keyword: '',
        description: '',
        icp: '',
        weixin: '',
        zhifubao: '',
        description: '',
        weixin: '',
        zhifubao: '',
        personinfo: '',
      }
    }
  },
  created() {
    this.$get('apis/webinfo/read').then(res => {
      // console.log(res)
      this.webinfo = res.data.data
    })
  },
  methods: {
    submit() {
      this.$post('apis/webinfo/set', this.webinfo).then(res => {
        // console.log(res)
        if (res.data.status == 1){
          this.$message.success(res.data.msg)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>


<style scoped lang="stylus">
.el-form .el-input
  width 220px
.el-textarea
  width 500px
</style>