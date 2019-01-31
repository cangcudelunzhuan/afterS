import {getSparePartsSupply, getSparePartsSupplyJsl} from '@/fetch/top'

const state = {
	loading: false,
	yearMbz: [],
	monthMbz: [],
	bjzx: [],
	jsl:[],
	mzl:[]
}

const getters = {
	yearMbz: (state, getters, rootState) => {
		return state.yearMbz
	},
	bjzx: (state, getters, rootState) => {
		return state.bjzx
	},
	mzl: (state, getters, rootState) => {
		return state.mzl
	},
	jsl: (state, getters, rootState) => {
		return state.jsl
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
	monthMbz: (state, getters, rootState) => {
		return state.monthMbz
	}
}

const actions = {
	async 'sparesProvide'({commit, state, rootGetters}, value) {
		state.loading = true
		state.yearMbz = []
		state.monthMbz = []
		state.jsl = []
		state.mzl = []
		let result = await getSparePartsSupply()
		if(result) {
			state.yearMbz = result.yearMbz
			state.monthMbz = result.monthMbz
			state.bjzx = result.bjzx[0].value[0] || {}
			let s = {
				title: '备件中心',
				value:result.bjzx[0].value[1]
			}
			state.mzl.push(s)
			result.dlk.forEach(item => {
				state.jsl.push({
					title: item.title,
					value: item.value[0]
				})
				state.mzl.push({
					title: item.title,
					value: item.value[1]
				})
			})
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
