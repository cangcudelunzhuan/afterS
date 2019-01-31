<template lang='pug'>
	g-part.customer-complaints
		.titlebox
			g-part-title(text="客户抱怨")
		.chartBox
			chart-box(:areaData="custComplaints")
</template>

<script>
	import chartBox from './area-chart/index'
	export default {
		name: "customer-complaints",
		props:{
			custComplaints:{
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
	.customer-complaints
		height 620px
		flex 1
		margin  0 20px
		position relative
		.titlebox
			width 100%
			position absolute
			left 0
			top 0px
		.chartBox
			margin-top 30px
</style>
