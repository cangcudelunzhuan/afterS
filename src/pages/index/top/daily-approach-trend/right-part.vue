<template lang='pug'>
	.right-part
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="日进场趋势")
		.content-row
			pie-chart(:title="pie.title" :legend="pie.legend" :pieData="pie.pieData")
			peak-valley-chart()
			overnight-car
</template>

<script>
	import {mapGetters} from 'vuex'
	import PieChart from './right-part/pie-chart'
	import PeakValleyChart from './right-part/peak-valley-chart'
	import OvernightCar from './right-part/overnight-car'
	export default {
		name: "right-part",
		components: {PieChart, PeakValleyChart, OvernightCar},
		mounted() {
			this.$store.dispatch('daily-approach-trend-right/get-daily-trendy')
		},
		computed:{
			...mapGetters('daily-approach-trend-right',[
				'pie',
				'loading'
			]),
			...mapGetters([
				'timestamp'
			])
		},
		watch:{
			'timestamp'(){
				this.$store.dispatch('daily-approach-trend-right/get-daily-trendy')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.right-part
		width 640px
		margin-left 40px
		padding-top 40px
</style>
