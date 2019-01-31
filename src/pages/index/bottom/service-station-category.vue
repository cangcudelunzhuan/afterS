<template lang='pug'>
	g-part.service-station-category
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		.service-container
			left-part(:data="geelyFwz" v-if="geelyFwz" :current="current")
			right-part(:data="geelyFwz" v-if="geelyFwz")
</template>

<script>
	import leftPart from './service-station-category/left-part'
	import rightPart from './service-station-category/right-part'
	import {mapGetters} from 'vuex'
	export default {
		name: "service-station-category",
		components: {
			leftPart,
			rightPart
		},
		computed: {
			...mapGetters('service-station-category', [
	      'geelyFwz',
				'current',
				'loading'
	    	])
		},
		created () {
			this.$store.dispatch('service-station-category/geelyFwz')
		}
	}
</script>

<style lang="stylus" scoped>
	.service-station-category
		background-color transparent
		flex none
		margin-top 40px
		.service-container
			display flex
			margin-bottom 20px
			min-height 240px
			align-items flex-end
</style>
