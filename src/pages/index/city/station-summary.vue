<template lang='pug'>
	g-container.station-summary
		.row
			.row-item
				.value
					span {{serviceInfo.totalServiceStation || 0}}
					span 家
				.title 服务站
			.line
			.row-item(:style='{flex:2}')
				.value
					span {{serviceInfo.totalRepairIncome | format}}
					span {{serviceInfo.totalRepairIncome>= 10000 ? '万' : ''}}
				.title 累计维修产值
			.line
			.row-item(:style='{flex:2}')
				.value
					span {{serviceInfo.totalComingCnt | format}}
					span(v-if='serviceInfo.totalComingCnt>= 10000') 万台
					span(v-else) 台
				.title 累计进场台次
		g-part-title(text="各车系维修量")
		.list
			.list-item(v-for="(item, index) in serviceInfo.catSeriesRepairNums" :key="index")
				.name {{item.key}}
				process-line.process-line(:percent="(item.value)/(serviceInfo.maxValue*1.2)*100")
				.value {{item.value}} 辆
</template>

<script>
	// import {mapGetters} from 'vuex'
	import ProcessLine from '@/components/process-line'
	export default {
		name: "station-summary",
		components:{ProcessLine},
		props: {
			serviceInfo:{
				default:function () {
					return {}
				}
			}
		},
		filters:{
			format (value){
				if (!value && value != 0) {
					return '--'
				}
				if(value >= 10000){
					return parseInt((value / 10000)*100)/100
				}else{
					return value
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.station-summary
		width 935px
		height 895px
		.row
			display flex
			align-items center
			margin 60px 0 70px 0
			.line
				flex none
				width 0
				border-left 2px solid rgba(99,154,220,0.30)
				height 60px
		.row-item
			flex 1
			text-align center
			.value
				color $value-title-color
				font-size 70px
				span:last-child
					font-size 32px
			.title
				margin-top 10px
				font-size 32px
		>>>.g-part-title
			margin 0 40px
		.list
			margin 70px 40px
			height 480px
			overflow-y scroll
			-webkit-overflow-scrolling touch
			.list-item
				display flex
				align-items center
				font-size 28px
				.name
					width 110px
					margin-right 48px
				.value
					flex 1
					text-align right
					padding-right 10px
				>>>.process-line
					flex none
					width 510px
					height 24px
		.list-item + .list-item
			margin-top 56px
</style>
