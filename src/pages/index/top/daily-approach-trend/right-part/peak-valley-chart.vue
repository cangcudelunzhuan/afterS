<template lang='pug'>
	g-chart.peak-valley-chart
		g-grid(:left="5" :right="20" :top="40" :bottom="0")
		g-title(:text="peakValleyData.title+'(台)'")
		g-xAxis(:data="peakValleyData.xAxisData" :boundaryGap="false" :axisLabel="_xAxisLabel")
		g-yAxis(:axisLabel="_axisLabel")
		g-area(:data="peakValleyData.sericesData" :smooth="true"  :areaStyle="_areaStyle" :lineStyle="_lineStyle")
</template>

<script>
	import {ChartHelper} from 'g-chart'
	import {mapGetters} from 'vuex'
	export default {
		name: "peak-valley-chart",
		data(){
			return {}
		},
		computed:{
			...mapGetters('daily-approach-trend-right',[
				'peakValleyData'
			])
		},
		beforeCreate(){
			this._axisLabel = {
				show:true,
				formatter:function (value) {
					return 	value
				}
			}
			this._xAxisLabel = {
				interval: 1
			},
			this._lineStyle ={
				color: '#0F5D90'
			},
			this._areaStyle = {
				color:ChartHelper.getLinearGradient('rgba(82,184,223, 0.5)', 'rgba(82,184,223, 0.1)')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.peak-valley-chart
		height 330px !important
		margin-top 50px
		margin-bottom 50px
</style>
