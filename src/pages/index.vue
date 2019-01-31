<template lang='pug'>
	.top-page
		head-top
		transition(:name="name")
			router-view.top-page-content
		<!--g-float-ball(:data="data" @command="onCommand")-->
</template>

<script>
	import {mapState} from 'vuex'
	import HeadTop from './index/head-top'
	import Vue from 'vue'
	import {GFloatBall} from 'g-screen-ui'
	export default {
		name: "top-page",
		components: {HeadTop, GFloatBall},
		data(){
			return {
				name:'fade-Up',
				data:[
					{icon:'gs-icon-refresh', cmd:'R'},
					{icon:'gs-icon-undo', cmd:'B'},
					{icon:'gs-icon-md-arrow-round-up', cmd:'T'},
					{icon:'gs-icon-md-arrow-round-down', cmd:'U'},
					{icon:'gs-icon-md-unlock', cmd:'L'}
				]
			}
		},
		computed:{
			... mapState({
				level: 'level'
			})
		},
		methods: {
			swipe(event) {
				let type
				if(event.direction === 'Up'){
					type = 'bottom'
				}else if(event.direction === 'Down'){
					type = 'top'
				}else{
					return
				}
				this.name = `fade-${event.direction}`
				let level = this.level
				this.$router.push(`/pages/${type}/${level}`)
			},
			onCommand(item){
				let cmd = item.cmd
				if(!cmd) return
				switch (cmd) {
					case "R":
						window.location.reload()
						break
					case "B":
						this.$router.push(`/pages/city`)
						break
					case "T":
						this.$router.push(`/pages/top/${this.level}`)
						break
					case "U":
						this.$router.push(`/pages/bottom/${this.level}`)
						break
				}
			}
		}

	}
</script>

<style lang="stylus" scoped>
	.top-page
		display flex
		flex-direction column
		height 100vh
		overflow hidden
		.head-top
			flex none
		.top-page-content
			flex auto
			overflow hidden
</style>
<style>
	.fade-Up-enter-active {
		transition: all .3s ease;
	}
	.fade-Up-leave-active {
		transition: all .3s ease;
	}
	.fade-Up-enter {
		position: absolute;
		transform: translateY(100%);
		opacity: 0;
	}
	.fade-Up-leave-to {
		position: absolute;
		transform: translateY(-100%);
		opacity: 0;
	}

	.fade-Down-enter-active {
		transition: all .3s ease;
	}
	.fade-Down-leave-active {
		transition: all .3s ease;
	}
	.fade-Down-enter {
		position: absolute;
		transform: translateY(-100%);
		opacity: 0;
	}
	.fade-Down-leave-to {
		position: absolute;
		transform: translateY(100%);
		opacity: 0;
	}
</style>
