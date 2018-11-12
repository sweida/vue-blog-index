<template>
  <div id="page">
    <!-- <el-pagination class="page"
                   @size-change="handleSizeChange"
                   @current-change="pageChange"
                   :current-page="pageModel.page"
                   :page-sizes="[5,10,15,20]"
                   :page-size="pageModel.rows"
                   background
                   small
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pageModel.sumCount"> 
                   </el-pagination> -->
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
    <el-pagination class="page"
      background
      small
      @size-change="handleSizeChange"
      @current-change="pageChange"
      :current-page="pageModel.page"
      :total="pageModel.sumCount"
      layout="prev, pager, next">
    </el-pagination>
    
  </div>
</template>
<script>
  export default {
    name: 'page',
    props: {pageModel: {}},
    methods: {
      //每页条数变化事件
      handleSizeChange(val) {
        this.pageModel.rows = val
        this.$emit("selectList");
      },
      //页数变化事件
      pageChange(val) {
        this.pageModel.page = val
        this.$emit("selectList");
      },
    }
  }
</script>
<style scoped lang="stylus">
  #page {
    text-align: center;
    margin: 20px 0;
  }
</style>