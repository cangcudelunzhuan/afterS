<template lang="pug">
	.item-box.left-chart
		g-chart-percent(:percent="data || 0" :minR="60" :maxR="70" :backgroundColor="'rgba(0, 49, 115)'")
		.tip
			.num(v-if="data == 'NaN'")
			.num(v-else) {{data * 100 | pointFormat}}%
			.title {{title}}
</template>

<script>
	import {GChartPercent} from 'g-chart'

	export default {
		props: {
			type: Number,
			data: {
				default: 0
			},
			title: {
				type: String,
				default: '--'
			}
		},
		components: {GChartPercent}
	}
</script>

<style lang="stylus" scoped>
	.item-box
		position relative
		width 100%
		text-align center
		margin-bottom 20px
		.tip
			position absolute
			width 100%
			height 100%
			display flex
			justify-content center
			flex-direction column
			z-index 99
			top 0
			left 0
			.num
				width 100%
				text-align center
				font-size 30px
				color #EDA532
				line-height 1em
			.title
				width 100%
				font-size 20px
				color #52B8DF
				line-height 1em
				margin-top 3px
</style>
