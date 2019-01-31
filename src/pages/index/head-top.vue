<template lang='pug'>
	.head-top
		input(type="hidden" v-model="sf.name")
		input(type="hidden" v-model="dq.name")
		.head-top-content
			.title-box(@click="goIndex") 吉利售后
				span.yellowFont {{levelFont}}
				span 晴雨表
				span.afterbox AFTER-SALE MONITOR
			.box-empty(@click="onItem")
			.time-box(@click="goIme")
				span {{time}}
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		name: "head-top",
		data(){
			return {
				type: 'top',
				path: '',
				levelFont: '',
				getTime: new this.HttpClass('/geely-after-sale/afterSale/getDateTime'),
				time:''
			}
		},
		computed:{
			... mapGetters([
				'level',
				'sf',
				'dq'
			])
		},
		watch: {
			$route(to, from) {
				this.setTitle()
			},
			'sf.name' (val) {
				this.setTitle()
			},
			'dq.name' (val) {
				this.setTitle()
			}
		},
		beforeCreate(){
			let tt = 1000*60*30
			// let tt = 1000
			this._timer = setInterval(() => {
				this.loadTime()
			}, tt)
		},
		destroyed(){
			if(this._timer) clearInterval(this._timer)
			this._timer = null
		},
		created () {
			this.setTitle()
			this.loadTime()
		},
		methods:{
			onItem () {
				this.type = this.type === 'top' ? 'bottom' : 'top'
				this.$router.push(`/pages/${this.type}/${this.level}`)
			},
			goIndex() {
				window.location.reload()
			},
			goIme(){
				window.location.replace('http://data.geely.com/cloudbigscreen/#/ime')
			},
			setTitle () {
				let path = this.$route.path.split('/')
				let p = path[2]
				let level = this.level
				if (p === 'city') {
					le = '服务站'
				} else if (level === 0) {
					le = '全国'
				}	else if (level === 1) {
					le =  this.dq.name
				}	else if (level === 2) {
					le =  this.sf.name
				}
				this.levelFont = `${le}`
				document.title = `吉利售后${le}晴雨表`
			},
			loadTime(){
				if(!this.getTime) return
				this.getTime.post()
					.then(response => {
						if(!this.time){
							this.time = response.data
						}else{
							if(this.time !== response.data){
								//todo need update data
								window.location.reload()
							}
						}
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.head-top
		color #408DE7
		height 140px
		font-weight 500
		.head-top-content
			background url("~img/top.png") no-repeat
			background-size contain
			padding 0 60px
			font-size 66px
			position fixed
			display flex
			flex-direction row
			line-height 140px
			width 100%
			height 140px
			z-index 200
			box-sizing border-box
			.afterbox
				margin-left 20px
			.title-box
				flex none
				.yellowFont
					color #eda532
			.box-empty
				flex auto
</style>
