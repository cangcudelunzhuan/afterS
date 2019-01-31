<template lang="pug">
	g-chart.supplyChartbox
		g-grid(:left="10" :right="10" :top="40" :bottom="0")
		g-legend(:data="chartData.lineLengendData" right="0" )
		g-xAxis(:data="chartData.xAxisData" :boundaryGap="false")
		g-yAxis(:axisLabel="_axisLabel" )
		g-yAxis(:axisLabel="_yAxisLabel" :key="1")
		g-area(:showSymbol='true'
		:data="chartData.lineSericesData[0]"
		:areaStyle="_areaStyle[0]")
		g-area(
		:showSymbol='true'
		:data="chartData.lineSericesData[1]"
		:areaStyle="_areaStyle[1]")
</template>

<script>
	import {ChartHelper} from 'g-chart'

	export default {
		props: ['chartData'],
		beforeCreate() {
			this._axisLabel = {
				show: true
			},
			this._yAxisLabel = {
				show: true
			},
			this._areaStyle = [
				{color: ChartHelper.getLinearGradient('rgba(4,65,138,0.6)', 'rgba(4,65,138,0.1)')},
				{color: ChartHelper.getLinearGradient('rgba(36,119,131,0.6)', 'rgba(36,119,131,0.1)')},
				{color: ChartHelper.getLinearGradient('rgba(237,165,50,0.6)', 'rgba(237,165,50,0.1)')}
			]
		}
	}
</script>

<style lang="stylus" scoped>
	.supplyChartbox
		height 340px
</style>
