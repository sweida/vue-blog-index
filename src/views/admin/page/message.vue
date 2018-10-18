<template>
<div>
  <!-- <div class="header_title">项目和产品<i class="el-icon-info"></i></div> -->

    <!-- <div class="right_main"> -->
      <div class="main-head">
        <div>
          <!-- <input type="text" class="search" v-model="search" v-on:keyup.enter="searchBtn">
          <i class="el-icon-search" @click="searchBtn"></i> -->
        </div>
        <!-- <el-button type="primary" size="small" @click="addBtn">新　增</el-button> -->
      </div>
      <div class="main_table">
        <el-table :data="articles" stripe style="width: 100%" max-height="600" tooltip-effect="dark">
          <el-table-column prop="id" label="编号" show-overflow-tooltip >
          </el-table-column>
          <el-table-column label="用户名" show-overflow-tooltip >
            <template slot-scope="scope">
              <span v-if="scope.row.user_id">
                {{scope.row.user.username}}
              </span>
              <span v-else>
                (游客) {{scope.row.ykname}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="留言内容" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="created_at" label="创建日期" show-overflow-tooltip >
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteBtn(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column label="删除">
            <!-- <template slot-scope="scope">
                <i class="el-icon-delete" @click="deleteBtn(scope.$index, scope.row)"></i>
              </template> -->
          </el-table-column>
        </el-table>
        <!-- <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page> -->
      </div>
    <!-- </div> -->
  <!-- </div> -->
</div>
</template>

<script>
// import { addproject, getproject, delProject } from '@/api/product'
// import { articleList } from '@/api/login'
// import { delMenu, editMenu, addMenu, productMenu, projectMenu, mixppMenu } from '@/api/tree'
// import page from '@/components/common/page'
// import { Trim } from '@/utils/common'
export default {
  name: 'app',
  // components: {
  //   page
  // },
  data() {
    return {
      openindex: '',
      search: '',
      projectList: [],
      articles: [],
      MenuParam: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.$get('apis/message/read').then(res => {
      console.log(res)
      this.articles = res.data.data
    })
  },
  methods: {
    deleteBtn(id) {
      this.$confirm('是否删除该留言?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('apis/message/remove', {id}).then(res => {
          if (res.data.status == 1) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    }
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
    // // 删除项目
    // deleteBtn(index, row) {
    //   this.$confirm('是否删除该项目?', '提示', {
    //     type: 'warning'
    //   }).then(() => {
    //     delProject(row.id).then(res => {
    //       if (res.data.code == 200) {
    //         this.projectList.splice(index, 1)
    //         this.$message.success(res.data.msg)
    //         this.getprojectList()
    //       } else {
    //         this.$message.error('删除失败!')
    //       }
    //     })
    //   }).catch(() => {})
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
// @import "../../style/project.scss";
.main-content .right_main {
    width: 750px;
}
</style>