import {getUserComplaint} from '@/fetch/bottom'
const state = {
  ksjList: null,
  loading: false,
  xyAndBh: null,
  tsly: null,
  tsfl: null,
  ksj: null
}

const getters = {
	ksjList: (state, getters, rootState) => {
		return state.ksjList
	},
  loading: (state, getters, rootState) => {
		return state.loading
	},
  xyAndBh: (state, getters, rootState) => {
    return state.xyAndBh
  },
  tsly: (state, getters, rootState) => {
    return state.tsly
  },
  tsfl: (state, getters, rootState) => {
    return state.tsfl
  },
  ksj: (state, getters, rootState) => {
    return state.ksj
  }
}

const actions = {
	async 'userComplaint'({state, rootGetters}, value) {
    state.loading = true
    state.ksjList = null
    state.xyAndBh = null
    state.tsly = null
    state.tsfl = null
    state.ksj = null
    let params = rootGetters.getCustomParams
    let result = await getUserComplaint(params)
    state.ksjList = result.ksjList
    state.xyAndBh = result.xyAndBh
    state.tsly = result.tsly
    state.tsfl = result.tsfl
    state.ksj = result.ksj
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
