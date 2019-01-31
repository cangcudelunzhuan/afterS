<template lang='pug'>
	.title-item
		img(src='./images/title-left.png')
		span.text {{text}}
		img(src='./images/title-right.png')
</template>

<script>
	export default {
		name: "title-item",
		props: ['text']
	}
</script>

<style lang="stylus" scoped>
	.title-item
		line-height 56px
		text-align center
		img
			width 30px
			height 20px
		.text
			title-style()
			text-align center
			margin 0 20px
</style>
