<template>
  <main>
    <!-- <header>{{title}} - {{form.id}}</header> -->
    <section class="wrap scroll">
      <el-form ref="form" v-model="form" label-width="70px" label-position='left'>

        <el-form-item label="文章标题">
          <el-input size="medium" v-model="form.title" class="input_title"></el-input>
        </el-form-item>
        <el-form-item label="摘要">
          <el-input size="medium" v-model="form.desc" class="input_title"></el-input>
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
      <!-- @imgAdd="$imgAdd" @imgDel="$imgDel" -->
      <mavon-editor v-model="form.content" class="makedown" />
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
        desc: '',
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
        desc: '',
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
          this.$message.error(res.data.msg)
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
          this.$message.success(res.data.msg)
          this.$router.push('/admin/articlelist')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    // 绑定@imgAdd event 上传图片
    $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        axios({
            url: 'server url',
            method: 'post',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
            /**
           * $vm 指为mavonEditor实例，可以通过如下两种方式获取
           * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
           * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
           */
            $vm.$img2Url(pos, url);
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