<template lang="pug">
	g-chart.customer-chart-box
		g-tooltip(:axisPointer="{ type: 'cross'}")
		g-grid(:left="20" :right="5" :top="40" :bottom="0")
		g-legend(:data="lengendData" right="0" )
		g-title(text="产值走势(元)")
		g-xAxis(:data="chartData.xAxisData")
		g-yAxis(:axisLabel="_axisLabel")
		g-bar(v-for ="(item, index) in chartData.colSericesData" :data="item" :key="'sss'+index"
		:name="chartData.colLengendData[index]"
		:barMaxWidth="30"
		:barWidth="'20%'" :serieIndex='index')
		g-line(:data="chartData.lineSericesData[0]" :smooth="smooth" :name="chartData.lineLengendData[0]" :serieIndex="2" :showSymbol='true' :label="_lineLabel")
</template>

<script>
	export default {
		props: ['data'],
		computed: {
			chartData () {
				return this.data
			},
			lengendData(){
				return [...this.chartData.lineLengendData, ...this.chartData.colLengendData]
			}
		},
		beforeCreate() {
			this._axisLabel = {
				show: true,
				formatter:function (value) {
					if(value < 1000000 && value> 10000){
						return parseInt((value / 10000)*100)/100 + '万'
					}else if(value >= 1000000 && value < 10000000){
						return parseInt((value / 1000000)*100)/100 + '百万'
					}else if(value >= 10000000){
						return parseInt((value / 10000000)*100)/100 + '千万'
					}else{
						return 	value
					}
				}
			}
			this._lineLabel = {
				show:true,
				color: 'rgb(237, 165, 50)',
				formatter:function (item) {
					if(item.dataIndex != 11) return ''
					let value = item.value
					if(value < 1000000 && value> 10000){
						return parseInt((value / 10000)*100)/100 + '万'
					}else if(value >= 1000000 && value < 10000000){
						return parseInt((value / 1000000)*100)/100 + '百万'
					}else if(value >= 10000000){
						return parseInt((value / 10000000)*100)/100 + '千万'
					}else{
						return 	value
					}
				}
			}
			this._axisPointer = {
				show: true,
				value: 11,
				snap: true,
				status: 'show',
				lineStyle: {
					type:'dashed',
					opacity: 1,
					width: 1,
					color:'rgb(237, 165, 50)'
				},
				label:{
					show: false,
					color: 'rgb(237, 165, 50)'
				}
			}

		},
		data() {
			return {
				smooth: false,
			}
		},
		methods: {}
	}
</script>

<style lang="stylus" scoped>
	.customer-chart-box
		margin-top 40px
		flex auto
</style>
