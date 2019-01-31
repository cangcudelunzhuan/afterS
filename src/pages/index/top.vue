<template lang='pug'>
	.top
		.left
			daily-approach-trend
			customer-satisfaction
		.middle
			top-map
			after-sale-operation
		.right
			spare-parts-supply
			technical-analysis
</template>

<script>
	export default {
		name: "top",
		components: {
			DailyApproachTrend: () => import('./top/daily-approach-trend'),
			TopMap: () => import('./top/top-map'),
			SparePartsSupply: () => import('./top/spare-parts-supply'),
			TechnicalAnalysis: () => import('./top/technical-analysis'),
			AfterSaleOperation: () => import('./top/after-sale-operation'),
			CustomerSatisfaction: () => import('./top/customer-satisfaction'),
		}
	}
</script>

<style lang="stylus" scoped>
	.top
		display flex
		margin 20px 0
		.left
			flex none
			width 1100px
			margin-left 20px
			display flex
			flex-direction column
		.middle
			flex none
			width 1520px
			margin 0 40px
			display flex
			flex-direction column
		.right
			flex none
			width 1100px
			display flex
			flex-direction column
</style>
