<template lang='pug'>
	.left-item
		title-item(:text="item.title" v-if='type === 0')
		.sub-title(v-if='type === 1') {{item.title}}
		.content-row
			span.value-1
				i {{item.value | betterFormat}}
				i.symbol {{index == 3?'元':'台'}}
			span.value-2
				i {{Math.abs(item.tb*100) | pointFormat}}
				i.symbol %日同比
			i.iconfont.icon-arrowsdown(v-if='item.tb<0')
			i.iconfont.icon-arrowsup(v-if='item.tb>0')
		.gap(v-if='gap')
</template>

<script>
	import TitleItem from './title-item'

	export default {
		name: "left-item",
		components: {TitleItem},
		props: {
			item: {
				default: function () {
					return {}
				}
			},
			type: {
				default: 0
			},
			gap: {
				default: false
			},
			index: {
				default: 0
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.left-item
		.sub-title
			text-align center
			font-size 30px
			color $title-color
			margin-top 50px

		.content-row
			margin-top 30px
			text-align center
			height 50px
			line-height 50px
			font-size 0px
			i
				font-style normal
				&.symbol
					font-size 24px
			span
				display inline-block

			.value-1
				value-title-style()
				margin-right 16px

			.value-2
				value-content-style()

			.icon-arrowsdown
				color #4CD690
				font-size 14px

			.icon-arrowsup
				color #E86339
				font-size 14px

		.gap
			height 0
			width 200px
			margin 50px auto
			border-bottom 2px solid rgba(82, 184, 223, 0.20)
</style>
