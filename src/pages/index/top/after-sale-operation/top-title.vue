<template lang='pug'>
	.top-title
		i.iconfont.icon-yk_fangkuai_fill
		.content {{text}}
		i.iconfont.icon-yk_fangkuai_fill
</template>

<script>
	export default {
		name: "top-title",
		props: ['text']
	}
</script>

<style lang="stylus" scoped>
	.top-title
		display flex
		height 80px
		line-height 80px
		.iconfont
			vertical-align middle
			font-size 12px
			color #52B8DF
		.content
			background rgba(4,65,138,0.80)
			font-size 44px
			color #52B8DF
			vertical-align middle
			padding 0 58px
			margin 0 40px
			border-radius 40px 0 40px 0
</style>
