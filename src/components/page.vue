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
    props: {
      pageModel: {}
    },
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
<style lang="stylus">
#page 
  text-align: center
  margin: 30px 0;
  width 100%

.blog
  .el-pagination
    display flex
    flex-wrap wrap
    justify-content center
    align-items center
  .el-pagination.is-background .el-pager li
    margin 4px
    background-color: #ffffff;
    color: #b0bac3;
    width: 44px;
    border-radius: 50%;
    height: 44px;
    line-height: 40px;
    border: 2px solid #b0bac3;
    font-size: 14px;
  .el-pagination.is-background.el-pagination--small .btn-next,
  .el-pagination.is-background.el-pagination--small .btn-prev
    margin 4px
    background-color: #ffffff;
    color: #b0bac3;
    width: 44px;
    border-radius: 50%;
    height: 44px;
    line-height: 40px;
    font-size: 14px;
  .el-pagination.is-background .el-pager li:hover, 
  .el-pagination.is-background.el-pagination--small .btn-prev:hover,
  .el-pagination.is-background.el-pagination--small .btn-next:hover
    background-color: #b8297e;
    border: 2px solid #b8297e;
    color #fff
  .el-pagination.is-background.el-pagination--small .btn-prev:hover i,
  .el-pagination.is-background.el-pagination--small .btn-next:hover i
    color #fff
  .el-pagination.is-background button[type="button"]
    background none
    i
      color #b0bac3
      font-size 14px
  .el-pagination.is-background .el-pager li:not(.disabled).active
      background-color: #b8297e;
      border: 2px solid #b8297e;    
  .el-icon-arrow-right:before,
  .el-icon-arrow-left:before 
    font-size 20px

@media screen and (max-width: 750px)
  .blog
    .el-pagination.is-background .el-pager li,
    .el-pagination.is-background.el-pagination--small .btn-next,
    .el-pagination.is-background.el-pagination--small .btn-prev
      margin 3px
      width: 34px;
      height: 34px;
      line-height: 30px;

</style>


