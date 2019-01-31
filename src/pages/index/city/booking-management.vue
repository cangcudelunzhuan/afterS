<template lang='pug'>
	g-part.booking-management
		.titlebox
			g-part-title(text="预约管理")
		.chartBox
			chart-box(:areaData="appointment")
</template>

<script>
	import chartBox from './area-chart/index'
	export default {
		props: {
			appointment: {
				default:function () {
					return {}
				}
			}
		},
		components: {
			chartBox
		},
		name: "booking-management"
	}
</script>

<style lang="stylus" scoped>
	.booking-management
		flex 1
		height 620px
		margin-right 20px
		position relative
		.titlebox
			width 100%
			position absolute
			left 0
			top 0px
		.chartBox
			margin-top 30px
</style>
