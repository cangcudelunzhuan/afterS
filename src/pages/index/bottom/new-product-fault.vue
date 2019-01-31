<template lang='pug'>
	g-part.new-product-fault
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-select.chex-select(:data="newChex" @change="onChangeChex" v-model="ChexSelect" labelKey="value" valueKey="key" v-if="ChexSelect")
		g-part-title(text="新品故障")
		.fault-content
			fault-top(:data="newProductFailureData" v-if="newProductFailureData")
			fault-bottom.fault-bottom(:data="newProductFailureData" v-if="newProductFailureData")
</template>

<script>
	import faultTop from './new-product-fault/fault-top'
	import faultBottom from './new-product-fault/fault-bottom'
	import {GSelect} from 'g-screen-ui'
	import {mapGetters} from 'vuex'

	export default {
		name: "new-product-fault",
		components: {
			faultTop,
			faultBottom,
			GSelect
		},
		computed: {
			...mapGetters('new-product-fault', [
				'newProductFailureData',
				'loading'
			]),
			...mapGetters([
				'newChex',
				'menuList'
			])
		},
		mounted(){
			this.ChexSelect = this.newChex[0]
			this.onChangeChex(this.ChexSelect)
		},
		data() {
			return {
				ChexSelect: null
			}
		},
		methods: {
			onChangeChex(val) {
				this.ChexSelect = val
				let params = {
					carType: val.value
				}
				this.$store.dispatch('new-product-fault/newProductFailure', params)
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.new-product-fault
		position relative
		width 540px
		padding 40px 20px
		height 900px
		box-sizing border-box
		margin-left 20px
		overflow-y scroll
		-webkit-overflow-scrolling touch

		>>>.g-select
			position absolute
			right 20px
			top 45px
			.g-select__label
				height 50px
				line-height 50px
			.g-select__text
				min-width 60px
				font-size 30px
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
				margin-right 3px

		.fault-content
			margin-top 40px
			position relative

		.fault-bottom
			margin-top 40px
</style>
