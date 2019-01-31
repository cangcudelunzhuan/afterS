import {getYearProgress} from 'fetch/top'

const state = {
	loading:false,
	list: []
}

const getters = {
	list: (state, getters, rootState) => {
		return state.list
	},
	loading: (state) => {
		return state.loading
	}
}

const actions = {
	async 'year-progress'({commit, state, rootState}, value) {
		state.loading = true
		state.list = []
		let result = await getYearProgress(rootState.dq.id)
		state.list = result
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
