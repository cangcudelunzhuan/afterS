import {getGeelyFwz, getGeelyFwzList} from '@/fetch/bottom'

const state = {
	loading: false,
	geelyFwz: {},
	geelyFwzList:[],
	current: '', //当前服务站名字

}

const getters = {
	selected: (state, getters, rootState) => {
		return state.selected
	},
	geelyFwz: (state, getters, rootState) => {
		return state.geelyFwz
	},
	geelyFwzList: (state, getters, rootState) => {
		return state.geelyFwzList
	},
	loading: (state, getters, rootState) => {
		return state.loading
	},
	current: (state, getters, rootState) => {
		let level = rootState.level
		if(level == 0 ){
			return '吉利服务站'
		}else if(level == 1){
			return rootState.dq.name.replace('服务', '')
		}else if(level == 2){
			return rootState.sf
		}
	},
}

const actions = {
	async 'geelyFwz'({state, rootGetters}) {
		let params = rootGetters.getCustomParams
		state.loading = true
		state.geelyFwz = null
		let result = await getGeelyFwz({...params})
		if (result) {
			state.geelyFwz = result
		}
		state.loading = false
	},
	async 'get-geely-fwz-list'({state, rootGetters}){
		let params = rootGetters.getCustomParams
		state.geelyFwzList = []
		let result = await getGeelyFwzList({...params})
		if(result){
			state.geelyFwzList = result
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
