<template>
  <main>
    <header>{{title}} - {{form.id}}</header>
    <section class="wrap scroll">
      <el-form ref="form" v-model="form" label-width="70px" label-position='left'>

        <el-form-item label="文章标题">
          <el-input size="medium" v-model="form.title" class="input_title"></el-input>
        </el-form-item>

        <el-row type="flex">
          <el-form-item label="所属分类">
            <el-input size="medium" v-model="form.classify"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input size="medium" v-model="form.tag" placeholder="多个标签用英文逗号隔开"></el-input>
          </el-form-item>
          <!-- <el-form-item label="是否下架">
            <el-switch v-model="form.deleted_at" ></el-switch>
          </el-form-item> -->
        </el-row>

        <el-row type="flex">
          <el-form-item label="创建日期">
            <el-date-picker
              v-model="form.created_at"
              value-format="yyyy-MM-dd"
              type="date"
              size="medium"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="浏览量">
            <el-input-number size="medium" v-model="form.clicks" :precision="0" :min="0" :controls="false"></el-input-number>
          </el-form-item>
          <el-form-item label="点赞量">
            <el-input-number size="medium" v-model="form.like" :precision="0" :min="0" :controls="false"></el-input-number>
          </el-form-item>
        </el-row>
      </el-form>
      <mavon-editor v-model="form.content" class="makedown"/>
    </section>
    <footer>
      <el-button type="primary" size="small" @click="addBtn" v-if="!$route.params.id">保　存</el-button>
      <el-button type="info" size="small" @click="editBtn" v-else>保存修改</el-button>
    </footer>
  </main>
</template>

<script>

export default {
  data() {
    return {
      title: '写博客',
      form: {
        title: '',
        content: '',
        classify: '',
        tag: '',
        clicks: '',
        like :'',
        deleted_at: false,
        created_at: new Date()
      }
    }
  },
  created() {
    if (this.$route.params.id) {
      this.getArticle()
    }
  },
  watch:{
    $route(to,from){
      this.form =  {
        title: '',
        content: '',
        classify: '',
        tag: '',
        clicks: '',
        like :'',
        deleted_at: false,
        created_at: new Date()
      }
    }
  },
  methods: {
    addBtn() {
      this.$post('apis/article/add', this.form).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.$message.success('新增文章成功！')
          this.$router.push('/admin/articlelist')
        } else {
          this.$message.error('保存失败！')
        }
      })
    },
    getArticle() {
      this.$post('apis/article/read', this.$route.params).then(res => {
        console.log(res.data.data)
        this.form = res.data.data
        this.form.tag = res.data.data.tag.join(',')
      })
    },
    editBtn() {
      this.$post('apis/article/change', this.form).then(res => {
        console.log(res)
        if (res.data.status == 1) {
          this.$message.success('保存成功！')
          this.$router.push('/admin/articlelist')
        } else {
          this.$message.error('保存失败！')
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.el-form .el-input
  width 220px
.input_title
  width 380px !important
.el-form-item
  margin-bottom: 12px
  margin-right: 80px;
.el-input-number--medium
  width 100px
.makedown
  min-height: 355px;
</style>