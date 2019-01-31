<template lang='pug'>
	.city
		g-loading(:type="'wave'" :loading="loading" :text="'加载中'")
		g-amap(@init="onInit" ref="map" :config="_config" @mark-click="handleMarkClick")
		station-summary(:serviceInfo="serviceInfo" v-if="serviceInfo.totalServiceStation")
		.select-row(v-if="sfList.length > 0")
			g-select(:key='1' v-model='selectedSf' :data="sfList" :showBack="true" @go-back="onBack" class='sf-select' labelKey="name" valueKey="id" @change="onChangeSf")
			g-select(:key='2' v-model='selectedCs' :data="sf.children" class='city-select' labelKey="name" valueKey="id" @change="onChangeCs")
		.bottom-row
			station-spread(v-if="cityFlag")
			station-point-spread(v-else :serviceIncome="serviceIncome")
			customer-complaints(:custComplaints="custComplaints")
			booking-management(:appointment="appointment")
			satisfaction-trend(:serviceSatisfaction="serviceSatisfaction")
</template>

<script>
	import Vue from 'vue'
	import GAmap from '@/components/g-amap'
	import BookingManagement from './city/booking-management'
	import CustomerComplaints from './city/customer-complaints'
	import StationSpread from './city/station-spread'
	import StationPointSpread from './city/station-point-spread'
	import StationSummary from './city/station-summary'
	import SatisfactionTrend from './city/satisfaction-trend'
	import StationDetailView from './city/station-detail-view'
	import {mapGetters} from 'vuex'
	import {GSelect} from 'g-screen-ui'
	export default {
		name: "city",
		components: {
			GAmap,
			StationSummary,
			BookingManagement,
			CustomerComplaints,
			StationSpread,
			StationPointSpread,
			SatisfactionTrend,
			GSelect,
			StationDetailView
		},
		data(){
			return {
				selectedSf:'',
				selectedCs:'',
				selectedStation: '',
				pixel: '',
				cityFlag: true,
				sfList:[],
				detailView: new Vue({
					store: this.$store,
					extends: StationDetailView
				}).$mount()
			}
		},
		beforeCreate(){
			this._config = {
				dragEnable: true,
				zoomEnable: true,
				center: [105, 38],
				mapStyle: 'amap://styles/cb4e7dbd034bf296c04d1a9c97b6723a',
				zoom: 8
			}
		},
		watch:{
			'stationList'(value) {
				this.$refs.map.makeMarksByLnglat(value)
				if (value) {
					this.current = value[0] || {}
				}
			},
		},
		computed:{
			... mapGetters([
				'dq',
				'sf',
				'cs',
				'menuList',
				'level'
			]),
			... mapGetters('station',[
				'serviceInfo',
				'stationList',
				'cityServiceIncome',
				'serviceIncome',
				'custComplaints',
				'appointment',
				'serviceSatisfaction',
				'loading'
			])
		},
		mounted(){
			this.detailView.$on('close', this.onClose)
		},
		methods: {
			onClose(){
				this.$refs.map.closeInfoWindow()
			},
			reset(){
				this.pixel = null
				this.selectedStation = ''
				this.onChangeCs()
			},
			onInit(){
				//地图加载完成
				let list = []
				this.menuList.forEach(item => {
					list = list.concat(item.children)
				})
				this.sfList = [...list]
				if(!this.selectedSf){
					this.selectedSf = this.sf
				}
				if(!this.cs){
					this.$store.commit('cs', this.sf.children[0])
				}
				this.selectedCs = this.cs
				this.$store.dispatch('station/getServiceCnt')
				this.$store.dispatch('station/getServiceInfo')
				this.$store.dispatch('station/getCityServiceIncome')
				this.$store.dispatch('station/getCustComplaints')
				this.$store.dispatch('station/getAppointment')
				this.$store.dispatch('station/getServiceSatisfaction')

				this.$refs.map.amap.on('zoomstart',this.onClose,this)
				this.$refs.map.amap.on('click',this.reset,this)
			},
			onBack(){
				this.$router.push(`/pages/top/${this.level}`)
			},
			handleMarkClick(data,event){
				this.selectedStation = event.target.data
				let dealerId = data.dealerId
				this.$store.dispatch('station/getServiceCnt', dealerId)
				this.$store.dispatch('station/getServiceIncome', dealerId)
				this.$store.dispatch('station/getCustComplaints', dealerId)
				this.$store.dispatch('station/getAppointment', dealerId)
				this.$store.dispatch('station/getServiceSatisfaction', dealerId)
				this.cityFlag = false
				this.detailView.station = this.selectedStation
				this.$refs.map.openInfoWindow(this.detailView, this.selectedStation)

			},
			onChangeCs(){
				this.$store.commit('cs',this.selectedCs)
				this.$store.dispatch('station/getServiceCnt')
				this.$store.dispatch('station/getServiceInfo')
				this.$store.dispatch('station/getCityServiceIncome')
				this.$store.dispatch('station/getCustComplaints')
				this.$store.dispatch('station/getAppointment')
				this.$store.dispatch('station/getServiceSatisfaction')
				this.cityFlag = true
			},
			onChangeSf(item){
				this.$store.dispatch('change-sf', item)
				this.$store.commit('cs', this.sf.children[0])
				this.selectedCs = this.cs
				//todo 同时修改当前对应得大区
				let dq = this.menuList.find(d => {
					return d.id == item.pId
				})
				this.$store.dispatch('change-dq-noupdate', dq)
				this.$store.dispatch('station/getServiceCnt')
				this.$store.dispatch('station/getServiceInfo')
				this.$store.dispatch('station/getCityServiceIncome')
				this.$store.dispatch('station/getCustComplaints')
				this.$store.dispatch('station/getAppointment')
				this.$store.dispatch('station/getServiceSatisfaction')
			}
		}
	}
</script>

<style lang="stylus" scoped>
	.city
		height 100%
		position relative
		>>>.station-detail-view
			position absolute
		>>>.station-summary
			position absolute
			top 20px
			left 20px
			background rgba(2,22,50,0.80)
		.select-row
			position absolute
			top 20px
			left 980px
			>>>.g-select
				margin 0 20px
			>>>.g-select__text
				font-size 28px
		.bottom-row
			>>>.g-container
				background rgba(2,22,50,0.80)
			position absolute
			left 0
			right 0
			bottom 20px
			padding  0 20px
			box-sizing border-box
			display flex
			width 100%
			>>>.g-part
				background rgba(2,22,50,0.80)
			>>>.g-part-title
				margin-top 40px
				margin-left 40px
</style>
