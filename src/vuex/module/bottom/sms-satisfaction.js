import {getSms} from '@/fetch/bottom'
const state = {
  SmsChartData: {
    data: [],
    title: []
  },
  loading: false
}

const getters = {
	SmsChartData: (state, getters, rootState) => {
		return state.SmsChartData
	},
  loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
  async 'sms'({state, rootGetters}, value) {
		state.loading = true
    state.SmsChartData = {
      data: [],
      title: []
    }
    let params = rootGetters.getCustomParams
		let result = await getSms(params)
    state.SmsChartData.data = result
    let title = []
    result.map((item, i) => {
      if (!item.title) return
      let o = {}
      o.value = item.title
      o.key = i
      title.push(o)
    })
    state.SmsChartData.title = title
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
