<template>
  <main>
    <header>
      留言板
      <el-button type="danger" size="mini" @click="selectDelete" class="left" v-show="selectMessage.length!=0">删除选中</el-button>
    </header>
    <section class="wrap scroll">
      <div class="main_table">
        <el-table 
          v-loading="loading" 
          :data="message" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          @selection-change="handleSelectionChange"
          tooltip-effect="dark">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="编号" width="80" >
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

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page> -->
      </div>
    </section>
  </main>
</template>

<script>

export default {
  name: 'app',
  // components: {
  //   page
  // },
  data() {
    return {
      loading: true,
      message: [],
      selectMessage: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      this.$post('apis/message/read').then(res => {
        if (res.data.status == 1) {
          this.message = res.data.data
        } else {
          this.$message.error('获取数据失败！')
        }
        this.loading = false
      })
    },
    deleteBtn(item) {
      // console.log(item)
      this.$confirm('是否删除该留言?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('apis/message/remove', {id: item.id}).then(res => {
          if (res.data.status == 1) {
            console.log(res.data)
            // this.$message.success(res.data.msg)
            this.message.splice(this.message.indexOf(item), 1)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {     
      })
    },
    // 打钩选择的数组id
    handleSelectionChange(rows) {
      let vArray = []
      rows.forEach(item => {
          vArray.push(item.id);
      });
      this.selectMessage = vArray
    },
    // 批量删除
    selectDelete() {
      this.$confirm('是否删除选中的留言?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('apis/message/remove', this.selectMessage).then(res => {
          if (res.data.status == 1) {
            // console.log(res.data)
            this.$message.success(res.data.msg)
            this.getMessage()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      }).catch(() => {     
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.left
  margin 10px 0 0 20px
</style>