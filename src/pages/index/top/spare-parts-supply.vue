<!--备件供应-->
<template lang='pug'>
	g-part.spare-parts-supply
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="备件供应")
		.select-box
			g-select(:data="selectArr"
			@change="onChangeChex" v-model="ChexSelect"
			labelKey="value" valueKey="key"
			v-if="ChexSelect")
		.spare-parts-supply-main
			supply-Top(:data="topData[selectFlag]")
		.select-row
			tabbox(:data="tabData" @getActive="getActive")
			g-select(:data="jsl" :key='22' v-if='this.tabData.active == 0'
			@change="onChangeJsl" v-model="currentJsl"
			labelKey="title" valueKey="title")

			g-select(:data="mzl" :key='33' v-if='this.tabData.active == 1'
			@change="onChangeMzl" v-model="currentMzl"
			labelKey="title" valueKey="title")
		g-chart.bottom-chart(v-if="tabData.active == 0 && currentJsl")
			g-grid(:left="20" :right="20" :top="30" :bottom="10")
			g-legend(:data='lengendData' :right="20")
			g-xAxis(:data='xAxisData' :boundaryGap="false")
			g-yAxis()
			g-area(:key='1' :showSymbol='true' :serieIndex='0' :name='lengendData[0]' :data="bjzx.lineSericesData")
			g-area(:key='2' :showSymbol='true' :serieIndex='1' :name='lengendData[1]' :data="currentJsl.value.lineSericesData[0]")
		g-chart.bottom-chart(v-if="tabData.active == 1 && currentMzl" :key="123")
			g-grid(:left="20" :right="20" :top="30" :bottom="10")
			g-legend(:data='lengendData' :right="20" width="100%")
			g-xAxis(:data='xAxisData' :boundaryGap="false")
			g-yAxis(:key="'bjzxY'")
			g-area(v-for="(item,index) in currentMzl.value.lineSericesData" :key="'bjzx'+index" :showSymbol='true' :serieIndex='index'
			:name='currentMzl.value.lineLengendData[index]' :label='_label[index]'
			:data="item")
</template>

<script>
	import supplyTop from './spare-parts-supply/supply-top'
	import tabbox from '@/components/tab'
	import supplyChart from './spare-parts-supply/supply-chart'
	import {mapGetters} from 'vuex'
	import {GSelect} from 'g-screen-ui'

	export default {
		name: "spare-parts-supply",
		components: {
			supplyTop,
			tabbox,
			supplyChart,
			GSelect
		},
		computed: {
			...mapGetters('spare-parts-supply', [
				'yearMbz',
				'monthMbz',
				'jsl',
				'mzl',
				'bjzx',
				'loading'
			]),
			topData() {
				return {
					yearMbz: this.yearMbz,
					monthMbz: this.monthMbz
				}
			}
		},
		created() {
			this.$store.dispatch('spare-parts-supply/sparesProvide')
			this.ChexSelect = this.selectArr[0]
		},
		beforeCreate() {
			this._label =[{
				show: true,
				color: 'rgb(4, 65, 138)',
				position:'left',
				distance:0,

			},{
				show: true,
				color: 'rgb(36, 119, 131)',
				position:'right',
			},{
				show: true,
				color: 'rgb(237, 165, 50)',
				distance:2,
				position:'top'
			}]
		},
		watch:{
			'jsl' (value) {
				if(value && value.length > 0){
					this.getActive(0)
				}
			}
		},
		data() {
			return {
				tabData: {
					active: 0,
					item: ['及时率', '满足率']
				},
				selectArr: [{value: '年', key: 'yearMbz'}, {value: '月', key: 'monthMbz'}],
				selectFlag: 'yearMbz',
				ChexSelect: [],
				currentJsl: '',
				currentMzl: '',
				lengendData: [],
				xAxisData: [],
				listData:[],
			}
		},
		methods: {
			getActive(i) {
				this.tabData.active = i
				this.xAxisData = [...this.bjzx.xAxisData]
				if(i == 0 ){
					this.currentJsl = this.jsl[0]
					this.lengendData = [...this.bjzx.lineLengendData, ...this.currentJsl.value.lineLengendData]
				}else{
					this.currentMzl = this.mzl[0]
					console.log(this.currentMzl)
					this.lengendData = [...this.currentMzl.value.lineLengendData]
				}
			},
			onChangeChex(val) {
				this.selectFlag = val.key
			},
			onChangeJsl() {
				this.lengendData = [...this.bjzx.lineLengendData, ...this.currentJsl.value.lineLengendData]
			},
			onChangeMzl() {
				this.lengendData = [...this.currentMzl.value.lineLengendData]
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.spare-parts-supply
		flex none
		height 780px
		width 1100px
		position relative

		>>> .g-part-title
			margin-left 40px
			margin-top 40px
		>>> .g-select
			.g-select__label
				height 50px
				line-height 50px
				text-align center
				.g-select__text
					font-size 28px
					min-width 70px
					overflow hidden
					text-overflow ellipsis
					white-space nowrap
					margin-right 3px
		.select-box
			position absolute
			right 40px
			top 20px


		.spare-parts-supply-main
			padding 0 40px

		.select-row
			padding 40px 40px 20px 40px
			display flex
			justify-content space-between
			align-items center
		.bottom-chart
			height 340px
</style>
