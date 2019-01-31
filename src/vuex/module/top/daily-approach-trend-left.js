import {getDailyProgress} from 'fetch/top'

const state = {
	data: {},
	loading: false
}

const getters = {
	data: (state, getters, rootState) => {
		return state.data
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
	async 'get-daily-progress'({commit, state, rootGetters}, value) {
		state.loading = true
		let params = rootGetters.getCustomParams
		let result = await getDailyProgress(params)
		if(result){
			state.data = result
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
