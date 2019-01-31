<template lang='pug'>
	g-part.sms-satisfaction
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-part-title(text="短信满意度")
		.smsposition
			.selectposition
				g-select(:data="SmsChartData.title"
				@change="onChangeChex" v-model="ChexSelect"
				labelKey="value" valueKey="key"
				v-if="ChexSelect")
			.content(v-for="(item, index) in SmsChartData.data" :key="'sms'+index")
				sms-chart(:data="item" v-if="index === showFlag")
</template>

<script>
	import {mapGetters} from 'vuex'
	import SmsChart from './sms-satisfaction/sms-chart'
	import {GSelect} from 'g-screen-ui'
	export default {
		name: "sms-satisfaction",
		components: {
			SmsChart,
			GSelect
		},
		computed: {
			...mapGetters('sms-satisfaction', [
	      'SmsChartData',
				'loading'
	    ])
		},
		data () {
			return {
				ChexSelect: null,
				showFlag: 0
			}
		},
		created () {
			this.$store.dispatch('sms-satisfaction/sms')
		},
		watch: {
			'SmsChartData.title' (val) {
				this.ChexSelect = val[0]
			}
		},
		methods: {
			onChangeChex (val){
				this.ChexSelect= this.SmsChartData.title[val.key]
				this.showFlag = val.key
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.sms-satisfaction
		height 500px
		padding 40px
		flex none
		.smsposition
			position relative
			.selectposition
				position absolute
				top -80px
				right 0
			.content
				overflow-x auto
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
