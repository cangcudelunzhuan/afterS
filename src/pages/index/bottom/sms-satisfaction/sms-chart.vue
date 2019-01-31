<template lang="pug">
	g-chart.customer-chartbox(:key="0" :style="{width: chartWidth}")
		g-tooltip(:axisPointer="{ type: 'cross'}")
		g-grid(:left="10" :right="0" :top="40" :bottom="0")
		g-legend(:data="LengendData" left="0")
		g-xAxis(:data="SmsChartData.xAxisData" :axisLabel='_xAxisLabel')
		g-yAxis(:axisLabel="_axisLabel" :key="1")
		g-yAxis(:key="2" :show="false")
		template(v-for="(item,index) in SmsChartData.colSericesData" )
			g-bar(:data="item"
			:yAxisIndex="0"
			:name="SmsChartData.colLengendData[index]"
			:barMaxWidth="30"
			stack='总量'
			:barWidth="'20%'" barGap="-100%" :serieIndex='index')
		template(v-for="(item,index) in SmsChartData.lineSericesData" )
			g-line(:data="item"
			:yAxisIndex="1"
			:itemStyle='_itemStyle',
			:label='_label'
			:smooth="smooth"
			:showSymbol='true'
			:name="SmsChartData.lineLengendData[index]" :serieIndex='3+index')
</template>

<script>

	export default {
		props: ['data'],
		computed: {
			SmsChartData() {
				return this.data
			},
			LengendData() {
				return [...this.data.lineLengendData, ...this.data.colLengendData]
			},
			chartWidth() {
				let len = this.data.xAxisData.length || 0
				return  len <= 9 ? '100%' : `${len*70}px`
			}
		},
		beforeCreate() {
			this._itemStyle = {
				color: '#52B8DF',
				borderColor: 'rgba(0,0,0,0)',
				borderWidth: 3
			}
			this._label = {
				show: true,
				position: 'top',
				color:'#52B8DF',
				formatter:function (item) {
					return (item.value*100)+'%'
				}
			},
			this._axisLabel = {
				show: true,
				formatter: function (value, index) {
					if (value >= 10000) {
						return value / 10000 + '万'
					} else {
						return value
					}
				}
			}
			this._xAxisLabel = {
				interval: 0,
				formatter: function (value, index) {
					return value.replace(/(服务大区|市|自治州|自治区)/g, '')
				}
			}
		},
		mounted() {
			// console.log('>>' + JSON.stringify(this.SmsChartData))
		},
		data() {
			return {
				smooth: true,
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.customer-chartbox
		margin-top 30px
		height 430px
</style>
