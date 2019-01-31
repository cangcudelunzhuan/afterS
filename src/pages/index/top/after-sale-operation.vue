<template lang='pug'>
	.after-sale-operation
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		.title-row
			.line
			top-title.title(text="售后运营")
			.line
		.content-row
			card-box(:data="wxz" v-if="wxz.length>0")
			chart-box(:data="productTrend" v-if="productTrend")
</template>

<script>
	import TopTitle from './after-sale-operation/top-title'
	import CardBox from './after-sale-operation/card-box'
	import ChartBox from './after-sale-operation/chart-box'
	import {mapGetters} from 'vuex'
	export default {
		name: "after-sale-operation",
		components: {TopTitle, CardBox, ChartBox},
		computed: {
			...mapGetters('after-sale-operation', [
				'loading',
				'wxz',
				'productTrend'
			]),
			...mapGetters([
				'timestamp'
			]),
		},
		watch:{
			'timestamp'(){
				this.$store.dispatch('after-sale-operation/saleOperation')
			}
		},
		created () {
			this.$store.dispatch('after-sale-operation/saleOperation')
		},
		data () {
			return {
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.after-sale-operation
		position relative
		flex auto
		margin-top 60px
		border: 1px solid #04418A
		border-top none
		.title-row
			height 80px
			position absolute
			top -40px
			width 100%
			display flex
			flex-direction row
			align-items center
			z-index 99
			.title
				flex none
			.line
				flex auto
				border: 1px solid #04418A
				height 0
		.content-row
			position absolute
			box-sizing border-box
			top 0
			bottom 0
			width 100%
			padding 20px
			display flex
			flex-direction column
</style>
