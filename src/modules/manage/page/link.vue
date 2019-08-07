<template>
  <main>
    <!-- <header>友情链接</header> -->
    <section class="wrap scroll">
      <el-button type="primary" size="small" @click="addBtn">添 加</el-button>
      <div class="main_table">
        <el-table 
          v-loading="loading" 
          :data="links" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="编号" width="80" >
          </el-table-column>
          <el-table-column prop="title" label="标题" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="url" label="链接" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="img" label="头像" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="desc" label="描述" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="end_time" label="有效期" show-overflow-tooltip >
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

    <el-dialog :title="title" :visible.sync="dialogFormVisible" class="link">
      <el-form :model="form" label-width="130px">
        <el-form-item label="标题" >
          <el-input v-model="form.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="链接" class="href">
          <el-input v-model="form.url" clearable></el-input>
        </el-form-item>
        <el-form-item label="头像" class="href">
          <el-input v-model="form.img" clearable></el-input>
        </el-form-item>
          <img :src="form.img" class="link-ava" v-if="form.img">
        <el-form-item label="描述" class="href">
          <el-input v-model="form.desc" clearable></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker
            v-model="form.end_time"
            value-format="yyyy-MM-dd"
            type="date"
            size="medium"
            placeholder="选择日期">
          </el-date-picker>
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
      title: '新增友情链接',
      dialogFormVisible: false,
      loading: true,
      links: [],
      form: {
        title: '',
        url: '',
        img: '',
        desc: '',
        end_time: ''
      },
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.getLink()
  },
  methods: {
    getLink() {
      this.$get('/apis/link/list?all=1').then(res => {
        console.log(res.data)
        this.links = res.data.data
        this.loading = false
      })
    },
    deleteBtn(item) {
      this.$confirm('是否删除该链接?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('/apis/link/delete', {id: item.id}).then(res => {
          this.$message.success(res.message)
          this.links.splice(this.links.indexOf(item), 1)
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
      this.$post('/apis/link/add', this.form).then(res => {
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.getLink()
      }).catch({})
    },
    editBtn(item) {
      this.title = '编辑友情链接'
      this.dialogFormVisible = true
      // 复制对象不修改原对象
      this.form = Object.assign({}, item)
    },
    editSubmit() {
      this.$post('/apis/link/edit', this.form).then(res => {
        this.$message.success(res.message)
        this.dialogFormVisible = false
        this.getLink()
      }).catch({})
    }
  }
}
</script>

<style>
.link .el-dialog{
  min-width: 600px;
}
</style>


<style scoped lang="stylus">
.main_table
  margin-top 20px
.el-form .el-input
  width 220px
.href .el-input
  width 400px

.link-ava
  width 100px
  height 100px
  margin: 0 0 20px 130px
  object-fit: cover
</style>