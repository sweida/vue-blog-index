<template>
  <div>
        <h5>基础信息</h5>
        <el-form ref="form" v-model="form" label-width="120px" label-position='left'>
          <el-form-item label="文章标题">
            <el-input size="medium" v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-input size="medium" v-model="form.classify"></el-input>
            <!-- <el-cascader placeholder="请选择类目名称" @change="handleItemChange" v-model="form.classify" change-on-select :options="menuList" :props="defaultProps" :clearable="true">
            </el-cascader> -->
          </el-form-item>
          <el-form-item label="标签">
            <el-input size="medium" v-model="form.tag" placeholder="多个标签用英文逗号隔开"></el-input>
          </el-form-item>
          <el-form-item label="浏览量">
            <el-input size="medium" type="number" v-model="form.clicks"></el-input>
          </el-form-item>
          <el-form-item label="点赞量">
            <el-input size="medium" type="number" v-model="form.like"></el-input>
          </el-form-item>
        </el-form>
        <mavon-editor v-model="form.content"/>

        <el-button type="primary" size="small" @click="addBtn">保存</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        classify: '',
        tag: '',
        clicks: '',
        like :''
      },
    }
  },
  created() {

  },
  methods: {
    addBtn() {
      this.$post('apis/article/add', this.form).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="stylus">


</style>