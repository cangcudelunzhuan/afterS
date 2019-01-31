<template lang="pug">
	g-chart.telephone-chart-box(:style="{width: chartWidth}")
		g-tooltip(:axisPointer="{ type: 'cross'}")
		g-grid(:left="5" :right="5" :top="30" :bottom="0")
		g-legend(:data="TelephoneSatisfactionData.colLengendData" left="0")
		g-xAxis(:data="TelephoneSatisfactionData.xAxisData" :axisLabel="_xAxisLabel")
		g-yAxis(:axisLabel="_axisLabel")
		template(v-for="(item,index) in TelephoneSatisfactionData.colSericesData") :key="index"
			g-bar(:data="item"
			:name="TelephoneSatisfactionData.colLengendData[index]"
			:barMaxWidth="10" :itemStyle="itemStyle" v-if="index === 0"
			:barWidth="'20%'" barGap="10%" :serieIndex='index')
			g-bar(:data="item"
			:name="TelephoneSatisfactionData.colLengendData[index]"
			:barMaxWidth="10" v-else
			:barWidth="'20%'" barGap="10%" :serieIndex='index')
</template>

<script>
	import {ChartHelper} from 'g-chart'

	export default {
		props: ['data'],
		computed: {
			TelephoneSatisfactionData() {
				return this.data
			},
			chartWidth() {
				let len = this.data.xAxisData.length || 0
				return  len <= 9 ? 'auto' : `${len*60}px`
			}
		},
		beforeCreate() {
			this._axisLabel = {
				show: true,
				formatter: function (value, index) {
					if (value > 10000) {
						return value / 10000 + '万'
					} else {
						return value
					}
				}
			},
			this._xAxisLabel = {
				interval: 0,
				width: 100,
				formatter: function (value, index) {
					if(value.length > 4){
						return value.substr(0,3) +'...'
					}
					return value.replace(/(服务大区|市|自治州|自治区)/g, '')
				}
			},
			this.itemStyle = {
				color: ChartHelper.getLinearGradient('#9CCAF0', 'rgba(156,202,240,0.30)')
			}
		},
		data() {
			return {}
		}
	}
</script>

<style lang="stylus" scoped>
	.telephone-chart-box
		box-sizing border-box
		height 360px
		margin-top 30px
</style>
