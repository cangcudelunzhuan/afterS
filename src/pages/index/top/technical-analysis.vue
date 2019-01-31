<template lang='pug'>
	g-part.technical-analysis
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		.top-row
			g-part-title(text="技术分析")
			g-select(:data="chex" v-model='cx' labelKey="value" valueKey="key" @change="onChange" placeholder="请选择车系" backLabel="全部" :showBack="true" @go-back="onAll" )
		.pie-row()
			g-chart-liquidfill(:text="' '" radius="300")
			.ppm {{PPM}}
			.select-date
				.select-date-item(v-for='(item,index) in dates' :key="item" @click="changePPM(index)" :class="{current: index == indexMIS}")
					i.iconfont.icon-yuan
					span {{item}}
			technical-analysis-item(v-for='(item,index) in 4' :key="index" :index='index' :list="techAnalysis" @change="changeCurrent")
		g-chart.line-row
			g-grid(:left="10" :right="10" :top="60" :bottom="10")
			g-title(:text="current.title")
			g-xAxis(:data="faultTrendy.xAxisData" :boundaryGap="false")
			g-yAxis(name="台次")
			g-area(:data="faultTrendy.sericesData" :smooth="true" :areaStyle="_areaStyle" :lineStyle="_lineStyle" :showSymbol="showSymbol" :label="_lineLabel" :sericesLength="sericesLength")
</template>

<script>
	import {GChartLiquidfill} from 'g-chart'
	import {GSelect} from 'g-screen-ui'
	import {mapGetters} from 'vuex'
	import TechnicalAnalysisItem from './technical-analysis/tech-analysis-item'
	import {ChartHelper} from 'g-chart'

	export default {
		name: "technical-analysis",
		components: {GSelect, GChartLiquidfill, TechnicalAnalysisItem},
		props: {
			dates: {
				default: function () {
					return ['6MIS', '12MIS', '18MIS', '24MIS']
				}
			}
		},
		data() {
			return {
				cx: '',
				indexMIS: 1,
				showSymbol: true
			}
		},
		beforeCreate() {
			let vm = this
			this._axisLabel = {
				show: true
			}
			this._lineStyle = {
				color: '#0F5D90'
			}
			this._areaStyle = {
				color: ChartHelper.getLinearGradient('rgba(82,184,223, 0.5)', 'rgba(82,184,223, 0.1)')
			}
			this._lineLabel = {
				show:true,
				color: 'rgb(237, 165, 50)',
				position:'left',
				formatter:function (item) {
					if(item.dataIndex != vm.sericesLength-1) return ''
					return item.value
				}
			}
		},
		computed: {
			...mapGetters('technical-analysis', [
				'techAnalysis',
				'faultTrendy',
				'loading',
				'loading2',
				'current'
			]),
			...mapGetters([
				'chex',
				'timestamp'
			]),
			sericesLength () {
				if(!this.faultTrendy.sericesData) return 0
				return this.faultTrendy.sericesData.length
			},
			PPM() {
				if (!this.current) return '--'
				return parseInt(this.current.value[this.indexMIS])
			}
		},
		created() {
			this.$store.dispatch('technical-analysis/get-tech-analysis')
		},
		mounted() {
		},
		watch: {
			// 'timestamp'(){
			// 	this.$store.dispatch('technical-analysis/get-tech-analysis')
			// }
		},
		methods: {
			onAll() {
				this.cx = ''
				this.onChange()
			},
			changePPM(index) {
				this.indexMIS = index
			},
			onChange() {
				this.$store.dispatch('technical-analysis/set-cx', this.cx)
			},
			changeCurrent(item) {
				this.$store.dispatch('technical-analysis/set-current', item)
				this.indexMIS = 1
			}
		},
		destroyed() {
		}
	}
</script>

<style lang="stylus" scoped>
	.technical-analysis
		margin-top 20px
		flex auto
		width 1100px
		display flex
		flex-direction column

		.top-row
			flex none
			margin 40px 0 0 0
			padding 0 40px
			display flex
			justify-content center
			align-items center

			>>> .g-part-title
				flex auto

			>>> .g-select
				.g-select__label
					line-height 50px
					height 50px

		.pie-row
			position relative
			flex none
			padding 0 40px
			height 460px
			margin-top 40px
			box-sizing border-box

			.ppm
				position absolute
				width 400px
				text-align center
				font-size 70px
				top 120px
				left 50%
				margin-left -200px
				font-weight 600
				color $value-title-color

			>>> .g-chart-liquidfill
				background: url("./technical-analysis/circle.png") no-repeat center
				background-size 360px 360px
				height 300px
				padding 30px 0

			.select-date
				font-size 0
				width 300px
				margin 20px auto

				.select-date-item
					display inline-block
					height 28px
					width 50%
					font-size 28px
					color #9CCAF0
					margin 10px 0

					&.current
						color $value-title-color

					.icon-yuan
						margin 0 16px
						font-size 8px

		.line-row
			position relative
			flex auto
			box-sizing border-box
			margin-top 80px
			padding 0 40px
</style>
