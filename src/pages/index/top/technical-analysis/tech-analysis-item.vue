<template lang='pug'>
	g-container.tech-analysis-item(:style="style" )
		.item-cell.item-1(@click="handledChange(item1)" :class="{current:item1 == current}")
			span(v-if='item1.title') {{index * 2 + 1}}.{{item1.title}}
		.item-cell.item-2(@click="handledChange(item2)" :class="{current:item2 == current}")
			span(v-if='item2.title') {{index * 2 + 2}}.{{item2.title}}
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		name: "tech-analysis-item",
		props: {
			list: {
				default: function () {
					return []
				}
			},
			index: {
				default: 0
			}
		},
		methods: {
			handledChange(item) {
				this.$emit('change', item)
			}
		},
		computed: {
			...mapGetters('technical-analysis', [
				'current'
			]),
			item1() {
				return this.list[this.index * 2] || {}
			},
			item2() {
				return this.list[this.index * 2 + 1] || {}
			},
			style() {
				return {
					top: this.index == 0 || this.index == 1 ? '0' : 'auto',
					left: this.index == 0 || this.index == 2 ? '.4rem' : 'auto',
					right: this.index == 1 || this.index == 3 ? '.4rem' : 'auto',
					bottom: this.index == 2 || this.index == 3 ? '0' : 'auto',

				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.tech-analysis-item
		position absolute !important
		padding 10px
		background transparent !important
		.item-cell
			font-size 28px
			background: linear-gradient(-90deg, rgba(4, 65, 138, 0.70) 0%, rgba(4, 65, 138, 0.00) 100%);
			width 280px
			height 60px
			line-height 60px
			overflow hidden
			white-space nowrap
			text-overflow ellipsis
			box-sizing border-box
			padding 0 10px

		.current
			color $value-title-color

		.item-1
			margin-bottom 10px
</style>
