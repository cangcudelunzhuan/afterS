<template lang="pug">
	g-container.left-container
		.title {{current.name ? current.name: current}}
		.num {{data.totalFwz | numFormat}}
			span 家
		.bottom 试运营
			span {{data.syyFwz | numFormat}}家
</template>

<script>
	export default {
		props: ['data', 'current'],
	}
</script>

<style lang="stylus" scoped>
	.left-container
		width 360px
		height 244px
		text-align center
		display flex
		flex-shrink 0
		flex-direction column

		.title
			background #04418A
			font-size 40px
			padding 20px

		.num
			font-size 60px
			color #EDA532
			margin-top 30px

			span
				font-size 30px
				margin-left 10px

		.bottom
			font-size 30px
			color rgba(82, 184, 223, 0.50)
			margin-top 15px

			span
				margin-left 10px
</style>
