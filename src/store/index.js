import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import posts from './modules/posts'
import users from './modules/users'
import categories from './modules/categories'
import topics from './modules/topics'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations,
  actions,
  modules: {
    posts,
    users,
    categories,
    topics,
    auth
  }
})
