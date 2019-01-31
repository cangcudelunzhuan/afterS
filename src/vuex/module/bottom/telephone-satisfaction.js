import {getTsi} from '@/fetch/bottom'
const state = {
  TelephoneSatisfactionData: {
    data: [],
    title: []
  },
  loading: false
}

const getters = {
	TelephoneSatisfactionData: (state, getters, rootState) => {
		return state.TelephoneSatisfactionData
	},
  loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
	async 'tsi'({state, rootGetters}, value) {
    state.loading = true
    state.TelephoneSatisfactionData = {
      data: [],
      title: []
    }
    let params = rootGetters.getCustomParams
    let result = await getTsi(params)
    state.TelephoneSatisfactionData.data = result
    let title = []
    result.map((item, i) => {
      if (!item.title) return
      let o = {}
      o.value = item.title
      o.key = i
      title.push(o)
    })
    state.TelephoneSatisfactionData.title = title
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
