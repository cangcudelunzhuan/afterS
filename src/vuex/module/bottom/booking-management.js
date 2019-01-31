import {getUserRetention, getAppointMange} from '@/fetch/bottom'
const state = {
  pieData: [],
  loading: false,
  appointMangeData: null
}

const getters = {
	pieData: (state, getters, rootState) => {
		return state.pieData
	},
  loading: (state, getters, rootState) => {
		return state.loading
	},
  appointMangeData: (state, getters, rootState) => {
    return state.appointMangeData
  }
}

const actions = {
	async 'userRetention'({state, rootGetters}, value) {
    let params = rootGetters.getCustomParams
    state.loading = true
    state.pieData = []
    let result = await getUserRetention(params)
	if(result){
		state.pieData = result
	}
    state.loading = false
	},
  async 'appointMange'({state, rootGetters}, value) {
    let params = rootGetters.getCustomParams
    state.loading = true
    state.appointMangeData = null
    let result = await getAppointMange(params)
    state.appointMangeData = result
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
