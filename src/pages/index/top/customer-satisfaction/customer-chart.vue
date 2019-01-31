<template lang="pug">
	g-chart.customer-chart
		g-tooltip(:axisPointer="{ type: 'cross'}")
		g-grid(:left="0" :right="0" :top="60" :bottom="10")
		g-legend(:data="legend" right="2" :width="200")
		g-title(:text="customerChartData.title")
		g-xAxis(:data="customerChartData.xAxisData")
		g-yAxis(:key="1")
		g-yAxis(:key="2" :show="false")
		g-bar(v-for="(item,index) in customerChartData.colSericesData" :key="'bar'+index" :data="item"
		:name="customerChartData.colLengendData[index]"
		:yAxisIndex="0"
		:barMaxWidth="30" :itemStyle="_itemStyle[index]"
		:barWidth="'20%'" :serieIndex='index')
		g-line(v-for="(item, index) in customerChartData.lineSericesData" :data="item" :key="'line'+index"
		:yAxisIndex="1"
		:label='_labels[index]'
		:showSymbol='true'
		:name="customerChartData.lineLengendData[index]" :lineStyle="_lineStyle[index]" :itemStyle="_lineItemStyle[index]" :serieIndex='2+index')
</template>

<script>
	import {ChartHelper} from 'g-chart'
	import {mapGetters} from 'vuex'
	export default {
		computed: {
			...mapGetters('customer-chart', [
				'customerChartData',
			]),
			legend(){
				if(!this.customerChartData || !this.customerChartData.lineLengendData || !this.customerChartData.colLengendData) return []
				return [...this.customerChartData.lineLengendData,...this.customerChartData.colLengendData]
			}
		},
		beforeCreate() {
			this._labels = [{
				show: true,
				color: '#4653BA',
				position: ['50%', '-100%'],
				formatter:function (item) {
					return (item.value*100)+'%'
				}
			},{
				show: true,
				position: ['50%', '100%'],
				color: '#4CB391',
				formatter:function (item) {
					return (item.value*100)+'%'
				}
			}]
			this._lineStyle = [{
				color: '#4653BA'
			}, {
				color: '#4CB391'
			}]
			this._axisLabel = {
				show: true
			}
			this._lineItemStyle =[{
				color: '#4653BA'
			},{
				color: '#4CB391'
			}]
			this._itemStyle =[
				{
					color: ChartHelper.getLinearGradient('#9CCAF0', 'rgba(156,202,240,0.3)')
				},
				{color: '#04418A'}
			]
		},
		mounted() {

		},
		data() {
			return {
				smooth: false,
			}
		}
	}
</script>

<style lang="stylus" scoped>
</style>
