<template>
<div>
  <!-- <div class="header_title">项目和产品<i class="el-icon-info"></i></div> -->

    <!-- <div class="right_main"> -->
      <div class="main-head">

      </div>
      <div class="main_table">
        <el-table :data="comments" stripe style="width: 100%" max-height="600" tooltip-effect="dark">
          <el-table-column prop="id" label="编号" show-overflow-tooltip >
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
          <el-table-column prop="article.id" label="文章ID" >
          </el-table-column>
          <el-table-column prop="article.title" label="文章标题" show-overflow-tooltip >
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

export default {
  data() {
    return {
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
        console.log(res)
        this.comments = res.data.data
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