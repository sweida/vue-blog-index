<template>
  <main>
    <!-- <header>会员列表</header> -->
    <section class="wrap scroll">
      <div class="main_table">
        <el-table 
          v-loading="loading" 
          :data="Users" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="用户ID" width="80">
          </el-table-column>
          <el-table-column prop="name" label="用户名" >
          </el-table-column>
          <el-table-column prop="email" label="邮箱地址" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="is_admin" label="权限" >
            <template slot-scope="scope">
              {{ scope.row.admin ? '超级管理员' : '普通用户' }}
            </template>
          </el-table-column>
          <el-table-column prop="created_at" label="注册日期" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="updated_at" label="最后登录时间" show-overflow-tooltip >
          </el-table-column>
          <!-- <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detail(scope.row.id, scope.row)">查看</el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
      </div>
    </section>
  </main>
</template>

<script>
import page from '@/components/page'
export default {
  components: {
    page
  },
  data() {
    return {
      loading: true,
      Users: [],
      pageModel: {
        page: 1,
        sumCount: 10
      }
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.loading = true
      this.$post('/apis/user/list', this.pageModel).then(res => {
        this.Users = res.data.data
        this.pageModel.sumCount = res.data.total
        this.loading = false
      }).catch(() => {
      })
    },
    selectRoleList() {
      this.getUsers()
    },
    // 查看用户详情
    detail(id, row) {
      let params = {
        id: id
      }
      this.$post('/apis/user', params).then(res => {
        console.log(res)
      }).catch(() =>{})
    },
    // // 获取项目产品菜单
    // getmixMenu() {
    //   mixppMenu().then(res => {
    //     // this.menuList = res.data.data
    //   })
    // },
    // // 新增菜单
    // plusNav(item) {
    //   event.stopPropagation()
    //   this.$prompt('请输入新增的类目名称', '提示', {}).then(({ value }) => {
    //     let param = {
    //       icon: '',
    //       name: value,
    //       parentId: item.id
    //     }
    //     if (value == null || !Trim(value)) {
    //       this.$message.error('不能为空')
    //     } else {
    //       addMenu(param).then(res => {
    //         if (res.data.code == 200) {
    //           this.getmixMenu()
    //           this.$message.success('新增菜单成功!')
    //         } else {
    //           this.$message.error('新增菜单失败!')
    //         }
    //       })
    //     }
    //   }).catch(() => {})
    // },
    // // 删除菜单
    // minusNav(item) {
    //   event.stopPropagation()
    //   this.$confirm('是否删除该类目?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     delMenu(item.id).then(res => {
    //       if (res.data.code == 200) {
    //         this.getmixMenu()
    //         this.$message.success(res.data.msg)
    //       } else {
    //         this.$message.error(res.data.msg)
    //       }
    //     })
    //   }).catch(() => {})
    // },
    // // 修改菜单
    // editNav(item, name) {
    //   event.stopPropagation()
    //   this.$prompt('请输入修改的类目名称', '提示', {
    //     inputValue: name
    //   }).then(({ value }) => {
    //     if (value == null || !Trim(value)) {
    //       this.$message.error('不能为空')
    //     } else {
    //       editMenu(item.id, value).then(res => {
    //         if (res.data.code == 200) {
    //           this.getmixMenu()
    //           this.$message.success('修改菜单成功!')
    //         } else {
    //           this.$message.error('修改菜单失败!')
    //         }
    //       })
    //     }
    //   }).catch(() => {})
    // },
    // handleSelect(key, keyPath) {
    //   this.openindex = key
    // },
    // handleOpen(key, keyPath) {
    //   this.openindex = key
    // },
    // handleClose(key, keyPath) {
    //   this.openindex = ''
    // },
    // navtitle(index) {
    //   this.openindex = this.menuList[index].url
    // },
    // // 改变菜单时得到列表数据
    // changeMenu(child) {
    //   console.log(child);
    //   this.MenuParam = {
    //     parentId: child.id
    //   }
    //   this.getprojectList()
    // },
    // // 获取项目列表
    // getprojectList() {
    //   getproject(this.pageModel, this.MenuParam).then(res => {
    //     this.pageModel.sumCount = res.data.data.total
    //     this.projectList = res.data.data.rows
    //   })
    // },
    // //搜素客户
    // searchBtn() {
    // },
    // addBtn() {
    //   this.$router.push('project/addProject')
    // },


    // // 编辑项目
    // editBtn(index, row) {
    //   this.$router.push('project/edit/' + row.id)
    // },
    // selectRoleList() {
    //   this.getprojectList()
    // }
  }
}
</script>

<style scoped lang="stylus">

</style>