<template lang='pug'>
	.bottom-map
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-amap.map(ref="map" @init="onInit" :fitView="fitView" @click.native="onClickMap" :key="2" @mark-click="onMarkClick" :config="_config")
		.tool-row
			g-select-tree(:data="menuList" labelKey="name" v-model="city" @change="onChange")
			.service-map
				.service-map-item
					i.iconfont.icon-zuobiao
					span.name 正常营业
				.service-map-item
					i.iconfont.icon-zuobiao.disable
					span.name 试运营
		.detail-row
			g-container
				.title {{current.name}}
				.details-item
					span.name 建成时间
					span.value {{current.createTime}}
				.details-item
					span.name 服务站积分
					span.value {{current.integral}}
					arrows(:type="getType(current.integral,current.lastIntegral)")
				.details-item.last
					span.name 积分排名
					span.value {{current.rank}}
					arrows(:type="getRankType(current.rank, current.lastRank)")
</template>

<script>
	import GAmap from '@/components/g-amap'
	import {GSelectTree} from 'g-screen-ui'
	import {mapGetters} from 'vuex'
	import Arrows from '@/components/arrows'

	export default {
		name: "bottom-map",
		components: {GAmap, GSelectTree, Arrows},
		computed: {
			...mapGetters([
				'menuList',
				'level',
				'dq',
				'sf',
			]),
			...mapGetters('bottom-map', [
				'station',
				'loading'
			]),
		},
		data() {
			return {
				city: '',
				province: [],
				fitView: true,
				current: ''
			}
		},
		watch: {
			'station'(value) {
				// this.$refs.map.makeMarksByAddress(value)
				this.$refs.map.makeMarksByLnglat(value)
				if (value) {
					this.current = value[0] || {}
				}
			}
		},
		beforeCreate(){
			this._config = {
				dragEnable: true,
				zoomEnable: true,
				center: [105, 38],
				mapStyle: 'amap://styles/43d87e917f5c797eea14b603931ab391',
				zoom: 8
			}
		},
		created() {

		},
		methods: {
			onMarkClick(data){
				this.current = data
			},
			onInit() {
				if (!this.selected) {
					if (this.level == 0) {
						this.city = this.menuList[0]
					} else if (this.level == 1) {
						this.city = this.dq
					} else if (this.level == 2) {
						this.city = this.sf
					}
				} else {
					this.city = this.selected
				}
				this.loadStation()
			},
			onClickMap() {
			},
			loadStation() {
				this.$store.dispatch('bottom-map/get-station', this.city)
			},
			onChange() {
				this.$store.dispatch('bottom-map/get-station', this.city)
			},
			getType(value, lastValue){
				if(value > lastValue){
					return 'up'
				}else if(value < lastValue){
					return 'down'
				}else{
					return ''
				}
			},
			getRankType(value, lastValue){
				if(value < lastValue){
					return 'up'
				}else if(value > lastValue){
					return 'down'
				}else{
					return ''
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.bottom-map
		flex auto
		height 100%
		position relative
		.map
			>>> .amap-container
				background transparent !important

		.tool-row
			position absolute
			top 20px
			left 20px
			display flex

			>>> .g-select-tree
				width 260px

				&__label
					height 60px
					line-height 60px

			.service-map
				margin-left 40px
				font-size 26px
				line-height 40px
				display flex
				align-items center

				.service-map-item
					display flex
					align-items center
					height 60px
					line-height 60px
					margin-right 20px

				.iconfont
					color #EDA532
					font-size 40px
					margin-right 16px

					&.disable
						color #666

		.detail-row
			position absolute
			left 20px
			bottom 20px
			width 440px

			.title
				font-size 36px
				height 70px
				text-align center
				line-height 70px
				background rgba(0, 49, 115, .5)

			.details-item
				font-size 28px
				line-height 70px
				margin 0 20px
				border-bottom 1px solid rgba(0, 49, 115, .8)
				display flex
				align-items center
				&.last
					border none
				.name
					flex 1
					width 50%
				.value
					flex 1
					text-align right
					color $value-title-color
				>>>i
					font-size 32px


</style>
