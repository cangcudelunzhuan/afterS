import {getDailyTrendy} from 'fetch/top'

const state = {
	pie: {},
	peakValleyData: {},
	overnight: {},
	loading: false
}

const getters = {
	pie: (state, getters, rootState) => {
		return state.pie
	},
	peakValleyData: (state, getters, rootState) => {
		return state.peakValleyData
	},
	overnight: (state, getters, rootState) => {
		return state.overnight
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
	async 'get-daily-trendy'({commit, state, rootGetters}, value) {
		state.loading = true
		let params = rootGetters.getCustomParams
		let result = await getDailyTrendy(params) || []
		if (result) {
			let pie = {
				legend:[],
				pieData: []
			}
			if(result.cxfb){
				result.cxfb.forEach((item)=>{
					item.name = item.title
					pie.pieData.push({
							name:item.title,
							value: item.value
						})
					pie.legend.push(item.title)
				})
			}
			state.pie = pie
			state.peakValleyData = result.fgzfb  || {}
			state.overnight = result.gyc || {}
			state.loading = false
		}
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
