<template lang='pug'>
	g-part.telephone-satisfaction
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="电话满意度")
		.telpostion
			.content(v-for="(item, index) in TelephoneSatisfactionData.data" :key="'tel'+index")
				telephone-chart(:data="item" v-if="index === showFlag")
			.telSelectpositon
				g-select(:data="TelephoneSatisfactionData.title"
				@change="onChangeChex" v-model="ChexSelect"
				labelKey="value" valueKey="key"
				v-if="ChexSelect")
</template>

<script>
	import TelephoneChart from './telephone-satisfaction/telephone-chart'
	import {GSelect} from 'g-screen-ui'
	import {mapGetters} from 'vuex'
	export default {
		name: "telephone-satisfaction",
		components: {
			TelephoneChart,
			GSelect
		},
		computed: {
			...mapGetters('telephone-satisfaction', [
				'TelephoneSatisfactionData',
				'loading'
			])
		},
		created () {
			this.$store.dispatch('telephone-satisfaction/tsi')
		},
		watch: {
			'TelephoneSatisfactionData.title' (val) {
				this.ChexSelect = val[0]
			}
		},
		data () {
			return {
				ChexSelect: null,
				showFlag: 0
			}
		},
		methods: {
			onChangeChex (val){
				this.ChexSelect= this.TelephoneSatisfactionData.title[val.key]
				this.showFlag = val.key
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.telephone-satisfaction
		margin-top 20px
		height 500px
		flex none
		padding 40px
		box-sizing border-box
		.telpostion
			position relative
			.content
				overflow-x auto
			.telSelectpositon
				position absolute
				right 0
				top -80px
				>>>.g-select
						width 206px
						.g-select__label
							height 60px
							line-height 60px
							text-align center
							.g-select__text
								font-size 30px
								min-width 70px
								overflow hidden
								text-overflow ellipsis
								white-space nowrap
								margin-right 3px
							.gs-icon
								width 50px
								height 50px
</style>
