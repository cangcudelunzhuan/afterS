<template lang='pug'>
	g-container.message-pane(v-if='!loading')
		.message-pane-item(v-for="(item, index) in list" :key="index" :class="{last: index == 2}")
			.title {{item.title}}
			.value
				span {{item.value | formatValue(index)}}
				span.symbol {{_sy[index]}}
			g-arrows(type="up" v-if='item.value > item.lastValue')
			g-arrows(type="down" v-if='item.value < item.lastValue')
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		name: "message-pane",
		beforeCreate(){
			this._sy = ['台次', '元', '%']
		},
		computed: {
			...mapGetters('top-map', [
				'list',
				'loading'
			])
		},
		filters:{
			formatValue (value, index) {
				if(!value || value == 'NaN') return '--'
				if(index == 1) {
					if(value>= 10000){
						return parseInt((value / 10000)*100)/100 + '万'
					}else{
						return parseInt((value)*100)/100
					}
				}
				if(index == 2){
					return (value*100).toFixed(1)
				}
				return value
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.message-pane
		background transparent !important
		padding 15px
		.message-pane-item
			height 80px
			line-height 80px
			font-size 36px
			background-image: linear-gradient(90deg, rgba(4, 65, 138, 0.70) 2%, rgba(4, 65, 138, .2) 100%)
			margin-bottom 10px
			display flex
			justify-content space-between
			&.last
				margin-bottom  0
			.title
				font-size 32px
				width 190px
				margin-left 20px
				color $value-content-color
				flex none
			.value
				color $value-title-color
				padding-right 10px
				text-align right
				flex auto
				.symbol
					font-size 24px
</style>
