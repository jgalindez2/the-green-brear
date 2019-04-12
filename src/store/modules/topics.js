import firebase from 'firebase'
import { appendChildToParentMutation } from '../utils'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    async fetchTopic ({ dispatch }, id) {
      return dispatch('fetchItemById', { ref: 'topics', id }, { root: true })
    },
    async fetchTopics ({ dispatch }) {
      return dispatch('fetchItems', 'topics', { root: true })
    },
    async createTopic ({ state, commit, rootState }, { title, text, categoryId }) {
      try {
        const topicKey = firebase.database().ref('topics').push().key
        const postKey = firebase.database().ref('post').push().key
        const publishedAt = new Date().getTime()
        const userId = rootState.auth.userId
        const newTopic = { categoryId, title, publishedAt, userId, firstPostId: postKey, lastPostId: postKey, lastPostAt: publishedAt, posts: {}, views: 0 }
        newTopic.posts[postKey] = postKey
        const newPost = { text, publishedAt, topicId: topicKey, userId }

        const updates = {}
        updates[`topics/${topicKey}`] = newTopic
        updates[`categories/${newTopic.categoryId}/topics/${topicKey}`] = topicKey
        updates[`users/${newTopic.userId}/topics/${topicKey}`] = topicKey

        updates[`posts/${postKey}`] = newPost
        updates[`users/${newPost.userId}/posts/${postKey}`] = postKey

        await firebase.database().ref().update(updates)

        commit('setItems', { ref: 'topics', items: { [topicKey]: { ...newTopic, '.key': topicKey } } }, { root: true })
        commit('categories/appendTopicToCategory', { childId: topicKey, parentId: categoryId }, { root: true })
        commit('users/appendTopicToUser', { childId: topicKey, parentId: userId }, { root: true })

        commit('setItems', { ref: 'posts', items: { [postKey]: { ...newPost, '.key': postKey } } }, { root: true })
        commit('appendPostToTopic', { childId: postKey, parentId: topicKey })
        commit('users/appendPostToUser', { childId: postKey, parentId: userId }, { root: true })

        return Promise.resolve(state.items[topicKey])
      } catch (error) {
        return Promise.resolve(error)
      }
    },
    async updateTopic ({ state, commit, rootState }, { title, text, topicId }) {
      try {
        const edited = { at: new Date().getTime(), by: rootState.auth.userId }
        const topic = state.items[topicId]
        const postId = topic.firstPostId
        const post = { ...rootState.posts.items[postId], text, edited }

        const updates = {}
        updates[`topics/${topicId}/title`] = title
        updates[`posts/${postId}/text`] = text
        updates[`posts/${postId}/edited`] = edited
        await firebase.database().ref().update(updates)

        commit('setItems', { ref: 'posts', items: { [postId]: { ...post, '.key': postId } } }, { root: true })
        commit('setItems', { ref: 'topics', items: { [topicId]: { ...topic, '.key': topicId } } }, { root: true })
        return Promise.resolve(topic)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },

  mutations: {
    appendPostToTopic: appendChildToParentMutation({ parent: 'topics', child: 'posts' })
  }
}
