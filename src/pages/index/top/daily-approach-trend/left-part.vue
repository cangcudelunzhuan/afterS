<template lang='pug'>
	g-container.left-part
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		.top-img
		.item-list
			left-item.item(v-for='(item,index) in 4' :type="index == 1 ? 1 : 0"  :index='index' :key="index" :gap="index == 1 || index ==3" :item="data[index]")
		.chart-row
			chart-item(v-for="(item,index) in 2" :key="index" :item="data[4+index]")
</template>

<script>
	import LeftItem from './left-part/left-item'
	import ChartItem from './left-part/chart-item'
	import {mapGetters} from 'vuex'
	export default {
		name: "left-part",
		components: {LeftItem, ChartItem},
		computed:{
			...mapGetters('daily-approach-trend-left',[
				'data',
				'loading'
			]),
			...mapGetters([
				'timestamp'
			])
		},
		watch:{
			'timestamp'(){
				this.$store.dispatch('daily-approach-trend-left/get-daily-progress')
			}
		},
		mounted() {
			this.$store.dispatch('daily-approach-trend-left/get-daily-progress')
		},

	}
</script>

<style lang="stylus" scoped>
	.left-part
		width 420px
		flex none
		height 100%
		.top-img
			height: 0
			width 160px
			border-top 12px solid #04418A
			border-left 12px solid transparent
			border-right 12px solid transparent
			margin 0 auto
		.item-list
			margin-top 50px
		.chart-row
			display flex
			>>>.chart-item
				width 50%
</style>
