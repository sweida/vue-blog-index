<template>
	<div id="pageModal">
		<Page 
			:total="pageModel.sumCount"
			:current="pageModel.page"
			:page-size="pageModel.row"
			@on-change="pageChange"
			@on-page-size-change="handleSizeChange"
			size="small"
			/>
	</div>
</template>
<script>
  export default {
    name: 'pageModal',
    props: {
      pageModel: {
				sumCount: 0,
				page: 1,
				rows: 10
			}
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
#pageModal{
	text-align center;
  margin 30px 0;
  width 100%;
}

#pageModal
	.ivu-page-item
		margin: 4px;
		background-color: #fff;
		width: 44px;
		border-radius: 50%;
		height: 44px;
		line-height: 40px;
		border: 2px solid #b0bac3;
		font-size: 14px;
		transition: none
		a
			color: #b0bac3;
			font-weight 600
			font-family: 'Source Han Serif SC', 'Source Han Serif', 'source-han-serif-sc', 'PT Serif', 'SongTi SC', 'MicroSoft Yahei', Georgia, serif;
		&:hover
			background-color: #b8297e;
			border: 2px solid #b8297e;
			a
				color #fff

	.ivu-page-item-active
		background-color: #b8297e;
		border: 2px solid #b8297e;
		a
			color #fff

	.ivu-page-prev, .ivu-page-next
		width 44px
		height 44px
		line-height 44px
		border-radius 50%
		i
			color: #b0bac3
			font-size: 24px
		&:hover
			background-color: #b8297e;
			color #fff
			i
				color #fff

@media screen and (max-width: 750px)
	#pageModal
		.ivu-page-item, .ivu-page-prev, .ivu-page-next
			width 34px
			height 34px
			line-height 30px
			margin 2px
</style>