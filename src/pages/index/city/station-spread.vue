<template lang='pug'>
	g-part.station-spread
		.title-box
			g-part-title(:text="topTitle")
		.station-spread-content
			spread-chart(:serviceIncome="cityServiceIncome" :class="{'up-station-spread':cityServiceIncome.sericesData.length > 8}")
</template>

<script>
	import {mapGetters} from 'vuex'
	import spreadChart from './station-spread/index'
	export default {
		name: "station-spread",
		components: {
			spreadChart
		},
		computed:{
			... mapGetters('station',[
				'cityServiceIncome',
			]),
			topTitle(){
				return `各服务站产值分布(${this.cityServiceIncome.sericesData.length})`
			}

		}
	}
</script>

<style lang="stylus" scoped>
	.station-spread
		height 620px
		flex none
		width 25%
		padding 0 40px
		box-sizing border-box
		position relative
		.title-box
			position absolute
			left 0
			top 20px
		.station-spread-content
			box-sizing border-box
			overflow-x auto
			margin-top 80px
		.up-station-spread
			width 200%
</style>
