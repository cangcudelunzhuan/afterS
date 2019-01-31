import {getServiceInfo, getServiceCnt, getCustComplaints, getAppointment, getServiceIncome, getCityServiceIncome, getServiceSatisfaction} from 'fetch/station'
import {getUserRetention} from 'fetch/bottom'
const state = {
	serviceInfo: {
		catSeriesRepairNums: null,
		totalComingCnt: null,
		totalRepairIncome: null,
		totalServiceStation: null,
		maxValue: null
	},
	stationList: [],
	cityServiceIncome: {
		key: [],
		sericesData: []
	},
	serviceIncome: {},
	custComplaints: {},
	appointment: {},
	serviceSatisfaction: {},
	loading: false,
	retention: []
}

const getters = {
	retention: (state, getters, rootState) => {
		return state.retention
	},
	serviceInfo: (state, getters, rootState) => {
		return state.serviceInfo
	},
	stationList: (state, getters, rootState) => {
		return state.stationList
	},
	serviceIncome: (state, getters, rootState) => {
		return state.serviceIncome
	},
	cityServiceIncome: (state, getters, rootState) => {
		return state.cityServiceIncome
	},
	custComplaints: (state, getters, rootState) => {
		return state.custComplaints
	},
	appointment: (state, getters, rootState) => {
		return state.appointment
	},
	serviceSatisfaction: (state, getters, rootState) => {
		return state.serviceSatisfaction
	},
	loading: (state, getters, rootState) => {
		return state.loading
	}
}

const actions = {
	async 'getServiceInfo'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.stationList = []
		let result = await getServiceInfo(cs.id,value)
		if(result) {
			state.stationList = result
		}
		state.loading = false
	},
	async 'getServiceCnt'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.serviceInfo = {
			catSeriesRepairNums: null,
			totalComingCnt: null,
			totalRepairIncome: null,
			totalServiceStation: null,
			maxValue: null
		}
		let result = await getServiceCnt(cs.id,value)
		if(result) {
			state.serviceInfo.catSeriesRepairNums = result.catSeriesRepairNums
			state.serviceInfo.totalComingCnt = result.totalComingCnt
			state.serviceInfo.totalRepairIncome = result.totalRepairIncome
			state.serviceInfo.totalServiceStation = result.totalServiceStation
			let value = Array.from(result.catSeriesRepairNums, (x) => x.value )
			state.serviceInfo.maxValue = Math.max(...value)
		}
		state.loading = false
	},
	async 'getCityServiceIncome'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.cityServiceIncome = {
			key: [],
			sericesData: []
		}
		let res = await getCityServiceIncome(cs.id, value)
		let key = Array.from(res, (x) => x.key)
		let sericesData = Array.from(res, (x) => x.value)
		state.cityServiceIncome.key = key
		state.cityServiceIncome.sericesData = sericesData
		state.loading = false
	},
	async 'getServiceIncome'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.serviceIncome = {
		}
		let res = await getServiceIncome(cs.id, value)
		state.serviceIncome = res
		state.loading = false
	},
	async 'getCustComplaints'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.custComplaints = {}
		let custComplaints = await getCustComplaints(cs.id, value)
		state.custComplaints = custComplaints
		state.loading = false
	},
	async 'getAppointment'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.appointment = {}
		let appointment = await getAppointment(cs.id, value)
		state.appointment = appointment
		state.loading = false
	},
	async 'getServiceSatisfaction'({commit, state, rootState}, value) {
		state.loading = true
		let cs = rootState.cs
		state.serviceSatisfaction = {}
		let serviceSatisfaction = await getServiceSatisfaction(cs.id, value)
		state.serviceSatisfaction = serviceSatisfaction
		state.loading = false
	},
	async 'getRetention'({commit, state, rootState}, value) {
		let dealerId = value
		let result = await getUserRetention({dealerId})
	}
}

const mutations = {}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
