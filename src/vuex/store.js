import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {getChex} from 'fetch/top'

import DailyApproachTrendLeft from './module/top/daily-approach-trend-left'
import DailyApproachTrendRight from './module/top/daily-approach-trend-right'
import customerChart from './module/top/customer-chart'
import SparePartsSupply from './module/top/spare-parts-supply'
import afterSaleOperation from './module/top/after-sale-operation'
import topMap from './module/top/top-map'

import technicalAnalysis from './module/top/technical-analysis'

import smsSatisfaction from './module/bottom/sms-satisfaction'
import telephoneSatisfaction from './module/bottom/telephone-satisfaction'
import bookingManagement from './module/bottom/booking-management'
import customerComplaints from './module/bottom/customer-complaints'
import firstFailure from './module/bottom/first-failure'
import newProductFault from './module/bottom/new-product-fault'
import technicalActivities from './module/bottom/technical-activities'
import serviceStationCategory from './module/bottom/service-station-category'
import bottomMap from './module/bottom/bottom-map'

import Station from './module/station'

export default new Vuex.Store({
	state: {
		user: null,
		level: '',
		menuList: '',
		datalist: [],
		menuMap:'',
		dq: '',
		sf:'',
		cs:'',
		chex: [],
		newChex:[],
		timestamp:0,

	},
	mutations: {
		'user'(state, value) {
			state.user = value
		},
		'level'(state, value) {
			state.level = value
		},
		'menuList'(state, value) {
			state.menuList = value
		},
		'menuMap'(state, value) {
			state.menuMap = value
		},
		'datalist'(state, value) {
			state.datalist = value
		},
		'cs'(state, value) {
			state.cs = value
		},
		'chex'(state, value) {
			state.chex = value
		},
		'newChex'(state, value) {
			state.newChex = value
		},
		'update-data'(state){
			if(state.level >= 0){
				state.timestamp = (new Date()).getTime()
			}
		}
	},
	actions: {
		async 'get-chex'({commit, state}, value) {
			let chexi = await getChex()
			if(chexi){
				commit('chex', chexi)
			}
		},
		'change-dq-noupdate'({commit, state}, value){
			state.dq = value
		},
		'change-dq'({commit, state}, value){
			state.dq = value
			commit('update-data')
		},
		'change-sf'({commit, state}, value){
			state.sf = value
			commit('update-data')
		}
	},
	getters: {
		'timestamp'(state){
			return state.timestamp
		},
		'level'(state, getters, rootStat) {
			return state.level
		},
		'menuList'(state, getters, rootStat) {
			return state.menuList
		},
		'menuMap'(state, getters, rootStat) {
			return state.menuMap
		},
		'datalist'(state, getters, rootStat) {
			return state.datalist
		},
		'dq'(state, getters, rootStat) {
			return state.dq
		},
		'sf'(state, getters, rootStat) {
			return state.sf
		},
		'cs'(state, getters, rootStat) {
			return state.cs
		},
		'chex'(state, getters, rootStat) {
			return state.chex
		},
		'newChex'(state, getters, rootStat) {
			return state.newChex
		},
		'getCustomParams'(state){
			let level = state.level
			if(level == 0) return {level}
			if(level == 1) return {level, dqId:state.dq.id}
			if(level == 2) {
				level = 6
				return {level,sfId:state.sf.id}
			}
		}
	},
	modules: {
		"daily-approach-trend-left": DailyApproachTrendLeft,
		"daily-approach-trend-right": DailyApproachTrendRight,
		'customer-chart': customerChart,
		'spare-parts-supply': SparePartsSupply,
		'technical-analysis': technicalAnalysis,
		'after-sale-operation': afterSaleOperation,
		'top-map': topMap,
		'sms-satisfaction': smsSatisfaction,
		'telephone-satisfaction': telephoneSatisfaction,
		'booking-management': bookingManagement,
		'customer-complaints': customerComplaints,
		'first-failure': firstFailure,
		'new-product-fault': newProductFault,
		'technical-activities': technicalActivities,
		'service-station-category': serviceStationCategory,
		'bottom-map': bottomMap,
		'station': Station
	}
})
