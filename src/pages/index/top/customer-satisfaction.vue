<template lang='pug'>
	g-part.customer-satisfaction
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="客户满意度")
		customer-chart(v-if='!loading')
</template>

<script>
	import customerChart from './customer-satisfaction/customer-chart'
	import {mapGetters} from 'vuex'

	export default {
		name: "customer-satisfaction",
		components: {
			customerChart
		},
		computed: {
			...mapGetters('customer-chart', [
				'loading'
			]),
			...mapGetters([
				'timestamp'
			])
		},
		data() {
			return {
				show: false
			}
		},
		created() {
			this.$store.dispatch('customer-chart/csi')
		},
		watch: {
			timestamp () {
				this.$store.dispatch('customer-chart/csi')
			}
		},
		mounted() {
		},
	}
</script>

<style lang="stylus" scoped>
	.customer-satisfaction
		margin-top 20px
		flex auto
		display flex
		box-sizing border-box
		flex-direction column

		>>> .g-part-title
			flex none
			margin-top 40px
			margin-left 40px

		>>> .customer-chart
			padding 0 40px
			box-sizing border-box
			margin-top 40px
			flex auto
</style>
