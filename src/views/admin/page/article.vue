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
              <template v-for="item in scope.row.tag">
                <el-tag size="mini">{{item}}</el-tag>
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="clicks" label="点击量" width="80">
          </el-table-column>
          <el-table-column prop="like" label="点赞量" width="80">
          </el-table-column>
          <el-table-column prop="comment" label="评论量" width="80">
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
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
        <page :pageModel="pageModel" @selectList="selectRoleList" v-if="pageModel.sumCount>10"></page>
      </div>
    </section>
  </main>
</template>

<script>
import page from '@/components/page'
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
  components: {
    page
  },
  created() {
    this.getArticles()
  },
  methods: {
    getArticles() {
      this.loading = true
      // 获取软删除的数据 all=1
      this.$post('/apis/article/read', this.pageModel).then(res => {
        if (res.data.status == 1) {
          this.articles = res.data.data
          this.pageModel.sumCount = res.data.total
          // 将已经下架的文章设置为true
          this.articles.forEach(item => {
            if (item.deleted_at) {
              item.deleted_at = true
            }
          })
        } else {
          this.$message.error('获取数据失败！')
        }
        this.loading = false
      })
    },
    selectRoleList() {
      this.getArticles()
    },
    detail(id) {
      this.$router.push(`/admin/article/edit/${id}`)
    },
    // 下架文章
    deleteBtn(id, value) {
      // 当value == true时操作下架，反之恢复文章
      if (value == true) {
        this.$post('/apis/article/remove', {id}).then(res => {
          console.log(res.data, 'remove')
          if (res.data.status == 1) {
            this.$message.success(`文章${id}下架操作成功`)
          } else {
            this.$message.error('操作失败')
          }
        })
      } else {
        this.$post('/apis/article/restored', {id}).then(res => {
          console.log(res.data, 'restored')
          if (res.data.status == 1) {
            this.$message.success(`文章${id}恢复成功`)
          } else {
            this.$message.error('操作失败')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">

</style>