import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    async fetchPost ({ dispatch }, id) {
      return dispatch('fetchItemById', { ref: 'posts', id }, { root: true })
    },
    async fetchPosts ({ dispatch }) {
      return dispatch('fetchItems', 'posts', { root: true })
    },
    async fetchPostsUser ({ dispatch }, id) {
      return dispatch('fetchItemByName', { ref: 'posts', order: 'userId', value: id }, { root: true })
    },
    async fetchTopicPosts ({ dispatch }, id) {
      return dispatch('fetchItemByName', { ref: 'posts', order: 'topicId', value: id }, { root: true })
    },
    async savePost ({ state, commit, rootState }, post) {
      try {
        const key = firebase.database().ref('posts').push().key
        const publishedAt = new Date().getTime()
        const newPost = {
          ...post,
          publishedAt,
          userId: rootState.auth.userId
        }
        const updates = {}
        updates[`posts/${key}`] = newPost
        updates[`topics/${newPost.topicId}/posts/${key}`] = key
        updates[`users/${newPost.userId}/posts/${key}`] = key
        await firebase.database().ref().update(updates)

        commit('setItems', { ref: 'posts', items: { [key]: { ...newPost, '.key': key } } }, { root: true })
        commit('topics/appendPostToTopic', { childId: key, parentId: post.topicId }, { root: true })
        commit('posts/appendPostToUser', { childId: key, parentId: rootState.userId }, { root: true })
        return Promise.resolve(newPost)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async updatePost ({ state, commit, rootState }, { postId, text }) {
      try {
        const edited = { at: new Date().getTime(), by: rootState.auth.userId }
        const post = { ...state.items[postId], text, edited }

        const updates = { text, edited }
        await firebase.database().ref('posts').child(postId).update(updates)

        commit('setItems', { ref: 'posts', items: { [postId]: { ...post, '.key': postId } } }, { root: true })
        return Promise.resolve(post)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  mutations: {
    setPost (state, post) {
      state.items = Object.assign({}, state.items, post)
    }
  }
}
