<template lang="pug">
	g-chart.telephone-chart-box()
		g-grid(:left="5" :right="0" :top="40" :bottom="10")
		g-xAxis(:data="serviceIncome.key" :axisLabel="_xAxisLabel")
		g-yAxis(:axisLabel="_axisLabel")
		g-bar(:data="serviceIncome.sericesData"
		:barMaxWidth="20" :itemStyle="itemStyle"
		:barWidth="'20%'" :key="1" :label="_label")
</template>

<script>
	import {ChartHelper} from 'g-chart'

	export default {
		props: {
			serviceIncome: {
				default: function () {
					return {
						key: [],
						sericesData: []
					}
				}
			}
		},
		beforeCreate() {
			this._axisLabel = {
				show: true
			},
			this._xAxisLabel = {
				show:true,
				inside: true,
				verticalAlign: 'bottom',
				padding: [0,0,0,-25],
        interval: 0,
        formatter: function (value) { //x轴的文字改为竖版显示
          var str = value.split('')
          return str.join('\n')
        }
			}
			this.itemStyle = {
				color: ChartHelper.getLinearGradient('#9CCAF0', 'rgba(156,202,240,0.30)')
			},
			this._label = {
				show:true,
				position: 'top',
				color: '#52B8DF'
			}
			this._itemStyle = {
				opacity: 0
			}
		},
		mounted() {
		},
		data() {
			return {}
		}
	}
</script>

<style lang="stylus" scoped>
.telephone-chart-box
  height 470px
</style>
