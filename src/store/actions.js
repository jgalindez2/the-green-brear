import firebase from 'firebase'
import { removeEmptyData } from '../utils/'

export default {
  async fetchTopic ({ dispatch }, id) {
    return dispatch('fetchItemById', { ref: 'topics', id })
  },
  async fetchPost ({ dispatch }, id) {
    return dispatch('fetchItemById', { ref: 'posts', id })
  },
  async fetchCategory ({ dispatch }, slug) {
    return dispatch('fetchItemByName', { ref: 'categories', order: 'slug', value: slug })
  },
  async fetchTopicPosts ({ dispatch }, id) {
    return dispatch('fetchItemByName', { ref: 'posts', order: 'topicId', value: id })
  },
  async fetchCategoryTopics ({ dispatch }, id) {
    return dispatch('fetchItemByName', { ref: 'topics', order: 'categoryId', value: id })
  },
  async fetchPostsUser ({ dispatch }, id) {
    return dispatch('fetchItemByName', { ref: 'posts', order: 'userId', value: id })
  },
  async fetchTopics ({ dispatch }) {
    return dispatch('fetchItems', 'topics')
  },
  async fetchCategories ({ dispatch }) {
    return dispatch('fetchItems', 'categories')
  },
  async fetchPosts ({ dispatch }) {
    return dispatch('fetchItems', 'posts')
  },
  async fetchUsers ({ dispatch }) {
    return dispatch('fetchItems', 'users')
  },
  async fetchUser ({ dispatch }, id) {
    return dispatch('fetchItemById', { ref: 'users', id })
  },
  async fetchAuthUser ({ commit, dispatch }) {
    const userId = firebase.auth().currentUser.uid
    return new Promise((resolve, reject) => {
      // check if user exists in the database
      firebase.database().ref('users').child(userId).once('value', snapshot => {
        if (snapshot.exists()) {
          return dispatch('fetchUser', userId)
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
  async fetchItemByName ({ commit }, { ref, order, value }) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).orderByChild(order).equalTo(value).once('value', snapshot => {
        const items = snapshot.val()
        for (const key in items) {
          items[key] = { ...items[key], '.key': key }
        }
        commit('setItems', { ref, items })
        return resolve(items)
      })
    })
  },
  async fetchItemById ({ commit }, { ref, id }) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).child(id).once('value', snapshot => {
        const item = {
          [snapshot.key]: {
            ...snapshot.val(), '.key': snapshot.key
          }
        }
        commit('setItems', { ref, items: item })
        return resolve(item)
      })
    })
  },
  async fetchItems ({ commit }, ref) {
    return new Promise((resolve, reject) => {
      firebase.database().ref(ref).once('value', snapshot => {
        const items = snapshot.val()
        for (const key in items) {
          items[key] = { ...items[key], '.key': key }
        }
        commit('setItems', { ref, items })
        return resolve(items)
      })
    })
  },
  async createTopic ({ state, commit, dispatch }, { title, text, categoryId }) {
    try {
      const topicKey = firebase.database().ref('topics').push().key
      const postKey = firebase.database().ref('post').push().key
      const publishedAt = new Date().getTime()
      const userId = state.userId
      const newTopic = { categoryId, title, publishedAt, userId, firstPostId: postKey, posts: {}, views: 0 }
      newTopic.posts[postKey] = postKey
      const newPost = { text, publishedAt, topicId: topicKey, userId }

      const updates = {}
      updates[`topics/${topicKey}`] = newTopic
      updates[`categories/${newTopic.categoryId}/topics/${topicKey}`] = topicKey
      updates[`users/${newTopic.userId}/topics/${topicKey}`] = topicKey

      updates[`posts/${postKey}`] = newPost
      updates[`users/${newPost.userId}/posts/${postKey}`] = postKey

      await firebase.database().ref().update(updates)

      commit('setItems', { ref: 'topics', items: { [topicKey]: { ...newTopic, '.key': topicKey } } })
      commit('appendTopicToCategory', { childId: topicKey, parentId: categoryId })
      commit('appendTopicToUser', { childId: topicKey, parentId: userId })

      commit('setItems', { ref: 'posts', items: { [postKey]: { ...newPost, '.key': postKey } } })
      commit('appendPostToTopic', { childId: postKey, parentId: topicKey })
      commit('appendPostToUser', { childId: postKey, parentId: userId })

      return Promise.resolve(state.topics[topicKey])
    } catch (error) {
      return Promise.resolve(error)
    }
  },
  async savePost ({ state, commit }, post) {
    try {
      const key = firebase.database().ref('posts').push().key
      const publishedAt = new Date().getTime()
      const newPost = {
        ...post,
        publishedAt,
        userId: state.userId
      }
      const updates = {}
      updates[`posts/${key}`] = newPost
      updates[`topics/${newPost.topicId}/posts/${key}`] = key
      updates[`users/${newPost.userId}/posts/${key}`] = key
      await firebase.database().ref().update(updates)

      commit('setItems', { ref: 'posts', items: { [key]: { ...newPost, '.key': key } } })
      commit('appendPostToTopic', { childId: key, parentId: post.topicId })
      commit('appendPostToUser', { childId: key, parentId: state.userId })
      return Promise.resolve(state.posts[key])
    } catch (error) {
      return Promise.reject(error)
    }
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
      dispatch('createUser', { id: user.uid, name, email, username, avatar, password })
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async createUser ({ state, commit }, { id, name, email, username, password, avatar = null }) {
    try {
      const registerAt = new Date().getTime()
      const usernameLower = username.toLowerCase()
      const user = { name, email, username, avatar, password, registerAt, usernameLower }
      await firebase.database().ref('users').child(id).set(user)
      commit('setItems', { ref: 'users', items: { [id]: { ...user, '.key': id } } })
      return Promise.resolve(state.users[id])
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async updateTopic ({ state, commit }, { title, text, topicId }) {
    try {
      const edited = { at: new Date().getTime(), by: state.userId }
      const topic = state.topics[topicId]
      const postId = topic.firstPostId
      const post = { ...state.posts[postId], text, edited }

      const updates = {}
      updates[`topics/${topicId}/title`] = title
      updates[`posts/${postId}/text`] = text
      updates[`posts/${postId}/edited`] = edited
      await firebase.database().ref().update(updates)

      commit('setItems', { ref: 'posts', items: { [postId]: { ...post, '.key': postId } } })
      commit('setItems', { ref: 'topics', items: { [topicId]: { ...topic, '.key': topicId } } })
      return Promise.resolve(topic)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async updatePost ({ state, commit }, { postId, text }) {
    try {
      const edited = { at: new Date().getTime(), by: state.userId }
      const post = { ...state.posts[postId], text, edited }

      const updates = { text, edited }
      await firebase.database().ref('posts').child(postId).update(updates)

      commit('setItems', { ref: 'posts', items: { [postId]: { ...post, '.key': postId } } })
      return Promise.resolve(post)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  editUser (context, user) {
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
      firebase.database().ref('users').child(user['.key']).update(removeEmptyData(attrsUpdate))
      context.commit('setUser', user)
      return Promise.resolve()
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
