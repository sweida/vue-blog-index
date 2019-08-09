<template>
  <main>
    <!-- <header>博客列表</header> -->
    <section class="wrap scroll">
      <div class="main_table">
        <el-table 
          :data="articles"
          v-loading="loading" 
          stripe 
          style="width: 100%" 
          max-height="600" 
          tooltip-effect="dark">
          <el-table-column prop="id" label="ID"  width="80" >
          </el-table-column>
          <el-table-column prop="classify" label="文章分类" show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="title" label="文章标题" show-overflow-tooltip >
          </el-table-column>
          <el-table-column label="标签" width="200">
            <template slot-scope="scope">
              <template v-for="(item, index) in scope.row.tags">
                <el-tag size="mini" :key="index">{{item}}</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="view_count" label="点击量" width="80">
          </el-table-column>
          <el-table-column prop="like" label="点赞量" width="80">
          </el-table-column>
          <el-table-column prop="commentCount" label="评论量" width="80">
          </el-table-column>
          <el-table-column prop="created_at" label="创建日期" show-overflow-tooltip >
          </el-table-column>
          <el-table-column label="是否下架" width="100">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.deleted_at" @change="deleteBtn(scope.row.id, scope.row.deleted_at)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detail(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>

        </el-table>
        <MyPage :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></MyPage>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      articles: [],
      pageModel: {
        page: 1,
        all: 1,
        sumCount: 10
      }
    }
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('/apis/article/list', this.pageModel).then(res => {

          this.articles = res.data.data
          this.pageModel.sumCount = res.data.total
          // 将已经下架的文章设置为true
          this.articles.forEach(item => {
            if (item.deleted_at) {
              item.deleted_at = true
            }
          })

        this.loading = false
      }).catch(() => {
      })
    },
    selectRoleList() {
      this.getArticles()
    },
    detail(id) {
      this.$router.push(`/article/edit/${id}`)
    },
    // 下架文章
    deleteBtn(id, value) {
      // 当value == true时操作下架，反之恢复文章
      if (value == true) {
        this.$post('/apis/article/delete', {id}).then(res => {
          console.log(res.data, 'delete')
          this.$message.success(`文章${id}下架操作成功`)
        }).catch(() => {
        })
      } else {
        this.$post('/apis/article/restored', {id}).then(res => {
          console.log(res.data, 'restored')
          this.$message.success(`文章${id}恢复成功`)
        }).catch(() => {
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>