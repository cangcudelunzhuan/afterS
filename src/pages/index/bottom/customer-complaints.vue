<template lang='pug'>
	g-part.customer-complaints
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="客户抱怨")
		.complaints-top
			.items
				top-left(:ksjData="ksj" :chartData="ksjList" v-if="ksj||ksjList")
			.items
				top-right(:data="xyAndBh" v-if="xyAndBh")
		.complaints-table
			.title-box
				tab(:data="tabData" @getActive="getActive" v-if="tsly||tsfl")
				<!--
				.select-box
					g-select(:key="1" :data="dqList") -->
			.table-box
				tableCompents(:data="tsly" @forsort="forsort"
				v-if="tabData.active === 0&&tsly" )
				tableSecondCompents(:data="tsfl" @forsort="forsort"
				v-if="tabData.active === 1&&tsfl" )
</template>

<script>
	import topLeft from './customer-complaints/top-left'
	import topRight from './customer-complaints/top-right'
	import tableCompents from './customer-complaints/table'
	import tableSecondCompents from './customer-complaints/table'
	import tab from '@/components/tab'
	import {GSelect} from 'g-screen-ui'
	import {mapGetters} from 'vuex'
	export default {
		name: "customer-complaints",
		components: {
			topLeft,
			topRight,
			tab,
			tableCompents,
			tableSecondCompents,
			GSelect
		},
		computed: {
			...mapGetters('customer-complaints', [
				'loading',
				'ksj',
			  'loading',
			  'xyAndBh',
			  'tsly',
			  'tsfl',
			  'ksjList'
			])
		},
		created () {
			this.$store.dispatch('customer-complaints/userComplaint')
		},
		data () {
			return {
				dqList: [],
				tabData: {
					active : 0,
					item: [
						'投诉来源',
						'投诉分类'
					]
				}
			}
		},
		methods: {
			getActive (i) {
				this.tabData.active = i
			},
			forsort (type) {
				// console.log('type' + type)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.customer-complaints
		flex auto
		margin-top 20px
		padding 40px
		position relative
		overflow-y scroll
		-webkit-overflow-scrolling touch
		.complaints-top
			margin-top 40px
			display flex
			justify-content space-between
			.items
				flex 1
			.items + .items
				margin-left 60px
		.complaints-table
			margin-top 40px
			.title-box
				display flex
				justify-content space-between
				position relative
				margin-bottom 40px
				.select-box
					position absolute
					right 0
					top -30px
			>>>.g-select
					width 264px
					.g-select__label
						height 50px
						line-height 50px
						text-align center
						.g-select__text
							font-size 26px
</style>
