<template lang="pug">
	.fault-top-box
		.item-part.item-part-1
			.title 累计不良频次
			.second
				.num {{dt.ljFailure|numFormat}}
		.item-part
			.title 累计千车不良率
			.second
				span.num {{dt.qcbll}}‰
				span.font {{dt.hb*100|pointFormat}}%环比
				g-arrows.g-arrows(type="up" v-if="dt.hb > 0")
				g-arrows.g-arrows(type="down" v-if="dt.hb < 0")

</template>

<script>
	export default {
		props: ['data'],
		computed: {
			dt() {
				return this.data
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.fault-top-box
		display flex
		.item-part
			display flex
			flex-direction column
			align-items center
			flex 1
			.title
				font-size 30px
				color #8BC6EF
			.second
				display flex
				margin-top 26px
				align-items center
				.num
					font-size 28px
					color #EDA532
					text-align center
					padding-right 6px
				.font
					font-size 28px
		.item-part-1
			text-align left
			flex none
		.g-arrows
			font-size 20px
</style>
