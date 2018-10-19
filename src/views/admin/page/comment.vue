<template>
  <main>
    <header>评论列表</header>
    <section class="wrap scroll">
      <div class="main_table">
        <el-table 
          v-loading="loading" 
          :data="comments" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="编号" width="90" sortable>
          </el-table-column>
          <el-table-column label="用户名" show-overflow-tooltip >
            <template slot-scope="scope">
              <span v-if="scope.row.user_id">
                {{scope.row.user.username}}
              </span>
              <span v-else>
                (游客) {{scope.row.username}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="article_id" label="文章ID" width="90" sortable>
          </el-table-column>
          <el-table-column prop="article.title" label="文章标题" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="created_at" label="创建日期" show-overflow-tooltip >
          </el-table-column>

          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button type="danger" size="mini" @click="deleteBtn(scope.row.id)">删除</el-button>
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
  data() {
    return {
      loading: true,
      comments: [],
      pageModel: {
        page: 1,
        rows: 10,
        sumCount: 0
      }
    }
  },
  created() {
    this.getComment()
  },
  methods: {
    getComment() {
      this.$post('apis/comment/read').then(res => {
        if (res.data.status == 1) {
          console.log(res.data)
          this.comments = res.data.data
        } else {
          this.$message.error('获取数据失败！')
        }
        this.loading = false
      })
    },
    deleteBtn(id) {
      this.$confirm('是否删除该评论?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$post('apis/comment/remove', {id}).then(res => {
          if (res.data.status == 1) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="stylus">
// @import "../../style/project.scss";
.main-content .right_main {
    width: 750px;
}
</style>