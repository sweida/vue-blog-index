<template>
  <main>
    <section class="wrap scroll" v-loading="articleLoading">

      <el-form ref="form" v-model="form" label-width="70px" label-position='left'>

        <div class="leftbox">
          <el-form-item label="文章标题">
            <el-input size="small" v-model="form.title" class="input_title"></el-input>
          </el-form-item>
          <!-- <el-form-item label="摘要">
            <el-input size="small" v-model="form.desc" class="input_title"></el-input>
          </el-form-item> -->
          <el-row type="flex">
            <el-form-item label="所属分类">
              <el-input size="small" v-model="form.classify"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-input size="small" v-model="form.tags" placeholder="多个标签用英文逗号隔开"></el-input>
            </el-form-item>
          </el-row>

          <el-row type="flex">
            <el-form-item label="创建日期">
              <el-date-picker
                v-model="form.created_at"
                value-format="yyyy-MM-dd"
                type="date"
                size="small"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="浏览量">
              <el-input-number size="small" v-model="form.clicks" :precision="0" :min="0" :controls="false"></el-input-number>
            </el-form-item>
            <el-form-item label="点赞量">
              <el-input-number size="small" v-model="form.like" :precision="0" :min="0" :controls="false"></el-input-number>
            </el-form-item>
          </el-row>
        </div>
        <div class="rightbox">
          <el-form-item label="文章封面" >
            <el-upload
              class="avatar-uploader"
              action="/apis/image/upload"
              name="image"
              :headers='headers'
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="blogBanner" :src="blogBanner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <!-- @imgAdd="$imgAdd" @imgDel="$imgDel" -->
      <mavon-editor ref=md @imgAdd="$imgAdd" v-model="form.content" class="makedown" />
    </section>
    <footer>
      <el-button type="primary" size="small" @click="addBtn" :loading="loading" v-if="!$route.params.id">保　存</el-button>
      <el-button type="info" size="small" @click="editBtn" :loading="loading" v-else>保存修改</el-button>
    </footer>
  </main>
</template>

<script>
import Axios from 'axios'
import {mapActions, mapGetters} from "vuex"

export default {
  data() {
    return {
      title: '写博客',
      blogBanner: '',
      loading: false,
      articleLoading: false,
      form: {
        title: '',
        desc: '',
        img: '',
        content: '',
        classify: '',
        tags: '',
        clicks: '',
        like :'',
        deleted_at: false,
        created_at: new Date()
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ]),
    headers() {
      return {
        'Authorization': 'Bearer ' + this.token,
        'X-Requested-With': 'XMLHttpRequest' 
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
      this.blogBanner = '',
      this.form =  {
        title: '',
        desc: '',
        img: '',
        content: '',
        classify: '',
        tag: '',
        clicks: '',
        like :'',
        deleted_at: false,
        created_at: new Date()
      }
    },
  },
  methods: {
    addBtn() {
      this.loading = true
      this.$post('/apis/article/add', this.form).then(res => {
        this.$message.success(res.message)
        this.$router.push('/articlelist')
      })
    },
    getArticle() {
      this.articleLoading = true
      let params = {
        id: this.$route.params.id,
        all: 1
      }
      this.$post('/apis/article', params).then(res => {
        console.log(res.data)
        this.articleLoading = false
        this.form = res.data
        this.form.tags = res.data.tags.join(',')
        if (this.form.img) {
          this.blogBanner = this.$staticUrl+this.form.img
        }
      })
    },
    editBtn() {
      this.loading = true
      this.$post('/apis/article/edit', this.form).then(res => {
        this.$message.success(res.message)
        this.$router.push('/articlelist')
      })
    },
    // 上传图片，获取图片地址
    handleAvatarSuccess(res, file) {
      // 如果已经有图片则先删除图片
      if (this.form.img) {
        this.handleRemove()
      }

      this.blogBanner = URL.createObjectURL(file.raw);
      this.$message.success('图片上传成功')
      this.form.img = res.data.url
    },
    // 删除图片
    handleRemove() {
      let param = {image: this.form.img}
      this.$post('/apis/image/delete', param).then(res => {
        this.$message.success(res.message)
      })
    },
    // 限制图片大小和格式
    beforeAvatarUpload(file) {
      const isJPG = file.type == 'image/jpeg' || 'image/png'
      const isLt3M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG和png 格式!')
      }
      if (!isLt3M) {
        this.$message.error('上传头像图片大小不能超过 3MB!')
      }
      return isJPG && isLt3M
    },

    // 绑定@imgAdd event 上传图片
    $imgAdd(pos, $file){
        let formdata = new FormData()
        formdata.append('image', $file)
        Axios({
            url: '/apis/image/upload',
            method: 'post',
            data: formdata,
            headers:{
              // 'Content-Type':'multipart/form-data',
              'Authorization': 'Bearer ' + this.token,
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((url) => {
          console.log(111, url, url.data.data.url, $file)
            // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, this.$staticUrl+url.data.data.url)
        })
    },
    // 因为拿不到图片名称，所以无法删除图片
    $imgDel(pos) {
        console.log(pos, '图片名')
        Axios({
            url: '/apis/image/delete',
            method: 'post',
            data: {
              image: pos
            },
            headers:{
              'Authorization': 'Bearer ' + this.token,
              'X-Requested-With': 'XMLHttpRequest'
            }
        }).then((url) => {
          console.log(111, url, url.data.data.url, $file)
          this.$refs.md.$img2Url(pos, this.$staticUrl+url.data.data.url)
        })
    }
  }
}
</script>



<style scoped lang="stylus">
.el-form 
  display flex
  .el-input
    width 220px


.input_title
  width 380px !important
.el-form-item
  margin-bottom: 12px
  margin-right: 50px;
.el-input-number--small
  width 80px
.makedown
  min-height: 400px;
</style>