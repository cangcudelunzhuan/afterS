import {getNewProductFailure} from '@/fetch/bottom'
const state = {
  loading: false,
  newProductFailureData: null
}

const getters = {
	newProductFailureData: (state, getters, rootState) => {
		return state.newProductFailureData
	},
  loading: (state, getters, rootState) => {
		return state.loading
	}
}

const actions = {
  async 'newProductFailure'({commit, state}, value) {
    state.loading = true
    state.newProductFailureData = null
    let result = await getNewProductFailure(value)
    state.newProductFailureData = result
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
