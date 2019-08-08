<template>
  <main>
    <!-- <header>
      留言板
    </header> -->
    <el-button type="danger" size="mini" @click="selectDelete" class="delete" v-show="selectMessage.length!=0">删除选中</el-button>
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
                {{scope.row.user.name}}
              </span>
              <span v-else>
                (游客) {{scope.row.name}}
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
      message: [],
      selectMessage: [],
      pageModel: {
        page: 1,
        sumCount: 10
      }
    }
  },
  created() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      this.loading = true
      this.$post('/apis/message/list', this.pageModel).then(res => {
        this.message = res.data.data
        this.pageModel.sumCount = res.data.total

        this.loading = false
      }).catch(() => {
      })
    },
    selectRoleList() {
      this.getMessage()
    },
    deleteBtn(item) {
      // console.log(item)
      this.$confirm('是否删除该留言?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('/apis/message/deletes', {id: item.id}).then(res => {
            this.$message.success(res.message)
            this.message.splice(this.message.indexOf(item), 1)

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
        this.$post('/apis/message/deletes', this.selectMessage).then(res => {
          this.$message.success(res.message)
          this.getMessage()
        })
      }).catch(() => {     
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.delete
  position: absolute;
  top: 17px;
  left: 110px;
</style>