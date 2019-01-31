<template lang="pug">
	i.iconfont(:class="{'icon-arrowsup':ty==='up','icon-arrowsdown':ty==='down', 'icon-zuixiaohua':ty==='no' }")
</template>

<script>
	export default {
		props: ['type'],
		computed: {
			ty() {
				return this.type
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.icon-arrowsup
		icon-arrowsup-style()

	.icon-arrowsdown
		icon-arrowsdown-style()
	.icon-zuixiaohua
		color #ffffff
		font-size 24px
</style>
