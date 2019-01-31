import {getStartFailure} from '@/fetch/bottom'
const state = {
  loading: false,
  startFailureData: null
}

const getters = {
	startFailureData: (state, getters, rootState) => {
		return state.startFailureData
	},
  loading: (state, getters, rootState) => {
		return state.loading
	}
}

const actions = {
  async 'startFailure'({commit, state}, value) {
    state.loading = true
    state.startFailureData = null
    let result = await getStartFailure()
    state.startFailureData = result
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
