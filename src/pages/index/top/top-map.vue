<template lang='pug'>
	.top-map
		<!--g-loading(:type="'wave'" :loading="loading" :text="'加载中'")-->
		g-amap.map(:level='level' @change-province="onClick" :province="province" ref="map" @init="onInit" :fitView="this.level != 0" @click.native="onClickMap" :depth="depth")
		.top-row
			g-part-title.g-part-title(:text="topTitle")
			g-select(:key="0" v-if='level == 0' v-model='selectedDq' :data="menuList" labelKey="name" valueKey="id" selectClass="top-select" @change="onChangeDq" )
			g-select(:key="1" v-if='level == 1' v-model='selectedDq' :data="menuList" labelKey="name" valueKey="id" selectClass="top-select" @change="onChangeDq1" :showBack="true" @go-back="onBack")
			g-select(:key="2" v-if='level == 2' v-model='selectedSf' :data="dq.children" :showBack="true" @go-back="onBack" labelKey="name" valueKey="id" selectClass="top-select" @change="onChangeSf")
		transition(name="g-list")
			message-pane(v-if='this.level == 0')
		transition(name="g-list")
			.title-box(v-if='this.level == 0 && province.length > 0')
				span {{dq.name}}
				.province
					span(v-for='name in province' :key="name") {{name}}
		img.img-left(src='~img/ruler-left.png')
		img.img-right(src='~img/ruler-right.png')
</template>

<script>
	import {mapGetters} from 'vuex'
	import GAmap from '@/components/g-amap'
	import MessagePane from './top-map/message-pane'
	import {GSelect} from 'g-screen-ui'

	export default {
		name: "top-map",
		components: {GAmap, GSelect, MessagePane},
		data() {
			return {
				province: [],//高亮得省份
				selectedDq: '',
				selectedSf: '',
				selectedCs: '',
				timer: null,
				playTimer: null,
				playIndex: 0
			}
		},
		computed: {
			...mapGetters([
				'menuList',
				'menuMap',
				'datalist',
				'level',
				'dq',
				'sf'
			]),
			...mapGetters('top-map', [
				'loading'
			]),
			depth() {
				return this.level > 1 ? 1 : 0
			},
			topTitle() {
				if (this.level == 0) {
					return '数据总览'
				} else if (this.level == 1) {
					return '大区'
				} else {
					return this.dq.name
				}
			}
		},
		watch: {},
		methods: {
			onClickMap() {
				window.dispatchEvent(new Event('mousedown'))
			},
			onChangeDq(item) {
				let list = []
				if (!item.children) return
				item.children.forEach(s => {
					list.push(s.name)
				})
				this.province = [...list]
				if(this.level == 0) {
					this.$store.dispatch('change-dq-noupdate', this.selectedDq)
				}else {
					this.$store.dispatch('change-dq', this.selectedDq)
				}
				this.$store.dispatch('top-map/year-progress')
			},
			onChangeDq1(item) {
				let list = []
				if (!item.children) return
				item.children.forEach(s => {
					list.push(s.name)
				})
				this.province = [...list]
				this.$store.dispatch('change-dq', this.selectedDq)
			},
			onChangeSf(item) {
				this.$store.dispatch('change-sf', item)
				this.province = [item.name]
			},
			onChangeCs(item) {
				this.$store.commit('cs', this.selectedCs)
			},
			onInit() {
				if (this.menuList.length == 0) return
				if (this.level == 0 || this.level == 1) {
					this.selectedDq = this.dq || this.menuList[0]
					this.onChangeDq(this.selectedDq)
				}
				if (this.level == 2) {
					this.selectedSf = this.sf
					this.onChangeSf(this.selectedSf)
				}
				this.playIndex = this.playIndex || 0
				if(this.playTimer) clearInterval(this.playTimer)
				this.playTimer = setInterval(()=>{
					if(this.level == 0){
						this.playIndex++
						this.selectedDq = this.menuList[this.playIndex]
						this.onChangeDq(this.selectedDq)
						if(this.playIndex == this.menuList.length - 1) this.playIndex = 0
					}
				},10000)
			},
			random(n, m){
				return Math.floor(Math.random()*(m-n+1)+n)
			},
			onClick(position) {
				//todo 点击了地图的省份
				window.dispatchEvent(new Event('mousedown'))
				let province = position.regeocode.addressComponent.province.replace('自治区', '')
				let city = position.regeocode.addressComponent.city
				let index = this.province.find(name =>{
					return name.indexOf(province) >= 0
				})
				if (index) {
					//todo 点击了高亮 也就是点击了当前大区 放大一个级别
					let level = this.level
					if (level == 0) {
						this.$refs.map.setFitView()
					}
					if (level == 1) {
						let name = province.replace('/(市|自治区|省)/g', '')
						this.province = [province]
						this.selectedSf = this.dq.children.find(item => item.name.indexOf(name) > -1)
						this.onChangeSf(this.selectedSf)
					}
					if (level == 2) {
						this.selectedCs = this.sf.children.find(item => item.name === city)
						this.onChangeCs(this.selectedCs)
						this.$router.push('/pages/city')
					}
					// if(level == 3) {
					// 	this.selectedCs = this.sf.children.find(item=>item.name === city)
					// 	this.onChangeCs(this.selectedCs)
					// }
					if (level == 2) return
					this.$store.commit('level', level + 1)
					this.$router.push(`/pages/top/${level + 1}`)
					this.commitUpdate()
				} else {
					if(this.level > 0) return
					//todo 点击其他地区
					let p = this.datalist.find(item => {
						let name = item.name.replace(/(族|自治区|市|省)/g, '')
						return province.indexOf(name) > -1 && item.id < 100000
					})
					let dq = this.menuMap[p.pId]
					if (dq) {
						this.selectedDq = dq
						this.onChangeDq(dq)
					} else {
						console.log('没有匹配到得一个大区')
					}
				}
			},
			onBack() {
				let level = this.level - 1
				if (level < 0) return
				if (level == 0) {
					this.$refs.map.resetPosition()
				}
				if (level == 1) {
					let list = []
					let item = this.dq
					if (!item.children) return
					item.children.forEach(s => {
						list.push(s.name)
					})
					this.province = [...list]
				}
				this.$store.commit('level', level)
				this.$router.push(`/pages/top/${level}`)
				this.commitUpdate()
			},
			commitUpdate() {
				if (this.timer) clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.$store.commit('update-data')
				})
			},
		},
		destroyed(){
			if (this.timer) clearTimeout(this.timer)
			if (this.playTimer) clearInterval(this.playTimer)
			this.timer = null
			this.playTimer = null
		}
	}
</script>

<style lang="stylus" scoped>
	div.top-map
		position relative
		height 1160px

		.img-left
			position absolute
			top 10px
			left 0
			width 62px

		.img-right
			position absolute
			top 10px
			right 0
			width 62px

		.map
			>>> div
				background transparent !important

			>>> canvas
				background transparent !important

			>>> .amap-container
				background transparent !important

		.top-row
			display flex
			position absolute
			top 0
			padding-left 100px
			padding-top 50px

		>>> .g-select
			margin-left 20px
			padding-left 20px
			box-sizing border-box

			.g-select__label
				height 70px
				line-height 70px

			.g-select__text
				font-size 32px

		>>> .message-pane
			position absolute
			left 100px
			bottom 100px

		.title-box
			position absolute
			box-sizing border-box
			width 360px
			height 88px
			top 50%
			right 20px
			background-image: linear-gradient(-90deg, rgba(237, 165, 50, 0.30) 0%, rgba(255, 210, 57, 0.00) 100%);
			border-bottom 1px solid rgba(237, 165, 50, .9)
			font-size 42px
			color $value-title-color
			line-height 88px
			padding-right 20px
			text-align right

			:before
				position absolute
				width 20px
				height 20px
				background rgba(237, 165, 50, .9)
		.province
			width 360px
			margin-top 10px
			font-size 24px
			line-height 40px
			display flex
			justify-content flex-end
			flex-wrap wrap
			span
				flex none
				color #52b8df
				padding 0 10px
</style>
