<template lang="pug">
	#app
		router-view(:style="{overflow: 'hide'}")
</template>

<script>
	export default {
		name: 'App'
	}
</script>
<style lang="stylus">
	*
		letter-spacing 2px
	html
		font-family "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
		font-size 28px
		line-height 1
		overflow hidden
	body
		height 100vh
		margin 0
		padding 0
		color #52B8DF
		overflow hidden

	#app
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-touch-callout: none; /* iOS Safari */
		-webkit-user-select: none; /* Safari */
		-khtml-user-select: none; /* Konqueror HTML */
		-moz-user-select: none; /* Firefox */
		-ms-user-select: none; /* Internet Explorer/Edge */
		user-select: none;
		height 100vh
		background url("~img/bg.png") no-repeat center center
		background-size cover
		overflow hidden
	.g-select-dropdown
		padding 10px 0
		width 265px
		min-width 265px!important
		z-index 99
		.g-option
			line-height 60px !important
			height 60px !important
			font-size 28px !important
			padding 0 20px !important
</style>
