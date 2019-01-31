<template lang='pug'>
	g-part.satisfaction-trend
		.titlebox
			g-part-title(text="服务站满意度趋势")
		.chartBox
			chart-box(:areaData="serviceSatisfaction")
</template>

<script>
	import chartBox from './area-chart/index'
	export default {
		name: "satisfaction-trend",
		props: {
			serviceSatisfaction: {
				default:function () {
					return {}
				}
			}
		},
		components: {
			chartBox
		}
	}
</script>

<style lang="stylus" scoped>
	.satisfaction-trend
		flex 1
		height 620px
		position relative
		.titlebox
			width 100%
			position absolute
			left 0
			top 0px
		.chartBox
			margin-top 30px
</style>
