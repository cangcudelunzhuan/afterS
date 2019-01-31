<template lang='pug'>
	g-part.technical-activities
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="技术活动执行情况")
		.technical-main
			technical-item(:data="item"
			v-for="(item, index) in activitiesData" :key="index")
</template>

<script>
	import technicalItem from './technical-activities/technical-item'
	import technicalItemSecond from './technical-activities/technical-item'
	import {mapGetters} from 'vuex'

	export default {
		name: "technical-activities",
		components: {
			technicalItem,
			technicalItemSecond
		},
		computed: {
			...mapGetters('technical-activities', [
				'activitiesData',
				'loading'
			])
		},
		created() {
			this.$store.dispatch('technical-activities/activities')
		},
		data() {
			return {}
		}
	}
</script>

<style lang="stylus" scoped>
	.technical-activities
		flex auto
		padding 40px
		margin-top 20px
		overflow-y scroll
		-webkit-overflow-scrolling touch
		position relative

		.technical-main
			margin-top 10px
</style>
