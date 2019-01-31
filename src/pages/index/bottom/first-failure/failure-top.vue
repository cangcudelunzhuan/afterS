<template lang="pug">
	.failure-top-box
		.title {{title}}
		g-chart.chart-box
			g-grid(:left="10" :right="10" :top="10" :bottom="0")
			g-xAxis(:data="data.xAxisData")
			g-yAxis(:axisLabel="_axisLabel")
			g-bar(:data="data.sericesData" :barMaxWidth="30" :barWidth="'20%'")
</template>

<script>
	import {ChartHelper} from 'g-chart'

	export default {
		props: ['data', 'title'],
		data() {
			return {}
		},
		beforeCreate() {
			this._axisLabel = {
				show: true
			},
			this._lineStyle = {
				color: '#4CB391'
			},
			this._areaStyle = {
				color: ChartHelper.getLinearGradient('rgba(36,119,131,0.6)', 'rgba(36,119,131,0.1)')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.failure-top-box
		font-size 30px

		.title
			display flex
			justify-content space-between
			align-item center

		.chart-box
			height 270px
			margin-top 40px
</style>
