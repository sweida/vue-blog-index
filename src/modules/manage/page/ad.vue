<template>
  <main>
    <!-- <header>广告图</header> -->
    <section class="wrap scroll ad">
      <el-button type="primary" size="small" @click="addBtn">添 加</el-button>
      <div class="main_table">
        <el-table 
          v-loading="loading" 
          :data="adlist" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="编号" width="80" >
          </el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="type" label="分类" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="url" label="链接" show-overflow-tooltip >
          </el-table-column>
          <el-table-column label="图片预览" width="180">
            <template slot-scope="scope">
              <img class="imgload" :src="$staticUrl+scope.row.url" alt="">
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editBtn(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></MyPage>
      </div>
    </section>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" top="10vh" class="addimg">
      <el-form :model="form" label-width="130px" enctype="multipart/form-data">
        <el-form-item label="标题" >
          <el-input v-model="form.title" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类" >
          <el-input v-model="form.type" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" >
          <el-upload
            class="avatar-uploader"
            action="/apis/image/upload"
            name="image"
            :headers='headers'
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="图片链接" class="href">
          <el-input v-model="form.url" readonly ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false" >取 消</el-button>
        <el-button size="small" type="primary" @click="editSubmit" v-if="form.id">保存修改</el-button>
        <el-button size="small" type="primary" @click="addSubmit" v-else>保 存</el-button>
      </div>
    </el-dialog>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex"

export default {
  data() {
    return {
      title: '新增广告图',
      dialogFormVisible: false,
      loading: true,
      adlist: [],
      imageUrl: '',
      form: {
        title: '',
        url: '',
        type: ''
      },
      pageModel: {
        page: 1,
        sumCount: 10
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
    this.getAd()
  },
  methods: {
    getAd() {
      this.$post('/apis/ad/list', this.pageModel).then(res => {
        console.log(res.data)
        this.adlist = res.data.data
        this.pageModel.sumCount = res.data.total
        this.loading = false
      })
    },
    selectRoleList() {
      this.getAd()
    },
    // 上传图片，获取图片地址
    handleAvatarSuccess(res, file) {
      // 如果已经有图片则先删除图片
      if (this.form.url) {
        this.handleRemove()
      }

      this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.success('图片上传成功')
      this.form.url = res.data.url
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
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG和png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    deleteBtn(item) {
      this.$confirm('是否删除该广告图?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('/apis/ad/delete', {id: item.id}).then(res => {
          this.$message.success(res.message)
          this.adlist.splice(this.adlist.indexOf(item), 1)
        })
      }).catch(() => {     
      })
    },
    // 打开新增广告
    addBtn() {
      this.title = '新增友情链接'
      this.dialogFormVisible = true
      this.imageUrl = ''
      this.form = {
        title: '',
        href: '',
        end_time: ''
      }
    },
    // 提交新增
    addSubmit() {
      this.$post('/apis/ad/add', this.form).then(res => {
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.getAd()
      })
    },
    // 打开编辑
    editBtn(item) {
      this.title = '编辑广告图'
      this.dialogFormVisible = true
      // 复制对象不修改原对象
      this.form = Object.assign({}, item)
      this.imageUrl = this.$staticUrl + this.form.url
    },
    // 提交编辑
    editSubmit() {
      this.$post('/apis/ad/edit', this.form).then(res => {
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.getAd()
      })
    }
  }
}
</script>

<style lang="stylus">
.addimg .el-dialog{
  min-width: 600px;
}
.ad .el-table .cell{
  line-height 100%
}
</style>

<style scoped lang="stylus">
.main_table
  margin-top 20px
.el-form .el-input
  width 220px
.href .el-input
  width 400px


.imgload
  height 42px 

</style>