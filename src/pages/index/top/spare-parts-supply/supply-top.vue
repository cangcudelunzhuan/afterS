<template lang="pug">
	.supply-top-box
		.item(v-for="(item, index) in data" :key="index")
			.title {{item.title}}
			.num
				span {{item.value | betterFormat}}
				span.symbol 元
			.bottm 目标完成率：{{item.wcl*100 | pointFormat}}%
			process-line(:percent="item.wcl*100 | pointFormat")
</template>

<script>
	import processLine from '@/components/process-line'

	export default {
		props: ['data'],
		components: {
			processLine
		}
	}
</script>

<style lang="stylus" scoped>
	.supply-top-box
		display flex
		margin-top 50px

		.item
			flex 1
			text-align center

			.title
				title-style()

			.num
				font-size 36px
				color #EDA532
				margin 24px 0

			.bottm
				font-size 24px
				margin-bottom 12px
		.symbol
			font-size 24px
		.item + .item
			margin-left 90px
</style>
