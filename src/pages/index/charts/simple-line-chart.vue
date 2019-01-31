<template lang='pug'>
	g-container.simple-line-chart
		g-chart
			g-title(text="峰谷值分布", :top="10")
			g-grid(:left="0" :top="80" :bottom="20" :right="40")
			g-xAxis(:data="dataAxis" :boundaryGap="false")
			g-yAxis
			g-line(:data="list" name="最新成交价" :smooth="smooth" :showSymbol="false")
</template>

<script>
	import GContainer from '../../../components/g-container'

	export default {
		name: "simple-line-chart",
		components: {GContainer},
		data() {
			return {
				smooth: true,
				dataAxis: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
				list: [20, 23, 40, 50, 100, 30, 47, 36, 28, 30, 32]
			}
		},

		methods: {
			test() {
				this.smooth = !this.smooth
				this.dataAxis.push('19:00')
				this.list.push(40)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.simple-line-chart
		width 630px
		height 300px
		font-size 12px

		>>> .g-chart
			height 100%
</style>
