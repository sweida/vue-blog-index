<template>
  <main>
    <header>广告图</header>
    <section class="wrap scroll">
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
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editBtn(scope.row)">编辑</el-button>
              <el-button type="danger" size="mini" @click="deleteBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page> -->
      </div>
    </section>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="130px" enctype="multipart/form-data">
        <el-form-item label="标题" >
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类" >
          <el-input v-model="form.type" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传图片" >
          <el-upload
            class="avatar-uploader"
            action="/apis/img/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="链接" class="href">
          <el-input v-model="form.url" clearable></el-input>
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
    }
  },
  created() {
    this.getLink()
  },
  methods: {
    getLink() {
      this.$post('apis/ad/read').then(res => {
        console.log(res.data)
        if (res.data.status == 1) {
          this.adlist = res.data.data
        } else {
          this.$message.error('获取数据失败！')
        }
        this.loading = false
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file, 666)
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl)
      // let param = {
      //   file: this.imageUrl
      // }
      // this.$post('apis/img/upload', param).then(res => {
      //   console.log(res)
      // })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    deleteBtn(item) {
      this.$confirm('是否删除该广告图?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('apis/ad/remove', {id: item.id}).then(res => {
          if (res.data.status == 1) {
            this.$message.success(res.data.msg)
            this.adlist.splice(this.adlist.indexOf(item), 1)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {     
      })
    },
    addBtn() {
      this.title = '新增友情链接'
      this.dialogFormVisible = true
      this.form = {
        title: '',
        href: '',
        end_time: ''
      }
    },
    addSubmit() {
      this.$post('apis/ad/add', this.form).then(res => {
        if (res.data.status == 1) {
          this.$message.success(res.data.msg)
          this.dialogFormVisible = false
          this.getLink()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    editBtn(item) {
      this.title = '编辑广告图'
      this.dialogFormVisible = true
      // 复制对象不修改原对象
      this.form = Object.assign({}, item)
    },
    editSubmit() {
      this.$post('apis/ad/change', this.form).then(res => {
        if (res.data.status == 1) {
          this.$message.success(res.data.msg)
          this.dialogFormVisible = false
          this.getLink()
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
.avatar-uploader .el-upload 
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

.el-upload 
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  
.avatar-uploader .el-upload:hover 
  border-color: #409EFF;

.el-upload .avatar-uploader-icon 
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;

.avatar 
  width: 178px;
  height: 178px;
  display: block;
</style>

<style scoped lang="stylus">
.main_table
  margin-top 20px
.el-form .el-input
  width 220px
.href .el-input
  width 400px

</style>