<template lang="pug">
	section.section-box
		ul.tag-group
			li(v-for="(item, index) in data.geelyFwz" :key="index" :class="{'active':index == '0'}")
				tags(:data="item")
		.bottom-row
			station-rank
</template>

<script>
	import tags from './tags'
	import {mapGetters} from 'vuex'
	import StationRank from './station-rank'
	export default {
		props: ['data'],
		components: {
			tags,
			StationRank
		},
		computed: {
			...mapGetters('service-station-category', [
				'geelyFwz',
				'current'
			])
		},
	}
</script>

<style lang="stylus" scoped>
	.section-box
		display flex
		flex-direction column
		align-items space-between
		.tag-group
			padding 0
			margin 0
			display flex
			flex-wrap wrap
			li
				width 365px
				list-style none
				margin-left 20px
				font-size 30px

			li:nth-child(n+4)
				margin-top 20px
		.bottom-row
			margin-left 20px
</style>
