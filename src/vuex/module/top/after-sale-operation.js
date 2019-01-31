import {getSaleOperation} from '@/fetch/top'

const state = {
	loading: false,
	wxz: [],
	productTrend: null
}

const getters = {
	wxz: (state, getters, rootState) => {
		return state.wxz
	},
	productTrend: (state, getters, rootState) => {
		return state.productTrend
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
	async 'saleOperation'({commit, state, rootGetters}, value) {
		state.loading = true
		let params = rootGetters.getCustomParams
		state.wxz = []
		state.productTrend = null
		let result = await getSaleOperation(params)
		if(result){
			state.wxz = result.wxz
			state.productTrend = result.productTrend
		}
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
