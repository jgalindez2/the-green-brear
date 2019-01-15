import Vue from 'vue'
import Vuex from 'vuex'
import sourceData from '@/catalog/data'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sourceData,
    userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2'
  },
  getters: {
    getUser (state) {
      return state.sourceData.users[state.userId]
    }
  },
  mutations: {
    setTopic (state, topic) {
      state.sourceData.topics = Object.assign({}, state.sourceData.topics, topic)
    },
    setPost (state, post) {
      state.sourceData.posts = Object.assign({}, state.sourceData.posts, post)
    },
    appendPostToTopic (state, { postId, topicId }) {
      const topic = state.sourceData.topics[topicId]
      topic.posts = Object.assign({}, topic.posts, { [postId]: postId })
    },
    appentPostToUser (state, { postId, userId }) {
      const user = state.sourceData.users[userId]
      user.posts = Object.assign({}, user.posts, { [postId]: postId })
    },
    appentTopicToCategory (state, { topicId, categoryId }) {
      const category = state.sourceData.categories[categoryId]
      category.topics = Object.assign({}, category.topics, { [topicId]: topicId })
    },
    appentTopicToUser (state, { topicId, userId }) {
      const user = state.sourceData.users[userId]
      user.topics = Object.assign({}, user.topics, { [topicId]: topicId })
    },
    setUser (state, user) {
      Vue.set(state.sourceData.users, user['.key'], user)
    }
  },
  actions: {
    createTopic ({ state, commit, dispatch }, { title, content, categoryId }) {
      const key = '_' + Math.random().toString(36).substr(2, 9)
      const publishedAt = new Date().getTime()
      const userId = state.userId
      const newTopic = {
        [key]: {
          categoryId,
          title,
          publishedAt,
          userId,
          views: 0,
          lastPostId: "-Kvfw0huq0j2O00bOiWd",
          '.key': key
        }
      }
      commit('setTopic', newTopic)
      commit('appentTopicToCategory', { topicId: key, categoryId })
      commit('appentTopicToUser', { topicId: key, userId })
      dispatch('savePost', { text: content, topicId: key })
    },
    savePost (context, post) {
      const key = '_' + Math.random().toString(36).substr(2, 9)
      const publishedAt = new Date().getTime()
      const newPost = {
        [key]: {
          ...post,
          ...{ '.key': key, publishedAt, userId: context.state.userId }
        }
      }
      context.commit('setPost', newPost)
      context.commit('appendPostToTopic', { postId: key, topicId: post.topicId })
      context.commit('appentPostToUser', { postId: key, userId: context.state.userId })
    },
    editUser (context, user) {
      context.commit('setUser', user)
    }
  }
})
