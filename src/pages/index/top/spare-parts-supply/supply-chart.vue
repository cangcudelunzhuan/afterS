<template lang="pug">
	g-chart.supplyChartbox
		g-grid(:left="20" :right="20" :top="30" :bottom="10")
		g-title(:text="title" :left="20")
		g-legend(:data="chartData.lineLengendData" right="20" )
		g-xAxis(:data="chartData.xAxisData" :boundaryGap="false")
		g-area(v-for= "(item,index) in chartData.lineSericesData" :key="index"
		:data="item"
		:name="chartData.lineLengendData[index]"
		:areaStyle="_areaStyle[index]")
</template>

<script>
	import {ChartHelper} from 'g-chart'

	export default {
		props: ['chartData', 'title'],
		beforeCreate() {
			this._axisLabel = {
				show: true
			}
			this._areaStyle = [
				{color: ChartHelper.getLinearGradient('rgba(4,65,138,0.6)', 'rgba(4,65,138,0.1)')},
				{color: ChartHelper.getLinearGradient('rgba(36,119,131,0.6)', 'rgba(36,119,131,0.1)')},
				{color: ChartHelper.getLinearGradient('rgba(237,165,50,0.6)', 'rgba(237,165,50,0.1)')}
			]
		}
	}
</script>
