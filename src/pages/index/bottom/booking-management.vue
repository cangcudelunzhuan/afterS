<template lang='pug'>
	g-part.booking-management
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		left-part(:data="pieData")
		.right
			g-part-title(:text="topTitle")
			right-top(:data="appointMangeData.yy" v-if="appointMangeData")
			right-bottom(:data="appointMangeData.jztc" v-if="appointMangeData")
</template>

<script>
	import leftPart from './booking-management/left-part'
	import rightTop from './booking-management/right-top'
	import rightBottom from './booking-management/right-bottom'
	import {mapGetters} from 'vuex'
	export default {
		name: "booking-management",
		components: {
			leftPart,
			rightTop,
			rightBottom
		},
		computed: {
			...mapGetters('booking-management', [
				'pieData',
				'loading',
				'appointMangeData'
			]),
			...mapGetters([
				'level',
			]),
			topTitle(){
				if(this.level == 0){
					return '全国预约管理'
				}else if(this.level == 1){
					return '大区预约管理'
				}else{
					return '省级预约管理'
				}

			}
		},
		created () {
			this.$store.dispatch('booking-management/userRetention')
			this.$store.dispatch('booking-management/appointMange')
		}
	}
</script>

<style lang="stylus" scoped>
	.booking-management
		flex none
		height 900px
		display flex
		.right
			padding 40px
			overflow-y scroll
			-webkit-overflow-scrolling touch
</style>
