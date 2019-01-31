<template lang='pug'>
	g-part.daily-approach-trend
		left-part
		right-part
</template>

<script>
	import LeftPart from './daily-approach-trend/left-part'
	import RightPart from './daily-approach-trend/right-part'
	export default {
		name: "daily-approach-trend",
		components: {LeftPart, RightPart}
	}
</script>

<style lang="stylus" scoped>
	.daily-approach-trend
		width 100%
		height 1200px
		flex none
		display flex
</style>
