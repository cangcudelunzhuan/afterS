<template lang='pug'>
	.chart-item
		g-chart-arrow.arrow(v-if='item' :percent="percent" maxR="70" minR="50")
		.chart-value {{item.value *100 | pointFormat}}%
		.chart-title {{item.title}}
</template>

<script>
	import {GChartArrow} from 'g-chart'
	export default {
		name: "chart-item",
		props:{
			item:{
				default:function () {
					return ''
				}
			}
		},
		computed:{
			percent(){
				if(this.item.value == 'NaN'){
					return 0
				}else{
					return this.item.value*1 || 0
				}
			}
		},
		components: {GChartArrow}
	}
</script>

<style lang="stylus" scoped>
	.chart-item
		height 240px
		text-align center
		.chart-value
			margin-top 10px
			value-title-style()
		.chart-title
			margin-top 10px
			value-content-style()
	   	.arrow
			height 180px !important
</style>
