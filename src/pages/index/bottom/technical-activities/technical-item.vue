<template lang="pug">
	.technicalbox
		.titlebox
			.first-title {{chartDataChild.title}}
			.title-message 目标值: {{chartDataChild.mbValue}}  完成数: {{chartDataChild.wcValue}}
		.position
			.tabposition
				tab(:data="tabData" @getActive="getActive")
			g-chart.supply-chart(v-if="chartData")
				g-grid(:left="10" :right="5" :top="50" :bottom="0")
				g-legend(:data="chartData.lineLengendData" right="0")
				g-xAxis(:data="chartData.xAxisData")
				g-yAxis(:key="'y1'" :axisLabel="_axisLabel" )
				g-yAxis(:key="'y2'" min="-Infinity" :show="false")
				g-bar(:data="chartData.lineSericesData[0]" :name="chartData.lineLengendData[0]" :barMaxWidth="20")
				g-line(
				:showSymbol='true'
				:label='_label'
				:yAxisIndex='1'
				:smooth="true"
				:name="chartData.lineLengendData[1]"
				:data="chartData.lineSericesData[1]"
				:areaStyle="_areaStyle[1]" :serieIndex='1')
</template>

<script>
	import tab from '@/components/tab'
	import {ChartHelper} from 'g-chart'

	export default {
		props: ['data'],
		components: {
			tab,
		},
		computed: {
			chartDataChild() {
				return this.data
			}
		},
		data() {
			return {
				tabData: this.data.tabData,
				chartData: ''
			}
		},
		beforeCreate() {
			this._axisLabel = {
				show: true
			},
			this._areaStyle = [
				{color: ChartHelper.getLinearGradient('rgba(4,65,138,0.6)', 'rgba(4,65,138,0.1)')},
				{color: ChartHelper.getLinearGradient('rgba(36,119,131,0.6)', 'rgba(36,119,131,0.1)')},
				{color: ChartHelper.getLinearGradient('rgba(237,165,50,0.6)', 'rgba(237,165,50,0.1)')}
			]
			this._label = {
				show: true,
				position: 'top',
				color:'#4CB391',
				formatter: function (item) {
					return item.value
				}
			}
		},
		mounted() {
			this.getActive(0)
		},
		methods: {
			getActive(i) {
				this.tabData.active = i
				if (i == 0) {
					this.chartData = {...this.chartDataChild.completion}
				} else {
					this.chartData = {...this.chartDataChild.leakage}
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.technicalbox
		margin-top 32px
		.titlebox
			display flex
			align-items center
			margin-bottom 32px
			.first-title
				font-size 30px
			.title-message
				font-size 28px
				margin-left 42px
		.position
			position relative
			margin-top 30px
			.tabposition
				position absolute
				left 0
				top 0
				z-index 9

		.supply-chart
			height 340px
</style>
