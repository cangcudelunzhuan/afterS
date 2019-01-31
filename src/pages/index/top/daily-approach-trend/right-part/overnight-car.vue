<template lang='pug'>
	.overnight-car
		.overnight-car-title 过夜车 (台)
		.overnight-car-content
			.line
			overnight-car-item(v-for="(item,index) in overnight" :key="index" :item="item" :color="_colors[index]")
</template>

<script>
	import {mapGetters} from 'vuex'
	import OvernightCarItem from './overnight-car-item'
	export default {
		name: "overnight-car",
		components: {OvernightCarItem},
		beforeCreate(){
			this._colors =  ['#EDA532', '#4CB391','#9CCAF0']
		},
		computed:{
			...mapGetters('daily-approach-trend-right',[
				'overnight'
			])
		},
	}
</script>

<style lang="stylus" scoped>
	.overnight-car
		.overnight-car-title
			color $value-content-color
			font-size 30px
		.overnight-car-content
			position relative
			display flex
			margin-top 40px
			flex-direction row
			.line
				box-sizing border-box
				margin 0 40px
				position absolute
				border-bottom: 1px dashed rgba(99,154,220,0.30);
				width 560px
				height 1
				top 62px
</style>
