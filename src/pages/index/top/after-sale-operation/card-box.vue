<template lang="pug">
	.operation-card
		.operation-cart-item(v-for="(item, index) in itemdata" :key="index")
			.title {{item.title}}
			.content(v-if='index == 3' :class="{other:index>2}")
				span {{item.value*100 | pointFormat}}
				span.symbol {{s[index]}}
			.content(v-else :class="{other:index > 1}")
				span {{item.value | betterFormat}}
				span.symbol {{s[index]}}
			.content.month(v-if='index < 2')
				span {{index == 0 ? '月均' : '本月'}}{{item.avg | betterFormat}}
				span.symbol {{s[index]}}
			.bottom(v-if='index<3') {{Math.abs(item.tb*100) | pointFormat}}%年同比
				.arrow
					g-arrows(type="up" v-if='item.tb>0')
					g-arrows(type="down" v-if='item.tb<0')
			.bottom(v-else) {{Math.abs(item.tb*100) | pointFormat}}%月环比
				.arrow
					g-arrows(type="up" v-if='item.tb>0')
					g-arrows(type="down" v-if='item.tb<0')
					g-arrows(type="no" v-if='item.tb==0')

</template>

<script>
	export default {
		props: ['data'],
		data(){
			return {
				s: ['元', '台', '元', '%']
			}
		},
		computed: {
			itemdata() {
				return this.data
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.operation-card
		flex none
		height 280px
		background rgba(26, 103, 232, 0.10)
		box-shadow 0 0 5px rgba(0, 0, 0, .2)
		border 2px solid rgba(4, 65, 138, 0.20)
		box-sizing border-box
		display flex
		align-item center
		.operation-cart-item
			position relative
			font-size 36px
			height 200px
			padding 40px 0
			display flex
			flex-direction column
			flex 1
			text-align center
			.title
				font-size 40px
				line-height 40px

			.content
				color #EDA532
				margin-top 25px
			.month
				font-size 28px
			.other
				line-height 90px
			.bottom
				font-size 28px
				margin-top 25px
				display flex
				align-item center
				justify-content center

				.arrow
					margin-left 10px
		.symbol
			font-size 24px
		.operation-cart-item + .operation-cart-item::before
			width 1px
			height 50%
			background rgba(82, 184, 223, 0.20)
			position absolute
			content ''
			top 0
			bottom 0
			left 0
			margin auto 0
</style>
