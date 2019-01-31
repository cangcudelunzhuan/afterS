import {getCsi} from '@/fetch/top'

const state = {
	loading: false,
	customerChartData: null
}

const getters = {
	customerChartData: (state, getters, rootState) => {
		return state.customerChartData
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
	async 'csi'({state, rootGetters}, value) {
		state.loading = true
		state.customerChartData = {}
		let params = rootGetters.getCustomParams
		let result = await getCsi(params)
		state.customerChartData = result
		state.loading = false
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
