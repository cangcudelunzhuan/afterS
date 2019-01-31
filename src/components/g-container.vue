<template lang='pug'>
	.g-container
		slot
		i.corner.top-left
		i.corner.top-right
		i.corner.bottom-left
		i.corner.bottom-right

</template>

<script>
	export default {
		name: "g-container",

	}
</script>

<style lang="stylus" scoped>
	$offset = -2px
	.g-container
		position relative
		min-height 20px
		min-width 20px
		background rgba(26,103,232,0.10)
		box-shadow 0 0 5px rgba(0,0,0,.2)
		border 2px solid rgba(4,65,138,0.20)
		box-sizing border-box
		.corner
			position absolute
			display block
			border-color #52B8DF
			border-style solid
			height 10px
			width 10px
			&.top-left
				border-width 4px 0 0 4px
				top $offset
				left $offset
			&.top-right
				border-width 4px 4px 0 0
				top $offset
				right $offset
			&.bottom-left
				border-width 0 0 4px 4px
				bottom $offset
				left $offset
			&.bottom-right
				border-width 0 4px 4px 0px
				bottom $offset
				right $offset
</style>
