import {getStation} from 'fetch/bottom'
const state = {
	selected: '',
	station:[],
	loading: false
}

const getters = {
	selected: (state, getters, rootState) => {
		return state.selected
	},
	station: (state, getters, rootState) => {
		return state.station
	},
	loading: (state, getters, rootState) => {
		return state.loading
	}
}

const actions = {
	async 'get-station'({commit, state}, value) {
		state.loading = true
		let result = await getStation(value.id)
		if(result){
			state.station = result
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
