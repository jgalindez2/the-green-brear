import firebase from 'firebase'
import { appendChildToParentMutation } from '../utils'
import { removeEmptyData } from '../../utils/'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    async fetchUsers ({ dispatch }) {
      return dispatch('fetchItems', 'users', { root: true })
    },
    async fetchUser ({ dispatch }, id) {
      return dispatch('fetchItemById', { ref: 'users', id }, { root: true })
    },
    async createUser ({ state, commit }, { id, name, email, username, password, avatar = null }) {
      try {
        const registerAt = new Date().getTime()
        const usernameLower = username.toLowerCase()
        const user = { name, email, username, avatar, password, registerAt, usernameLower }
        await firebase.database().ref('users').child(id).set(user)
        commit('setItems', { ref: 'users', items: { [id]: { ...user, '.key': id } } }, { root: true })
        return Promise.resolve(state.items[id])
      } catch (error) {
        return Promise.reject(error)
      }
    },
    editUser ({ commit }, user) {
      try {
        const attrsUpdate = {
          avatar: user.avatar,
          username: user.username,
          name: user.name,
          bio: user.bio,
          website: user.website,
          email: user.email,
          location: user.location
        }
        const userKey = user['.key']
        firebase.database().ref('users').child(userKey).update(removeEmptyData(attrsUpdate))
        commit('setItems', { ref: 'users', items: { [userKey]: { ...user, '.key': userKey } } }, { root: true })
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  mutations: {
    appendPostToUser: appendChildToParentMutation({ parent: 'users', child: 'posts' }),
    appendTopicToUser: appendChildToParentMutation({ parent: 'users', child: 'topics' })
  }
}
