import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'




export const mItems = {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
}