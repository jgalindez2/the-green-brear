import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topic: {},
    categories: {},
    posts: {},
    users: {},
    topics: {},
    userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters,
  mutations,
  actions
})
