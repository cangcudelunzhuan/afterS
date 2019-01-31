<template lang='pug'>
	g-container.station-detail-view()
		.view-content
			.title-row {{station.dealerFullName}}
			.content-row
				img(:src="imgUrl")
				.value-row
					.item 累计进场台次：{{station.totalComingCnt | betterFormat}}
					.item 累计维修台次：{{station.repairCnt | betterFormat}}
					.item 累计维修产值：{{station.repairIncome | betterFormat}}
			.bottom-row
				.title 过夜车 (台)
				.box-list
					.box-item.box-item-1
						.value-label {{station.stayOvernight2Cnt}}
						.title-label 2-7天
					.box-item.box-item-2
						.value-label {{station.stayOvernight7Cnt}}
						.title-label 7-10天
					.box-item.box-item-3
						.value-label {{station.stayOvernight10Cnt}}
						.title-label >=10天
				.title 用户保持率
				.chart-row(v-if='retention.length > 0')
					left-chart( v-for='(item,index) in retention' :key="index" :data="item.value" :title="item.title")
				.no-data(v-else) 暂无数据
		img.arrow-shop(src="~img/arrow-shop.png")
		i.iconfont.icon-guanbi1(@click="onClose")
</template>

<script>
	import LeftChart from '../charts/left-chart'
	export default {
		name: "station-detail-view",
		components: {LeftChart},
		props:{
			station:{
				default:function () {
					return {}
				}
			}
		},
		watch:{
			'station'(value){
				if(value){
					this.load()
				}
			}
		},
		data(){
			return {
				userRetention: new this.HttpClass('/geely-after-sale/afterSale/userRetention'),
				retention: [],
				style: {}
			}
		},
		async mounted(){
			this.load()
		},
		computed:{
			imgUrl() {
				let index = (this.station.dealerId+ '').substr(-1,1)
				if(index > 8) index = 8
				if(index < 1) index  = 1
				return `static/station/${index}.png`
			}
		},
		methods:{
			load(){
				this.retention = []
				return this.userRetention.post({level:4, dealerId: this.station.dealerId})
					.then(response => {
						this.retention = response.data || []
					})
			},
			onClose(){
				this.$emit('close')
			}
		}
	}
</script>
<style>
	.amap-info {
		background: transparent;
	}
	.amap-info-content {
		background: transparent;
		border: none;
		box-shadow: none;
	}
	.amap-info-sharp {
		display: none;
	}
	.amap-info-close {
		display: none;
	}
	.amap-info-outer:hover {
		box-shadow: none;
	}
</style>
<style lang="stylus" scoped>
	.station-detail-view
		background transparent
		position relative
		margin-top -375px
		margin-left 100px
		>>>.icon-guanbi1
			position absolute
			font-size 50px
			top 30px
			right 30px
		.arrow-shop
			position absolute
			top 50%
			width 42px
			height 70px
			margin-top -35px
			left -45px
		.view-content
			background rgba(2,22,50,0.80)
			width 780px
			height 780px
			margin 9px
			z-index 999
			overflow hidden
			.title-row
				margin 40px 0
				text-align center
				font-size 40px
				color #EDA532
			.content-row
				display flex
				justify-content center
				img
					width 200px
					height 200px
					display block
					border none
					margin-right 40px
				.value-row
					font-size 32px
					color #52B8DF
					.item
						line-height 1em
						margin 20px 0
			.bottom-row
				margin 40px 0
				.title
					margin 20px 40px
					font-size 28px
			.box-list
				display flex
				font-size 28px
				justify-content center
				.box-item
					flex none
					position relative
					display flex
					text-align center
					width 200px
					align-items center
					justify-content center
					flex-direction column
					margin 0 20px
					height 100px
					&:after
						content ' '
						position absolute
						display block
						width 20px
						height 20px
						top 0
						left 0
					.value-label
						font-size 32px
					.title-label
						font-size  24px
						margin-top 8px
				.box-item-1
					color #EDA532
					background-image: linear-gradient(90deg, rgba(237,165,50,0.30) 2%, rgba(237,165,50,0.10) 100%);
					&:after
						background #EDA532
				.box-item-2
					color #4CB391
					background-image: linear-gradient(90deg, rgba(76,179,145,0.30) 2%, rgba(76,179,145,0.10) 100%);
					&:after
						background #4CB391
				.box-item-3
					color #52B8DF
					background-image: linear-gradient(-90deg, rgba(82,168,223,0.30) 2%, rgba(82,168,223,0.10) 100%);
					&:after
						background #52B8DF
			.chart-row
				justify-content center
				display flex
				height 160px
				>>>.left-chart
					height 100%
			.no-data
				text-align center
				font-size 24px
				margin-top 90px
				color #52B8DF
</style>
