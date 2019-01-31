<template lang="pug">
	g-container.left-part
		.top-img
		.title-box
			title-item(:text="data.title||'用户保持率'")
		left-chart(v-for="(item, index) in data" :key="index" :data="item.value" :title="item.title")
</template>

<script>
	import TitleItem from '@/pages/index/top/daily-approach-trend/left-part/title-item'
	import leftChart from '../../charts/left-chart'

	export default {
		// props: ['data'],
		props: {
			data: {
				default: function () {
					return {}
				}
			}
		},
		components: {
			TitleItem,
			leftChart
		}
	}
</script>

<style lang="stylus" scoped>
	.left-part
		width 320px
		height 900px
		position relative
		display flex
		flex-direction column
		align-items center
		.top-img
			position absolute
			top 0
			margin-left -80px
			left 50%
			height: 0
			width 160px
			border-top 12px solid #04418A
			border-left 12px solid transparent
			border-right 12px solid transparent
		.title-box
			margin 30px 0 30px 0
		>>>.left-chart
			width 160px
			height 160px
</style>
