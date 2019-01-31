import {getTechAnalysis, getFaultTrendy} from 'fetch/top.js'
const state = {
	techAnalysis: [],
	faultTrendy: {},
	loading:false,
	loading2:false,
	current: '',
	cx:''
}

const getters = {
	current: (state, getters, rootState) => {
		return state.current
	},
	techAnalysis: (state, getters, rootState) => {
		return state.techAnalysis
	},
	faultTrendy: (state, getters, rootState) => {
		return state.faultTrendy
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
	loading2: (state, getters, rootState) => {
		return state.loading2
	},
}

const actions = {
	async 'set-cx'({commit, state, dispatch}, value) {
		state.cx = value
		dispatch('get-tech-analysis')
	},
	async 'set-current'({commit, state, dispatch}, value) {
		state.current = value
		dispatch('get-fault-trendy')
	},
	async 'get-tech-analysis'({commit, state, dispatch, rootGetters}, value) {
		state.loading = true
		state.techAnalysis = []
		let params = rootGetters.getCustomParams
		let id = state.cx.key || ''
		let result = await getTechAnalysis(id) || []
		if(result.length > 0)  {
			state.techAnalysis = result
			state.current = state.techAnalysis[0]
		}
		state.loading = false
		dispatch('get-fault-trendy')
	},
	async 'get-fault-trendy'({commit, state, rootState}, value) {
		state.loading2 = true
		let result = await getFaultTrendy(state.current.key, state.current.title)
		if(result) state.faultTrendy = result
		state.loading2 = false
	}
}

const mutations = {
	'faultTrendy'(value){
		state.faultTrendy = value
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}

