<template lang='pug'>
	g-part.first-failure
		g-part-title(text="首发故障")
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		failure-top.failure-top(:data="chartData" v-if="chartData" :title="topTitle")
		failure-table.failure-table(:data="startFailureData.cxRank" v-if="startFailureData" @change="onChange")
</template>

<script>
	import failureTop from './first-failure/failure-top'
	import failureTable from './first-failure/table'
	import {mapGetters} from 'vuex'

	export default {
		name: "first-failure",
		components: {
			failureTop,
			failureTable
		},
		data() {
			return {
				failureTrendy: new this.HttpClass('/geely-after-sale/afterSale/failureTrendy'),
				chartData: '',
				chex: ''
			}
		},
		computed: {
			...mapGetters('first-failure', [
				'startFailureData',
				'loading'
			]),
			topTitle () {
				let item  = this.chex || {}
				return  item.cx + ' ' +item.bnlj + '次'
			}
		},
		created() {
			this.$store.dispatch('first-failure/startFailure')
		},

		methods: {
			onChange (item) {
				this.chex = item
				this.failureTrendy.post({code:item.code})
					.then(response => {
						this.chartData = {...response.data}
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.first-failure
		width 540px
		padding 40px 20px
		height 900px
		-webkit-overflow-scrolling touch
		box-sizing border-box

		.failure-top, .failure-table
			margin-top 40px
		.failure-table
			overflow-y auto
			height 360px
</style>
