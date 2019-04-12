import firebase from 'firebase'

export default {
  namespaced: true,

  store: {
    unsubscribeAuthObserver: null,
    userId: null
  },

  actions: {
    async fetchAuthUser ({ commit, dispatch }) {
      const userId = firebase.auth().currentUser.uid
      return new Promise((resolve, reject) => {
        // check if user exists in the database
        firebase.database().ref('users').child(userId).once('value', snapshot => {
          if (snapshot.exists()) {
            return dispatch('users/fetchUser', userId, { root: true })
              .then(user => {
                commit('setAuthId', userId)
                resolve(user)
              })
          } else {
            resolve(null)
          }
        })
      })
    },
    async signInWithEmailAndPassword (context, { email, password }) {
      try {
        const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async signOut ({ commit }) {
      try {
        await firebase.auth().signOut()
        commit('setAuthId', null)
        return Promise.resolve()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    initAuthentication ({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            dispatch('fetchAuthUser')
              .then(dbUser => resolve(dbUser))
          } else {
            resolve(null)
          }
        })
        commit('setUnsubscribeAuthObserver', unsubscribe)
      })
    },
    async registerUserWithEmailAndPassword ({ dispatch }, { name, email, password, username, avatar = null }) {
      try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
        dispatch('users/createUser', { id: user.uid, name, email, username, avatar, password }, { root: true })
        return Promise.resolve(user)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  getters: {
    getUser (state, getters, rootState) {
      return state.userId ? rootState.users.items[state.userId] : null
    }
  },

  mutations: {
    setAuthId (state, id) {
      state.userId = id
    },
    setUnsubscribeAuthObserver (state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe
    }
  }
}
