import {getActivities} from '@/fetch/bottom'
const state = {
  activitiesData: [],
  loading: false
}

const getters = {
	activitiesData: (state, getters, rootState) => {
		return state.activitiesData
	},
  loading: (state, getters, rootState) => {
		return state.loading
	},
}

const actions = {
  async 'activities'({commit, state}, value) {
		state.loading = true
		state.activitiesData = []
		let result = await getActivities(value)
    result.map((item, i)=>{
      item.tabData = {
        active : 0,
        item: [
          '完成情况',
          '漏做情况'
        ]
      }
    })
		state.activitiesData = result
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
