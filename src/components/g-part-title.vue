<template lang='pug'>
	.g-part-title
		i.iconfont.icon-yk_fangkuai_fill
		span.name {{text}}
</template>

<script>
	export default {
		name: "g-part-title",
		props: ['text']
	}
</script>

<style lang="stylus" scoped>
	.g-part-title
		height 56px
		line-height 56px
		font-size 0
		.icon-yk_fangkuai_fill
			color #52B8DF
			display inline-block
			font-size 30px
			vertical-align middle
		.name
			padding-left 30px
			display inline-block
			color #ffffff
			font-size 50px
			vertical-align middle
			font-weight 300
</style>
