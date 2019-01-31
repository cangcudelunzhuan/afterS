<template lang='pug'>
	.overnight-car-item
		.item-title {{item.title}}
		.icon-row
			i.iconfont.icon-arrowdownb
		.div-yuan
			.content-yuan(:style="{borderColor:color}")
				.inside {{item.value}}
</template>

<script>

	export default {
		name: "overnight-car-item",
		props:['item', 'color']
	}
</script>

<style lang="stylus" scoped>
	.overnight-car-item
		flex 1
		text-align center
		.g-chart
			height 200px !important
		.item-title
			font-size 28px
		.icon-row
			margin-top 20px
			margin-bottom 10px
			font-size 24px
		.div-yuan
			width 130px
			height 130px
			border-radius 130px
			border 1px solid #04418A
			display flex
			justify-content center
			align-items center
			margin 0 auto
			.content-yuan
				border 10px solid #EDA532
				width 100px
				height 100px
				border-radius 100px
				display flex
				justify-content center
				align-items center
				.inside
					border 1px solid #04418A
					width 90px
					border-radius 90px
					height 90px
					font-size 28px
					line-height 90px
					text-align center
					font-weight 600
</style>
