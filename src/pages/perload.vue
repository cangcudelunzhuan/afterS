<template lang='pug'>
	.perload
		.message {{msg}}
</template>

<script>
	import {getUser, getMenu} from 'fetch/auth'
	import {getNewChex} from 'fetch/top'
	export default {
		name: "perload",
		data(){
			return {
				msg:'获取用户信息...'
			}
		},
		mounted() {
			this.load()
		},
		methods: {
			async load(){
				this.$store.dispatch('get-chex')
				let user = await getUser()
				if(user){
					this.$store.commit('user', user)
				}
				let menu = await getMenu()
				let newChex = await getNewChex()
				if(menu){
					let list = menu.filter(item => {
						return item.id && item.name && item.pId
					})
					this.formatMenu(menu)
				}
				this.$store.commit('datalist', menu)
				this.$store.commit('newChex', newChex)
				this.$store.commit('level', 0)
				this.$router.push('/pages/top/0')
			},
			formatMenu(menu){
				let menuMap = {}
				let menuList = []
				menu.forEach(item => {
					menuMap[item.id] = item
				})
				menu.forEach(item => {
					if(!item.pId) {
						menuList.push(item)
					}else{
						let p = menuMap[item.pId]
						if(p) {
							if(!p.children) p.children = []
							p.children.push(item)
						}
					}
				})
				this.$store.commit('menuMap', menuMap)
				this.$store.commit('menuList', menuList)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.message
		font-size 28px
		text-align center
		margin-top 15%
</style>
